import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Float, Octahedron, MeshDistortMaterial } from '@react-three/drei';

const RankAvatar = ({ color, size = "small" }) => (
  // Reduced h-64 to h-48 to bring the crown down
  <div className={`${size === 'large' ? 'h-48 w-48' : 'h-28 w-28'} mx-auto relative flex items-center justify-center`}>
    <Canvas 
      camera={{ position: [0, 0, 4] }} 
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={1.5} />
      <pointLight position={[10, 10, 10]} intensity={2} color={color} />
      <Float speed={4} rotationIntensity={2} floatIntensity={1}>
        <Octahedron args={[1, 0]}>
          <MeshDistortMaterial 
            color={color} 
            speed={3} 
            distort={0.3} 
            wireframe 
            emissive={color} 
            emissiveIntensity={1.2}
          />
        </Octahedron>
      </Float>
    </Canvas>
  </div>
);

export default RankAvatar;