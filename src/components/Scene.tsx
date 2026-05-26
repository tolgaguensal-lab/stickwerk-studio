"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial, Float } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function AnimatedBackground() {
  const sphereRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!sphereRef.current) return;
    const t = state.clock.getElapsedTime();
    sphereRef.current.rotation.x = t * 0.2;
    sphereRef.current.rotation.y = t * 0.3;
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <Sphere ref={sphereRef} args={[1, 100, 100]} scale={2.4}>
        <MeshDistortMaterial
          color="#1B3022" // Forest Green
          speed={3}
          distort={0.4}
          radius={1}
          metalness={0.6}
          roughness={0.2}
        />
      </Sphere>
    </Float>
  );
}

export default function Scene() {
  return (
    <div className="fixed inset-0 -z-10 h-full w-full bg-[#FDFBF7]">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} color="#C5A059" />
        <AnimatedBackground />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate />
      </Canvas>
    </div>
  );
}
