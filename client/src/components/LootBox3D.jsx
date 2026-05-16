import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, RoundedBox, MeshDistortMaterial, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

const LootBox3D = ({ color = "#10b981" }) => {
  const boxRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (boxRef.current) {
      // Gentle rotation
      boxRef.current.rotation.y = t * 0.5;
      boxRef.current.rotation.z = Math.sin(t * 0.3) * 0.1;
    }
  });

  return (
    <group 
      onPointerOver={() => setHovered(true)} 
      onPointerOut={() => setHovered(false)}
    >
      <Float speed={3} rotationIntensity={1} floatIntensity={2}>
        {/* MAIN CRATE BODY */}
        <RoundedBox 
          ref={boxRef} 
          args={[2, 2, 2]} 
          radius={0.1} 
          smoothness={4}
          scale={hovered ? 1.1 : 1}
        >
          <meshStandardMaterial 
            color="#0a0a0a" 
            metalness={1} 
            roughness={0.2} 
            envMapIntensity={1}
          />
        </RoundedBox>

        {/* GLOWING SEAMS (Wireframe overlay) */}
        <mesh scale={hovered ? 1.12 : 1.02} ref={boxRef}>
          <boxGeometry args={[2, 2, 2]} />
          <meshBasicMaterial 
            color={color} 
            wireframe 
            transparent 
            opacity={hovered ? 0.8 : 0.3} 
          />
        </mesh>

        {/* INNER GLOW (Visible through gaps) */}
        <mesh scale={0.8}>
          <sphereGeometry args={[1, 16, 16]} />
          <MeshDistortMaterial
            color={color}
            emissive={color}
            emissiveIntensity={hovered ? 5 : 2}
            distort={0.4}
            speed={4}
          />
        </mesh>
      </Float>

      {/* Atmospheric Light */}
      <pointLight position={[0, 0, 0]} intensity={2} color={color} />
    </group>
  );
};

export default LootBox3D;