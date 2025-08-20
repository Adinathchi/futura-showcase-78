import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, Text3D, Environment } from '@react-three/drei';
import { Suspense } from 'react';
import * as THREE from 'three';

// Floating geometric shapes for the tech aesthetic
function FloatingGeometry({ position, color }: { position: [number, number, number], color: string }) {
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={0.5}>
      <mesh position={position}>
        <octahedronGeometry args={[0.5]} />
        <meshStandardMaterial 
          color={color} 
          emissive={color} 
          emissiveIntensity={0.3}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
    </Float>
  );
}

// Animated particles system
function Particles() {
  const particleCount = 100;
  const positions = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
  }

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute 
          attach="attributes-position" 
          array={positions} 
          count={particleCount} 
          itemSize={3} 
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.05} 
        color="#60a5fa" 
        transparent 
        opacity={0.6}
        sizeAttenuation={true}
      />
    </points>
  );
}

// Main 3D tech model representation
function TechModel() {
  return (
    <group>
      {/* Central core */}
      <Float speed={1} rotationIntensity={0.5} floatIntensity={0.3}>
        <mesh>
          <icosahedronGeometry args={[1.5]} />
          <meshStandardMaterial 
            color="#3b82f6"
            emissive="#1e40af"
            emissiveIntensity={0.2}
            metalness={0.9}
            roughness={0.1}
            wireframe={false}
          />
        </mesh>
      </Float>

      {/* Orbiting elements */}
      <Float speed={3} rotationIntensity={2} floatIntensity={0.8}>
        <mesh position={[3, 0, 0]}>
          <torusGeometry args={[0.5, 0.2]} />
          <meshStandardMaterial 
            color="#8b5cf6"
            emissive="#7c3aed"
            emissiveIntensity={0.3}
            metalness={0.8}
          />
        </mesh>
      </Float>

      <Float speed={2.5} rotationIntensity={1.5} floatIntensity={0.6}>
        <mesh position={[-2.5, 2, 1]}>
          <dodecahedronGeometry args={[0.8]} />
          <meshStandardMaterial 
            color="#10b981"
            emissive="#059669"
            emissiveIntensity={0.4}
            metalness={0.7}
          />
        </mesh>
      </Float>

      {/* Additional floating elements */}
      <FloatingGeometry position={[2, -3, -2]} color="#f59e0b" />
      <FloatingGeometry position={[-3, 1, 2]} color="#ef4444" />
      <FloatingGeometry position={[1, 3, -1]} color="#06b6d4" />
    </group>
  );
}

// Loading fallback
function Loader() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="animate-pulse-glow">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  );
}

export default function TechScene() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#60a5fa" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
          <spotLight 
            position={[0, 10, 0]} 
            angle={0.3} 
            penumbra={1} 
            intensity={0.8}
            color="#10b981"
          />

          {/* Environment */}
          <Environment preset="night" />
          
          {/* 3D Models */}
          <TechModel />
          <Particles />

          {/* Controls */}
          <OrbitControls 
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}