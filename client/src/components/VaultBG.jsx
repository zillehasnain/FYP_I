import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  Float, 
  MeshDistortMaterial, 
  Stars, 
  PerspectiveCamera, 
  Environment 
} from '@react-three/drei';

// This is the floating geometric core of the vault
const SecurityCore = () => {
  const meshRef = useRef();

  // Slow, constant rotation to make it feel "alive"
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.1;
      meshRef.current.rotation.y = t * 0.15;
      meshRef.current.rotation.z = t * 0.05;
    }
  });

  return (
    <group>
      {/* 1. THE STARS: Adds depth and the 'Space' feel */}
      <Stars 
        radius={100} 
        depth={50} 
        count={7000} 
        factor={4} 
        saturation={0} 
        fade 
        speed={1} 
      />

      {/* 2. THE FLOATING CORE */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh ref={meshRef}>
          {/* Using Octahedron for a sharp, high-tech look */}
          <octahedronGeometry args={[2.5, 1]} /> 
          <MeshDistortMaterial
            color="#10b981" // Emerald Green
            speed={2}
            distort={0.3}
            wireframe // Technical wireframe look
            opacity={0.2}
            transparent
            emissive="#10b981"
            emissiveIntensity={0.5}
          />
        </mesh>
        
        {/* Inner solid glow to make it look like it's holding data */}
        <mesh>
          <sphereGeometry args={[1.2, 32, 32]} />
          <meshBasicMaterial color="#10b981" transparent opacity={0.05} />
        </mesh>
      </Float>

      {/* 3. LIGHTING */}
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#10b981" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3b82f6" />
    </group>
  );
};

const VaultBG = () => {
  return (
    // Fixed inset-0 ensures it covers the whole screen behind the UI
    <div className="fixed inset-0 z-0 bg-[#020202] pointer-events-none">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
        
        {/* Subtle atmospheric fog */}
        <color attach="background" args={["#020202"]} />
        
        <SecurityCore />

        {/* Optional: Adds realistic reflections if you add metal objects later */}
        <Environment preset="city" />
      </Canvas>
    </div>
  );
};

export default VaultBG;