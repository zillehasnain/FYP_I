import React, { Suspense } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { 
  MeshDistortMaterial, 
  Sphere, 
  Float, 
  OrbitControls, 
  PerspectiveCamera, 
  ContactShadows 
} from '@react-three/drei';

// This sub-component handles the scaling based on screen size
const Scene = () => {
  const { viewport } = useThree();
  
  // Logic: If the screen is narrow (mobile), make the shape smaller
  // viewport.width is a 3D unit. < 5 is roughly a mobile screen.
  const responsiveScale = viewport.width < 5 ? 1.5 : 2.4;

  return (
    <>
      <Float speed={1.4} rotationIntensity={2} floatIntensity={2}>
        <Sphere args={[1, 100, 200]} scale={responsiveScale}>
          <MeshDistortMaterial
            color="#10b981" // Emerald Green
            attach="material"
            distort={0.4} // How much it "bursts"
            speed={4} // Speed of the wiggle
            roughness={0}
            metalness={1}
            emissive="#064e3b" // Deep glow
            emissiveIntensity={0.5}
          />
        </Sphere>
      </Float>

      {/* Adding a subtle floor shadow for depth */}
      <ContactShadows
        position={[0, -3.5, 0]}
        opacity={0.4}
        scale={20}
        blur={2}
        far={4.5}
      />
    </>
  );
};

const Hero3D = () => {
  return (
    <div className="h-[400px] md:h-[600px] w-full cursor-grab active:cursor-grabbing">
      <Canvas>
        {/* Cinematic Camera */}
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
        
        {/* Professional Lighting */}
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#10b981" />
        <pointLight position={[-10, -10, -10]} color="#3b82f6" intensity={1} />
        
        <Suspense fallback={null}>
          <Scene />
        </Suspense>

        {/* OrbitControls allow the user to rotate the object with their mouse/finger */}
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          minPolarAngle={Math.PI / 2.5}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
    </div>
  );
};

export default Hero3D;