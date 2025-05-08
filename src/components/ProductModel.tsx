
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei';
import { useTheme } from './ThemeProvider';
import { Mesh, Group } from 'three';

interface ProductModelProps {
  interactive?: boolean;
}

// Laptop model component
const LaptopModel = () => {
  const meshRef = useRef<Group>(null);
  const { theme } = useTheme();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1 + Math.PI * 0.1;
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.05 - 0.2;
    }
  });
  
  return (
    <group ref={meshRef} position={[0, 0, 0]}>
      {/* Laptop base */}
      <mesh position={[0, -0.1, 0]} receiveShadow castShadow>
        <boxGeometry args={[2, 0.1, 1.5]} />
        <meshStandardMaterial 
          color={theme === 'dark' ? '#333' : '#e0e0e0'} 
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      
      {/* Laptop screen */}
      <group position={[0, 0.5, -0.7]} rotation={[-Math.PI * 0.1, 0, 0]}>
        <mesh receiveShadow castShadow>
          <boxGeometry args={[2, 1.3, 0.08]} />
          <meshStandardMaterial 
            color={theme === 'dark' ? '#222' : '#d0d0d0'} 
            metalness={0.6}
            roughness={0.3}
          />
        </mesh>
        
        {/* Screen display */}
        <mesh position={[0, 0, 0.05]}>
          <planeGeometry args={[1.8, 1.15]} />
          <meshStandardMaterial 
            color={theme === 'dark' ? '#111' : '#f5f5f5'}
            emissive={theme === 'dark' ? '#00BFFF' : '#fff'} 
            emissiveIntensity={theme === 'dark' ? 0.2 : 0.1}
            metalness={0.2}
            roughness={0.2}
          />
        </mesh>
      </group>
      
      {/* Laptop keyboard */}
      <mesh position={[0, 0, 0.2]} receiveShadow>
        <planeGeometry args={[1.8, 1]} />
        <meshStandardMaterial 
          color={theme === 'dark' ? '#2a2a2a' : '#f0f0f0'} 
          metalness={0.5}
          roughness={0.6}
        />
      </mesh>
      
      {/* Touchpad */}
      <mesh position={[0, -0.05, 0.5]} receiveShadow>
        <planeGeometry args={[0.8, 0.5]} />
        <meshStandardMaterial 
          color={theme === 'dark' ? '#333' : '#e8e8e8'} 
          metalness={0.7}
          roughness={0.2}
        />
      </mesh>
    </group>
  );
};

const ProductModel: React.FC<ProductModelProps> = ({ interactive = false }) => {
  const { theme } = useTheme();

  return (
    <div className={`w-full h-full ${interactive ? 'cursor-grab active:cursor-grabbing' : ''}`}>
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
        <ambientLight intensity={theme === 'dark' ? 0.5 : 1} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          intensity={theme === 'dark' ? 1 : 1.5}
          castShadow
        />
        <pointLight position={[-10, -10, -10]} intensity={theme === 'dark' ? 0.5 : 0.2} />
        
        <LaptopModel />
        
        <Environment preset={theme === 'dark' ? "night" : "studio"} />
        <ContactShadows
          position={[0, -1.5, 0]}
          opacity={theme === 'dark' ? 0.4 : 0.8}
          scale={10}
          blur={4}
          far={5}
        />
        {interactive && <OrbitControls enablePan={false} enableZoom={true} maxPolarAngle={Math.PI / 2} minPolarAngle={0} />}
      </Canvas>
    </div>
  );
};

export default ProductModel;
