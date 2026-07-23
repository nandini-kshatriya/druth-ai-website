"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { generateLogoPoints } from "@/lib/generateLogoPoints";

function ParticlePoints({ positions }: { positions: Float32Array }) {
  const pointsRef = useRef<THREE.Points>(null);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
  <bufferAttribute
    attach="attributes-position"
    args={[positions, 3]}
    count={positions.length / 3}
    array={positions}
    itemSize={3}
  />
</bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#3ecf8e"
        transparent
        opacity={0.9}
        sizeAttenuation
      />
    </points>
  );
}

function Scene() {
  const [positions, setPositions] = useState<Float32Array | null>(null);

  useEffect(() => {
    generateLogoPoints("/logo.png", 4000).then(setPositions);
  }, []);

  if (!positions) return null;

  return <ParticlePoints positions={positions} />;
}

export function ParticleLogoCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={1} />
      <Scene />
    </Canvas>
  );
}