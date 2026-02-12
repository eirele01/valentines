import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// --- Custom Shader Material for Petals ---
// This shader handles the "Ruffle" (Vertex Displacement) and the "Color Gradient" (Fragment)
const PetalMaterial = {
    vertexShader: `
    varying vec2 vUv;
    varying float vDisplacement;
    uniform float uTime;

    // Simplex Noise (simplified for brevity)
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
    float snoise(vec2 v) {
      const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy) );
      vec2 x0 = v -   i + dot(i, C.xx);
      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod289(i);
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m ;
      m = m*m ;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    void main() {
      vUv = uv;
      
      // High frequency noise for the "serrated" edge look
      float noise = snoise(uv * 20.0 + uTime * 0.1); 
      
      // Apply displacement mostly at the outer edges (uv.x > 0.5)
      // Carnation petals are ruffled at the tips
      float edgeIntensity = smoothstep(0.4, 1.0, uv.x); 
      
      vDisplacement = noise * edgeIntensity * 0.2;
      
      vec3 newPosition = position + normal * vDisplacement;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    }
  `,
    fragmentShader: `
    varying vec2 vUv;
    varying float vDisplacement;
    
    uniform vec3 uColorInner;
    uniform vec3 uColorOuter;

    void main() {
      // mix colors based on UV x-coordinate (length of petal)
      // Inner part (x=0) is darker/richer, Outer part (x=1) is lighter/white
      
      float mixFactor = smoothstep(0.0, 1.0, vUv.x);
      
      // Add subtle banding/striations
      float striations = sin(vUv.y * 50.0) * 0.05;
      
      vec3 finalColor = mix(uColorInner, uColorOuter, mixFactor + striations);
      
      // Add shadows from displacement
      finalColor -= vDisplacement * 0.5;

      gl_FragColor = vec4(finalColor, 1.0);
    }
  `
};

const Petal = ({ position, rotation, scale, colorInner, colorOuter }) => {
    const meshRef = useRef();

    // Random time offset for each petal so they don't wave in sync
    const randomTimeOffset = useMemo(() => Math.random() * 100, []);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.material.uniforms.uTime.value = state.clock.elapsedTime + randomTimeOffset;
        }
    });

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uColorInner: { value: new THREE.Color(colorInner) },
        uColorOuter: { value: new THREE.Color(colorOuter) }
    }), [colorInner, colorOuter]);

    return (
        <group position={position} rotation={rotation} scale={scale}>
            <mesh ref={meshRef}>
                {/* Plane Geometry provides simpler UVs for gradient mapping: 
            Left (x=0) = Base/Stem, Right (x=1) = Tip/Ruffle */}
                <planeGeometry args={[1, 0.6, 20, 20]} />
                <shaderMaterial
                    args={[PetalMaterial]}
                    uniforms={uniforms}
                    side={THREE.DoubleSide}
                    transparent={true}
                />
            </mesh>
        </group>
    );
};

const Flower = () => {
    const groupRef = useRef();

    // Phyllotaxis Arrangement (Fibonacci Spiral) for realistic packing
    const petals = useMemo(() => {
        const items = [];
        const count = 200; // Dense flower
        const goldenAngle = Math.PI * (3 - Math.sqrt(5)); // ~137.5 degrees

        for (let i = 0; i < count; i++) {
            const t = i / count; // Normalized progress 0 -> 1

            // Angle and Radius
            const angle = i * goldenAngle;
            const radius = 0.05 + Math.sqrt(i) * 0.06;
            // Carnations are somewhat flat-topped but globular.
            // We map radius to height: center is high, outer is lower
            const y = (1 - t) * 0.5;

            const x = radius * Math.cos(angle);
            const z = radius * Math.sin(angle);

            // Rotation
            // Look at center, then tilt up
            // 1. Rotate around Y to face outward from center
            const rotY = -angle;
            // 2. Tilt petals up (center petals more vertical, outer more horizontal)
            const rotZ = Math.PI / 2 - (t * Math.PI * 0.4);
            // 3. Twist/Roll for randomness
            const rotX = (Math.random() - 0.5) * 0.5;

            // Color Variation (Blue Carnation 'Moondust' style)
            // Inner petals: Deep violet/blue
            // Outer petals: Lighter blue
            const colorInner = i < 50 ? "#2c1a4d" : "#1a3c7a"; // Violet to Deep Blue
            const colorOuter = i < 50 ? "#5b4e96" : "#8ab6f9"; // Lighter Violet to Sky Blue

            items.push({
                position: [x, y, z],
                rotation: [rotX, rotY, rotZ],
                scale: [0.3 + t * 0.3, 0.3 + t * 0.3, 1], // Outer petals bigger
                colorInner,
                colorOuter
            });
        }
        return items;
    }, []);

    useFrame((state, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += delta * 0.1;
            groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
        }
    });

    return (
        <group ref={groupRef} scale={[1.8, 1.8, 1.8]}>
            {/* Stem */}
            <mesh position={[0, -2, 0]}>
                <cylinderGeometry args={[0.08, 0.08, 3, 8]} />
                <meshStandardMaterial color="#4A7c59" />
            </mesh>

            {/* Calyx */}
            <mesh position={[0, -0.6, 0]}>
                <cylinderGeometry args={[0.25, 0.1, 0.8, 8, 1, true]} />
                <meshStandardMaterial color="#5C9E76" side={THREE.DoubleSide} />
            </mesh>

            {/* Flower Head */}
            <group position={[0, 0, 0]}>
                {petals.map((props, i) => (
                    <Petal
                        key={i}
                        {...props}
                    />
                ))}
            </group>
        </group>
    );
};

export default Flower;
