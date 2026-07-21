"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, RoundedBox } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Group } from "three";

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  return prefersReducedMotion;
}

function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(maxScroll > 0 ? window.scrollY / maxScroll : 0);
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return progress;
}

function TechModule({
  position,
  color,
  scale = 1,
}: {
  position: [number, number, number];
  color: string;
  scale?: number;
}) {
  return (
    <group position={position} scale={scale}>
      <RoundedBox args={[1.3, 0.72, 0.18]} radius={0.07} smoothness={6}>
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.16} roughness={0.34} metalness={0.42} />
      </RoundedBox>
      <mesh position={[0.46, 0.02, 0.13]}>
        <boxGeometry args={[0.15, 0.15, 0.08]} />
        <meshStandardMaterial color="#f0f0f5" emissive="#f0f0f5" emissiveIntensity={0.18} />
      </mesh>
      <mesh position={[-0.38, 0.02, 0.13]}>
        <boxGeometry args={[0.44, 0.06, 0.08]} />
            <meshStandardMaterial color="#111827" roughness={0.5} />
      </mesh>
    </group>
  );
}

function SceneContent() {
  const groupRef = useRef<Group>(null);
  const progress = useScrollProgress();
  const prefersReducedMotion = usePrefersReducedMotion();

  const modulePositions = useMemo<[number, number, number][]>(
    () => [
      [-2.4, 0.8, -0.5],
      [-1.15, -0.55, 0.2],
      [0, 1.05, -0.15],
      [1.2, -0.45, 0.3],
      [2.45, 0.72, -0.35],
    ],
    []
  );

  useFrame(({ camera, clock }) => {
    if (!groupRef.current) return;

    const easedProgress = prefersReducedMotion ? 0.18 : progress;
    const time = prefersReducedMotion ? 0 : clock.elapsedTime;

    groupRef.current.rotation.y = time * 0.09 + easedProgress * 1.2;
    groupRef.current.rotation.x = -0.18 + easedProgress * 0.22;
    groupRef.current.position.x = 1.9 - easedProgress * 1.45;
    groupRef.current.position.y = 0.2 - easedProgress * 0.9;
    groupRef.current.position.z = -easedProgress * 1.4;

    camera.position.x = easedProgress * 0.8;
    camera.position.y = 0.7 - easedProgress * 0.35;
    camera.position.z = 6.2 - easedProgress * 1.2;
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 5, 4]} intensity={1.45} />
      <pointLight position={[-3, 2, 2]} intensity={1.2} color="#6366f1" />
      <pointLight position={[3, -1, 1]} intensity={0.9} color="#f59e0b" />

      <group ref={groupRef}>
        <Float speed={prefersReducedMotion ? 0 : 1.4} rotationIntensity={0.35} floatIntensity={0.55}>
          <RoundedBox args={[2.35, 1.38, 0.16]} radius={0.08} smoothness={8} position={[0, 0.2, 0]}>
            <meshStandardMaterial color="#e8ecff" roughness={0.28} metalness={0.25} />
          </RoundedBox>
          <RoundedBox args={[2.08, 1.08, 0.09]} radius={0.05} smoothness={8} position={[0, 0.25, 0.1]}>
            <meshStandardMaterial color="#6366f1" emissive="#6366f1" emissiveIntensity={0.12} roughness={0.38} />
          </RoundedBox>
          <mesh position={[0, -0.7, 0.08]} rotation={[0.22, 0, 0]}>
            <boxGeometry args={[2.75, 0.13, 0.95]} />
            <meshStandardMaterial color="#c7d2fe" roughness={0.36} metalness={0.28} />
          </mesh>
        </Float>

        {modulePositions.map((position, index) => (
          <Float key={position.join("-")} speed={prefersReducedMotion ? 0 : 1 + index * 0.18} rotationIntensity={0.25} floatIntensity={0.35}>
            <TechModule
              position={[
                position[0],
                position[1] - 0.25 + progress * (index % 2 === 0 ? 0.7 : -0.55),
                position[2] - 1.25 - progress * 0.8,
              ]}
              color={index % 2 === 0 ? "#6366f1" : "#f59e0b"}
              scale={0.68}
            />
          </Float>
        ))}
      </group>
    </>
  );
}

export function ThreeScene() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none opacity-20" aria-hidden="true">
      <Canvas
        className="!pointer-events-none"
        style={{ pointerEvents: "none" }}
        camera={{ position: [0, 0.7, 6.2], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{ preserveDrawingBuffer: true, alpha: true }}
      >
        <SceneContent />
      </Canvas>
    </div>
  );
}
