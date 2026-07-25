"use client";

import { Line } from "@react-three/drei";
import { useEffect, useRef, useState, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { generateLogoPoints } from "@/lib/generateLogoPoints";

function useGlowTexture() {
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    const size = 64;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;

    const gradient = ctx.createRadialGradient(
      size / 2, size / 2, 0,
      size / 2, size / 2, size / 2
    );
    gradient.addColorStop(0, "rgba(255,255,255,1)");
    gradient.addColorStop(0.4, "rgba(255,255,255,0.6)");
    gradient.addColorStop(1, "rgba(255,255,255,0)");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);

    setTexture(new THREE.CanvasTexture(canvas));
  }, []);

  return texture;
}

function ParticlePoints({ positions }: { positions: Float32Array }) {
  const pointsRef = useRef<THREE.Points>(null);
  const glowTexture = useGlowTexture();
  const clockRef = useRef(0);

  const originalPositions = useRef(positions.slice());
  const displayPositions = useRef(positions.slice());

  const { camera, gl } = useThree();
  const mouse = useRef(new THREE.Vector2(9999, 9999));
  const mouseWorld = useRef(new THREE.Vector3());

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      const rect = gl.domElement.getBoundingClientRect();
      mouse.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };
    const handlePointerLeave = () => {
      mouse.current.set(9999, 9999);
    };

    gl.domElement.addEventListener("pointermove", handlePointerMove);
    gl.domElement.addEventListener("pointerleave", handlePointerLeave);
    return () => {
      gl.domElement.removeEventListener("pointermove", handlePointerMove);
      gl.domElement.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [gl]);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    clockRef.current += delta;

    pointsRef.current.rotation.y += delta * 0.15;
    const baseScale = 2;
    const breathe = baseScale + Math.sin(clockRef.current * 0.8) * 0.04;
    pointsRef.current.scale.setScalar(breathe);
    pointsRef.current.rotation.x = Math.sin(clockRef.current * 0.3) * 0.05;
    pointsRef.current.rotation.z = Math.cos(clockRef.current * 0.25) * 0.03;

    const vector = new THREE.Vector3(mouse.current.x, mouse.current.y, 0.5);
    vector.unproject(camera);
    const dir = vector.sub(camera.position).normalize();
    const distance = -camera.position.z / dir.z;
    mouseWorld.current.copy(camera.position).add(dir.multiplyScalar(distance));

    const posAttr = pointsRef.current.geometry.attributes.position;
    const orig = originalPositions.current;
    const disp = displayPositions.current;

    const repelRadius = 0.6;
    const repelStrength = 0.4;
    const returnSpeed = 0.08;

    for (let i = 0; i < disp.length / 3; i++) {
      const ix = i * 3;
      const ox = orig[ix], oy = orig[ix + 1], oz = orig[ix + 2];

      const dx = ox - mouseWorld.current.x;
      const dy = oy - mouseWorld.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      let targetX = ox, targetY = oy;

      if (dist < repelRadius) {
        const force = (1 - dist / repelRadius) * repelStrength;
        const angle = Math.atan2(dy, dx);
        targetX = ox + Math.cos(angle) * force;
        targetY = oy + Math.sin(angle) * force;
      }

      disp[ix] += (targetX - disp[ix]) * returnSpeed;
      disp[ix + 1] += (targetY - disp[ix + 1]) * returnSpeed;
      disp[ix + 2] += (oz - disp[ix + 2]) * returnSpeed;
    }

    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[displayPositions.current, 3]}
          count={displayPositions.current.length / 3}
          array={displayPositions.current}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#3ecf8e"
        transparent
        opacity={0.85}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        map={glowTexture}
      />
    </points>
  );
}

function EnergyTrails({ positions }: { positions: Float32Array }) {
  const groupRef = useRef<THREE.Group>(null);

  const trailCurves = useMemo(() => {
    const trailCount = 45;
    const curves: THREE.Vector3[][] = [];

    for (let i = 0; i < trailCount; i++) {
      const idx = Math.floor(Math.random() * (positions.length / 3));
      const px = positions[idx * 3];
      const py = positions[idx * 3 + 1];
      const pz = positions[idx * 3 + 2];

      const origin = new THREE.Vector3(px, py, pz);

      // Tangential direction — perpendicular to the radius, biased horizontal
      const radial = origin.clone().normalize();
      const tangent = new THREE.Vector3(-radial.y, radial.x, 0).normalize();

      // Bias the sweep direction mostly left or right, like the reference
      const horizontalBias = Math.random() > 0.5 ? 1 : -1;
      const flowDir = tangent
        .clone()
        .multiplyScalar(horizontalBias)
        .add(new THREE.Vector3(horizontalBias * 0.8, 0, 0))
        .normalize();

      const length = 3 + Math.random() * 5;

      // Gentle S-curve: start at the particle, drift outward and sideways
      const p0 = origin.clone();
      const p1 = origin.clone().add(flowDir.clone().multiplyScalar(length * 0.35))
        .add(new THREE.Vector3(0, (Math.random() - 0.5) * 0.8, 0));
      const p2 = origin.clone().add(flowDir.clone().multiplyScalar(length * 0.7))
        .add(new THREE.Vector3(0, (Math.random() - 0.5) * 1.5, 0));
      const p3 = origin.clone().add(flowDir.clone().multiplyScalar(length))
        .add(new THREE.Vector3(0, (Math.random() - 0.5) * 2.2, 0));

      const curve = new THREE.CatmullRomCurve3([p0, p1, p2, p3]);
      curves.push(curve.getPoints(32));
    }
    return curves;
  }, [positions]);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {trailCurves.map((points, i) => (
        <Line
          key={i}
          points={points}
          color="#3ecf8e"
          transparent
          opacity={0.18}
          lineWidth={1}
        />
      ))}
    </group>
  );
}

function ScatterField() {
  const groupRef = useRef<THREE.Group>(null);

  const layers = useMemo(() => {
    const makeLayer = (count: number, minRadius: number, maxRadius: number) => {
      const arr = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const radius = minRadius + Math.random() * (maxRadius - minRadius);
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);

        arr[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        arr[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        arr[i * 3 + 2] = radius * Math.cos(phi) * 0.3;
      }
      return arr;
    };

    return [
      { positions: makeLayer(120, 3, 9), size: 0.05, opacity: 0.7 },  // few big particles
      { positions: makeLayer(250, 3, 9), size: 0.025, opacity: 0.5 }, // medium
      { positions: makeLayer(400, 3, 9), size: 0.012, opacity: 0.35 }, // many small
    ];
  }, []);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {layers.map((layer, i) => (
        <points key={i}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[layer.positions, 3]}
              count={layer.positions.length / 3}
              array={layer.positions}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial
            size={layer.size}
            color="#3ecf8e"
            transparent
            opacity={layer.opacity}
            sizeAttenuation
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </points>
      ))}
    </group>
  );
}

function Scene() {
  const [positions, setPositions] = useState<Float32Array | null>(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 2500 : 7000;
    generateLogoPoints("/logo.png", count).then(setPositions);
  }, []);

  if (!positions) return null;

  return (
    <>
      <ScatterField />
      <ParticlePoints positions={positions} />
    </>
  );
}

export function ParticleLogoCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={1} />
      <Scene />
    </Canvas>
  );
}