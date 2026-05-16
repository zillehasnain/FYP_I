import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text, RoundedBox, ContactShadows, PerspectiveCamera } from '@react-three/drei';
import { QRCodeSVG } from 'qrcode.react';

const TicketMesh = ({ code, brand, color }) => {
  const mesh = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    mesh.current.rotation.y = Math.sin(t * 0.5) * 0.2;
    mesh.current.position.y = Math.sin(t * 1.5) * 0.1;
  });

  return (
    <group ref={mesh}>
      {/* Main Ticket Body */}
      <RoundedBox args={[3, 4.8, 0.1]} radius={0.15} smoothness={4}>
        <meshStandardMaterial color="#080808" metalness={1} roughness={0.2} />
      </RoundedBox>

      {/* Neon Border */}
      <RoundedBox args={[3.1, 4.9, 0.05]} radius={0.16} smoothness={4} position={[0, 0, -0.02]}>
        <meshBasicMaterial color={color} wireframe />
      </RoundedBox>

      {/* Brand Label */}
      <Text position={[0, 1.9, 0.1]} fontSize={0.15} color={color} font="/fonts/Inter-Bold.woff">
        {brand} PROTOCOL
      </Text>

      {/* Security Text */}
      <Text position={[0, -2.1, 0.1]} fontSize={0.12} color="#444">
        VERIFIED_ASSET_{code.split('-').pop()}
      </Text>

      {/* QR Scanner White Background */}
      <mesh position={[0, -0.1, 0.06]}>
        <planeGeometry args={[2.2, 2.2]} />
        <meshBasicMaterial color="white" />
      </mesh>
    </group>
  );
};

const Voucher3D = ({ code, brand, color }) => {
  return (
    <div className="h-[450px] w-full relative">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={35} />
        <ambientLight intensity={0.7} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color={color} />
        
        <TicketMesh code={code} brand={brand} color={color} />
        
        <ContactShadows position={[0, -3, 0]} opacity={0.6} scale={10} blur={2.5} far={4} />
      </Canvas>
      
      {/* Real QR Code Overlaid */}
      <div className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none bg-white p-2 rounded-sm">
        <QRCodeSVG value={code} size={140} level={"H"} />
      </div>
    </div>
  );
};

export default Voucher3D;