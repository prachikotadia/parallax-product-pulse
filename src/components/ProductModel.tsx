
import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, useGLTF, Environment, ContactShadows } from '@react-three/drei';
import { useTheme } from './ThemeProvider';
import { Mesh } from 'three';

const Model = ({ url }: { url: string }) => {
  const { scene } = useGLTF('/product.glb');
  const meshRef = useRef<Mesh>(null);
  const { theme } = useTheme();

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle rotation
      meshRef.current.rotation.y += 0.001;
    }
  });

  return (
    <primitive 
      object={scene} 
      ref={meshRef} 
      scale={1.5}
      position={[0, -1, 0]}
    />
  );
};

interface ProductModelProps {
  interactive?: boolean;
}

const ProductModel: React.FC<ProductModelProps> = ({ interactive = false }) => {
  const { theme } = useTheme();

  // Use a placeholder cube since we don't have an actual GLB file
  const PlaceholderModel = () => {
    const meshRef = useRef<Mesh>(null);
    
    useFrame((state) => {
      if (meshRef.current) {
        meshRef.current.rotation.y += 0.005;
        meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
      }
    });
    
    return (
      <mesh ref={meshRef}>
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <meshStandardMaterial 
          color={theme === 'dark' ? '#333' : '#fff'} 
          metalness={0.8}
          roughness={0.1}
          emissive={theme === 'dark' ? '#00BFFF' : '#000'}
          emissiveIntensity={theme === 'dark' ? 0.5 : 0}
        />
      </mesh>
    );
  };

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
        />
        <pointLight position={[-10, -10, -10]} intensity={theme === 'dark' ? 0.5 : 0.2} />
        
        <PlaceholderModel />
        
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
