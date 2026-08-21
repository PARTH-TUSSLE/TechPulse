"use client";

import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

interface LightPillarProps {
  topColor?: string;
  bottomColor?: string;
  intensity?: number;
  rotationSpeed?: number;
  interactive?: boolean;
  className?: string;
  glowAmount?: number;
  pillarWidth?: number;
  pillarHeight?: number;
  noiseIntensity?: number;
  mixBlendMode?: React.CSSProperties['mixBlendMode'];
  pillarRotation?: number;
  quality?: 'low' | 'medium' | 'high';
}

const LightPillar: React.FC<LightPillarProps> = ({
  topColor = '#5227FF',
  bottomColor = '#35FF9F',
  intensity = 1.0,
  rotationSpeed = 0.3,
  interactive = false,
  className = '',
  glowAmount = 0.005,
  pillarWidth = 3.0,
  pillarHeight = 0.4,
  noiseIntensity = 0.5,
  mixBlendMode = 'screen',
  pillarRotation = 0,
  quality = 'high'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const geometryRef = useRef<THREE.PlaneGeometry | null>(null);
  const mouseRef = useRef<THREE.Vector2>(new THREE.Vector2(0, 0));
  const timeRef = useRef(0);
  const rotationSpeedRef = useRef(rotationSpeed);
  const [webGLSupported, setWebGLSupported] = useState<boolean>(true);

  // Check WebGL support
  useEffect(() => {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time capability probe
      setWebGLSupported(false);
    }
  }, []);

  useEffect(() => {
    if (!containerRef.current || !webGLSupported) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isLowEndDevice = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;

    // All tiers keep highp precision — mediump collapses this raymarching
    // shader on mobile GPUs (renders black). Phones use a dedicated tier that
    // stays close to the desktop look but light enough to run smoothly; the
    // adaptive scaler handles slow GPUs regardless.
    const QUALITY_RANK: Record<'low' | 'mobile' | 'medium' | 'high', number> = {
      low: 0,
      mobile: 1,
      medium: 2,
      high: 3,
    };
    const capQuality = (
      level: 'low' | 'mobile' | 'medium' | 'high',
      max: 'low' | 'mobile' | 'medium' | 'high'
    ): 'low' | 'mobile' | 'medium' | 'high' => (QUALITY_RANK[level] > QUALITY_RANK[max] ? max : level);

    const qualityCap = isLowEndDevice ? 'medium' : isMobile ? 'mobile' : 'high';
    const effectiveQuality: 'low' | 'mobile' | 'medium' | 'high' = capQuality(quality, qualityCap);

    const qualitySettings = {
      low: { iterations: 16, waveIterations: 1, pixelRatio: 0.6, precision: 'highp', stepMultiplier: 1.5 },
      mobile: {
        iterations: 32,
        waveIterations: 2,
        pixelRatio: Math.min(window.devicePixelRatio, 1.0),
        precision: 'highp',
        stepMultiplier: 1.1
      },
      medium: { iterations: 28, waveIterations: 2, pixelRatio: 0.75, precision: 'highp', stepMultiplier: 1.2 },
      high: {
        iterations: 48,
        waveIterations: 3,
        pixelRatio: Math.min(window.devicePixelRatio, 1.5),
        precision: 'highp',
        stepMultiplier: 1.0
      }
    };

    const settings = qualitySettings[effectiveQuality] || qualitySettings.medium;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    cameraRef.current = camera;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: false,
        alpha: true,
        powerPreference: isMobile || effectiveQuality === 'low' ? 'low-power' : 'high-performance',
        precision: settings.precision,
        stencil: false,
        depth: false
      });
    } catch (error) {
      console.error('Failed to create WebGL renderer:', error);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- fatal init failure path
      setWebGLSupported(false);
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(settings.pixelRatio);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Adaptive resolution scaling: start at the requested ratio, then step it
    // down if frames are too slow so the page stays smooth on weak GPUs.
    const MIN_PIXEL_RATIO = 0.4;
    let pixelRatio = settings.pixelRatio;
    let slowFrameCount = 0;

    const applyPixelRatio = (ratio: number) => {
      pixelRatio = ratio;
      renderer.setPixelRatio(ratio);
    };

    // Convert hex colors to RGB
    const parseColor = (hex: string): THREE.Vector3 => {
      const color = new THREE.Color(hex);
      return new THREE.Vector3(color.r, color.g, color.b);
    };

    // Shader material
    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform float uTime;
      uniform vec2 uResolution;
      uniform vec2 uMouse;
      uniform vec3 uTopColor;
      uniform vec3 uBottomColor;
      uniform float uIntensity;
      uniform bool uInteractive;
      uniform float uGlowAmount;
      uniform float uPillarWidth;
      uniform float uPillarHeight;
      uniform float uNoiseIntensity;
      uniform float uPillarRotation;
      uniform float uRotCos;
      uniform float uRotSin;
      uniform float uPillarRotCos;
      uniform float uPillarRotSin;
      uniform float uWaveSin[4];
      uniform float uWaveCos[4];
      varying vec2 vUv;

      const float PI = 3.141592653589793;
      const float EPSILON = 0.001;
      const float E = 2.71828182845904523536;

      float noise(vec2 coord) {
        vec2 r = (E * sin(E * coord));
        return fract(r.x * r.y * (1.0 + coord.x));
      }

      void main() {
        vec2 fragCoord = vUv * uResolution;
        vec2 uv = (fragCoord * 2.0 - uResolution) / uResolution.y;
        
        // Apply 2D rotation to UV coordinates using pre-computed values
        uv = vec2(
          uv.x * uPillarRotCos - uv.y * uPillarRotSin,
          uv.x * uPillarRotSin + uv.y * uPillarRotCos
        );

        vec3 origin = vec3(0.0, 0.0, -10.0);
        vec3 direction = normalize(vec3(uv, 1.0));

        float maxDepth = 50.0;
        float depth = 0.1;

        // Use pre-computed rotation values (or mouse-based)
        float rotCos = uRotCos;
        float rotSin = uRotSin;
        if(uInteractive && length(uMouse) > 0.0) {
          float mouseAngle = uMouse.x * PI * 2.0;
          rotCos = cos(mouseAngle);
          rotSin = sin(mouseAngle);
        }

        vec3 color = vec3(0.0);
        
        const int ITERATIONS = ${settings.iterations};
        const int WAVE_ITERATIONS = ${settings.waveIterations};
        const float STEP_MULT = ${settings.stepMultiplier.toFixed(1)};
        
        for(int i = 0; i < ITERATIONS; i++) {
          vec3 pos = origin + direction * depth;
          
          // Inline rotation: pos.xz *= rotMat
          float newX = pos.x * rotCos - pos.z * rotSin;
          float newZ = pos.x * rotSin + pos.z * rotCos;
          pos.x = newX;
          pos.z = newZ;

          // Apply vertical scaling and wave deformation
          vec3 deformed = pos;
          deformed.y *= uPillarHeight;
          deformed = deformed + vec3(0.0, uTime, 0.0);
          
          // Inlined wave deformation
          float frequency = 1.0;
          float amplitude = 1.0;
          for(int j = 0; j < WAVE_ITERATIONS; j++) {
            // Inline rotation: deformed.xz *= rot(0.4) using pre-computed
            float wx = deformed.x * uWaveCos[j] - deformed.z * uWaveSin[j];
            float wz = deformed.x * uWaveSin[j] + deformed.z * uWaveCos[j];
            deformed.x = wx;
            deformed.z = wz;
            
            float phase = uTime * float(j) * 2.0;
            vec3 oscillation = cos(deformed.zxy * frequency - phase);
            deformed += oscillation * amplitude;
            frequency *= 2.0;
            amplitude *= 0.5;
          }
          
          // Calculate distance field using cosine pattern
          vec2 cosinePair = cos(deformed.xz);
          float fieldDistance = length(cosinePair) - 0.2;
          
          // Radial boundary constraint (inlined blendMax)
          float radialBound = length(pos.xz) - uPillarWidth;
          float k = 4.0;
          float h = max(k - abs(-radialBound - (-fieldDistance)), 0.0);
          fieldDistance = -(min(-radialBound, -fieldDistance) - h * h * 0.25 / k);
          
          fieldDistance = abs(fieldDistance) * 0.15 + 0.01;

          vec3 gradient = mix(uBottomColor, uTopColor, smoothstep(15.0, -15.0, pos.y));
          color += gradient / fieldDistance;

          if(fieldDistance < EPSILON || depth > maxDepth) break;
          depth += fieldDistance * STEP_MULT;
        }

        // Normalize by pillar width to maintain consistent glow regardless of size
        float widthNormalization = uPillarWidth / 3.0;
        color = tanh(color * uGlowAmount / widthNormalization);
        
        // Add noise postprocessing
        float rnd = noise(gl_FragCoord.xy);
        color -= rnd / 15.0 * uNoiseIntensity;
        
        gl_FragColor = vec4(color * uIntensity, 1.0);
      }
    `;

    // Pre-compute wave rotation values
    const waveAngle = 0.4;
    const waveSinValues = new Float32Array(4);
    const waveCosValues = new Float32Array(4);
    for (let i = 0; i < 4; i++) {
      waveSinValues[i] = Math.sin(waveAngle);
      waveCosValues[i] = Math.cos(waveAngle);
    }

    // Pre-compute pillar rotation
    const pillarRotRad = (pillarRotation * Math.PI) / 180.0;
    const pillarRotCos = Math.cos(pillarRotRad);
    const pillarRotSin = Math.sin(pillarRotRad);

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(width, height) },
        uMouse: { value: mouseRef.current },
        uTopColor: { value: parseColor(topColor) },
        uBottomColor: { value: parseColor(bottomColor) },
        uIntensity: { value: intensity },
        uInteractive: { value: interactive },
        uGlowAmount: { value: glowAmount },
        uPillarWidth: { value: pillarWidth },
        uPillarHeight: { value: pillarHeight },
        uNoiseIntensity: { value: noiseIntensity },
        uPillarRotation: { value: pillarRotation },
        uRotCos: { value: 1.0 },
        uRotSin: { value: 0.0 },
        uPillarRotCos: { value: pillarRotCos },
        uPillarRotSin: { value: pillarRotSin },
        uWaveSin: { value: waveSinValues },
        uWaveCos: { value: waveCosValues }
      },
      transparent: true,
      depthWrite: false,
      depthTest: false
    });
    materialRef.current = material;

    const geometry = new THREE.PlaneGeometry(2, 2);
    geometryRef.current = geometry;
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Mouse interaction - throttled for performance
    let mouseMoveTimeout: number | null = null;
    const handleMouseMove = (event: MouseEvent) => {
      if (!interactive) return;

      if (mouseMoveTimeout) return;

      mouseMoveTimeout = window.setTimeout(() => {
        mouseMoveTimeout = null;
      }, 16); // ~60fps throttle

      const rect = container.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      mouseRef.current.set(x, y);
    };

    if (interactive) {
      container.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    // Animation loop with fixed timestep
    let lastTime = performance.now();
    const targetFPS = effectiveQuality === 'low' || effectiveQuality === 'mobile' ? 30 : 60;
    const frameTime = 1000 / targetFPS;
    let renderSamples = 0;
    let renderTotal = 0;

    const animate = (currentTime: number) => {
      if (!materialRef.current || !rendererRef.current || !sceneRef.current || !cameraRef.current) return;

      const deltaTime = currentTime - lastTime;

      if (deltaTime >= frameTime) {
        timeRef.current += 0.016 * rotationSpeedRef.current;
        materialRef.current.uniforms.uTime.value = timeRef.current;

        // Pre-compute rotation on CPU
        const rotAngle = timeRef.current * 0.3;
        materialRef.current.uniforms.uRotCos.value = Math.cos(rotAngle);
        materialRef.current.uniforms.uRotSin.value = Math.sin(rotAngle);

        const t0 = performance.now();
        rendererRef.current.render(sceneRef.current, cameraRef.current);
        const elapsed = performance.now() - t0;
        renderTotal += elapsed;
        renderSamples += 1;

        // Sampling window: adjust resolution based on measured render cost. Lower
        // resolution if frames are slow; recover a step when they turn fast.
        if (renderSamples >= 30) {
          const avg = renderTotal / renderSamples;
          renderSamples = 0;
          renderTotal = 0;
          if (avg > frameTime * 1.1 && pixelRatio > MIN_PIXEL_RATIO) {
            applyPixelRatio(Math.max(MIN_PIXEL_RATIO, pixelRatio * 0.75));
            slowFrameCount = 0;
          } else if (avg < frameTime * 0.5 && pixelRatio < settings.pixelRatio) {
            slowFrameCount += 1;
            if (slowFrameCount >= 3) {
              applyPixelRatio(Math.min(settings.pixelRatio, pixelRatio / 0.75));
              slowFrameCount = 0;
            }
          } else {
            slowFrameCount = 0;
          }
        }

        lastTime = currentTime - (deltaTime % frameTime);
      }

      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    let isIntersecting = true;
    const observer = new IntersectionObserver(([entry]) => {
      isIntersecting = entry.isIntersecting;
      if (!isIntersecting && rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      } else if (isIntersecting && !rafRef.current && !document.hidden) {
        lastTime = performance.now();
        rafRef.current = requestAnimationFrame(animate);
      }
    }, { threshold: 0 });
    observer.observe(container);

    // Pause rendering while the tab is hidden — a major battery/CPU win.
    const handleVisibility = () => {
      if ((document.hidden || !isIntersecting) && rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      } else if (!document.hidden && isIntersecting && !rafRef.current) {
        lastTime = performance.now();
        rafRef.current = requestAnimationFrame(animate);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    // Handle resize with debouncing
    let resizeTimeout: number | null = null;
    const handleResize = () => {
      if (resizeTimeout) {
        clearTimeout(resizeTimeout);
      }

      resizeTimeout = window.setTimeout(() => {
        if (!rendererRef.current || !materialRef.current || !containerRef.current) return;
        const newWidth = containerRef.current.clientWidth;
        const newHeight = containerRef.current.clientHeight;
        rendererRef.current.setSize(newWidth, newHeight);
        materialRef.current.uniforms.uResolution.value.set(newWidth, newHeight);
      }, 150);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Cleanup
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('resize', handleResize);
      if (interactive) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
        rendererRef.current.forceContextLoss();
        if (container.contains(rendererRef.current.domElement)) {
          container.removeChild(rendererRef.current.domElement);
        }
      }
      if (materialRef.current) {
        materialRef.current.dispose();
      }
      if (geometryRef.current) {
        geometryRef.current.dispose();
      }

      rendererRef.current = null;
      materialRef.current = null;
      sceneRef.current = null;
      cameraRef.current = null;
      geometryRef.current = null;
      rafRef.current = null;
    };
  }, [webGLSupported, quality]); // eslint-disable-line react-hooks/exhaustive-deps -- uniform props are synced by dedicated effects below

  useEffect(() => {
    rotationSpeedRef.current = rotationSpeed;
  }, [rotationSpeed]);

  useEffect(() => {
    if (!materialRef.current) return;
    const parseColor = (hex: string) => {
      const color = new THREE.Color(hex);
      return new THREE.Vector3(color.r, color.g, color.b);
    };
    materialRef.current.uniforms.uTopColor.value = parseColor(topColor);
  }, [topColor]);

  useEffect(() => {
    if (!materialRef.current) return;
    const parseColor = (hex: string) => {
      const color = new THREE.Color(hex);
      return new THREE.Vector3(color.r, color.g, color.b);
    };
    materialRef.current.uniforms.uBottomColor.value = parseColor(bottomColor);
  }, [bottomColor]);

  useEffect(() => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uIntensity.value = intensity;
  }, [intensity]);

  useEffect(() => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uInteractive.value = interactive;
  }, [interactive]);

  useEffect(() => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uGlowAmount.value = glowAmount;
  }, [glowAmount]);

  useEffect(() => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uPillarWidth.value = pillarWidth;
  }, [pillarWidth]);

  useEffect(() => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uPillarHeight.value = pillarHeight;
  }, [pillarHeight]);

  useEffect(() => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uNoiseIntensity.value = noiseIntensity;
  }, [noiseIntensity]);

  useEffect(() => {
    if (!materialRef.current) return;
    const pillarRotRad = (pillarRotation * Math.PI) / 180;
    materialRef.current.uniforms.uPillarRotCos.value = Math.cos(pillarRotRad);
    materialRef.current.uniforms.uPillarRotSin.value = Math.sin(pillarRotRad);
  }, [pillarRotation]);

  if (!webGLSupported) {
    return (
      <div
        className={`w-full h-full absolute top-0 left-0 ${className}`}
        style={{ mixBlendMode }}
        aria-hidden
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 70% at 50% 30%, rgba(45,255,157,0.16), transparent 60%), radial-gradient(90% 60% at 50% 100%, rgba(165,159,255,0.14), transparent 55%)",
          }}
        />
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`w-full h-full absolute top-0 left-0 ${className}`} style={{ mixBlendMode }} />
  );
};

export default LightPillar;