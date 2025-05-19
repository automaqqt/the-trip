"use client";

import React, { Suspense, useState, useEffect, useRef, useCallback } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
// Import useRapier to get the world instance
import { Physics, CuboidCollider, useRapier } from '@react-three/rapier';
import { Pill } from './Pill';
import * as THREE from 'three';

const pillColors = ['#FF6B6B', '#FFD166', '#06D6A0', '#118AB2', '#EF476F', '#4ECDC4', '#703FEA', '#E965BA'];
const smileys = ["😀", "😂", "😍", "🥳", "🤩", "😎", "😋", "🤪"];

interface PillInstance {
  id: string;
  position: [number, number, number];
  color: string;
  smiley: string;
}

const SceneContent = ({ isVisible }: { isVisible: boolean }) => {
  const [pills, setPills] = useState<PillInstance[]>([]);
  const { size, camera } = useThree();
  const { world } = useRapier(); // <-- Get the world instance using the hook
  const pillBodiesRef = useRef<Map<string, object>>(new Map()); // Store refs to RigidBodyApi

  const maxPills = 60;
  const spawnAreaWidthFactor = 0.8;
  const pillSpawnZ = 0;

  const getSpawnArea = useCallback(() => {
    const cam = camera as THREE.PerspectiveCamera;
    // Ensure camera.position.z is not 0 if camera is at origin looking along -Z
    const distance = Math.abs(cam.position.z) < 0.01 ? 8 : cam.position.z; // Default distance if camera is at Z=0
    const vFov = THREE.MathUtils.degToRad(cam.fov);
    const height = 2 * Math.tan(vFov / 2) * distance;
    const width = height * cam.aspect;
    return {
      top: height / 2 + 2,
      width: width * spawnAreaWidthFactor,
      bottom: -height / 2,
    };
  }, [camera]);

  useEffect(() => {
    if (!isVisible) {
      setPills([]);
      console.log(size)
      pillBodiesRef.current.clear();
      return;
    }

    const spawnArea = getSpawnArea();
    let spawnedCount = 0;

    const spawnInterval = setInterval(() => {
      if (pills.length + spawnedCount < maxPills) {
        const newPill: PillInstance = {
          id: `pill-${Date.now()}-${Math.random()}`,
          position: [
            (Math.random() - 0.5) * spawnArea.width,
            spawnArea.top + Math.random(),
            pillSpawnZ + (Math.random() - 0.5) * 0.05,
          ],
          color: pillColors[Math.floor(Math.random() * pillColors.length)],
          smiley: smileys[Math.floor(Math.random() * smileys.length)],
        };
        setPills(prev => [...prev, newPill]);
        spawnedCount++;
      } else {
        clearInterval(spawnInterval);
      }
    }, 120);

    return () => clearInterval(spawnInterval);
  }, [isVisible, getSpawnArea, pills.length]);

  const handleCanvasClick = useCallback((event: MouseEvent) => {
    // No need to check rapier.current, world from useRapier should be available
    const clickPoint = new THREE.Vector3(
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1,
      0.5
    );
    clickPoint.unproject(camera);

    const dir = clickPoint.clone().sub(camera.position).normalize();
    const distanceToZPlane = -camera.position.z / dir.z;
    const worldClickOnPillPlane = camera.position.clone().add(dir.multiplyScalar(distanceToZPlane));

    const pushRadius = 2.0;
    const pushStrength = 2.0;

    // Iterate through RIGID BODIES managed by Rapier world directly for applying forces,
    // or use our pillBodiesRef map. Using the map is more direct if populated correctly.
    pillBodiesRef.current.forEach(body => {
      if (body) { // Check if body is not null (it shouldn't be if in the map)
        //@ts-expect-error this is super useless
        const pillPosition = body.translation(); // Rapier Vector
        const distanceToPill = Math.sqrt(
          Math.pow(pillPosition.x - worldClickOnPillPlane.x, 2) +
          Math.pow(pillPosition.y - worldClickOnPillPlane.y, 2)
        );

        if (distanceToPill < pushRadius) {
          const forceFactor = (pushRadius - distanceToPill) / pushRadius;
          const impulseDirection = new THREE.Vector3(
            pillPosition.x - worldClickOnPillPlane.x,
            pillPosition.y - worldClickOnPillPlane.y,
            (Math.random() - 0.5) * 0.2
          ).normalize();
          //@ts-expect-error this is super useless
          body.applyImpulse(
            {
              x: impulseDirection.x * pushStrength * forceFactor,
              y: impulseDirection.y * pushStrength * forceFactor,
              z: impulseDirection.z * pushStrength * forceFactor * 0.5,
            },
            true
          );
          //@ts-expect-error this is super useless
          body.applyTorqueImpulse(
            { x: 0, y: 0, z: (Math.random() - 0.5) * pushStrength * 0.1 * forceFactor },
            true
          );
          //@ts-expect-error this is super useless
          body.wakeUp();
        }
      }
    });
  }, [camera, world]); // Add world to dependency array

  useEffect(() => {
    const canvasEl = document.querySelector('.pill-rain-canvas canvas');
    if (canvasEl) {
        canvasEl.addEventListener('click', handleCanvasClick as EventListener);
        return () => canvasEl.removeEventListener('click', handleCanvasClick as EventListener);
    }
  }, [handleCanvasClick]);

  const spawnArea = getSpawnArea();

  if (!isVisible && pills.length === 0) return null;

  return (
    <Suspense fallback={null}>
      <ambientLight intensity={0.9} />
      <directionalLight position={[2, 5, 5]} intensity={2.0} castShadow shadow-mapSize={[1024, 1024]} />
      <Stars radius={100} depth={20} count={2000} factor={3} saturation={0} fade speed={0.1} />

      {/* The <Physics> component makes the `world` from `useRapier()` available */}
      {/* No need to pass `ref={rapier}` to Physics component itself */}
      {pills.map((pill) => (
        <Pill
          key={pill.id}
          {...pill} // Spreads position, color, smiley, id
          // Store ref to RigidBodyApi for direct manipulation
          ref={(body) => {
            if (body) pillBodiesRef.current.set(pill.id, body);
            else pillBodiesRef.current.delete(pill.id); // Clean up if component unmounts
          }}
        />
      ))}
      <CuboidCollider
        position={[0, spawnArea.bottom - 0.1, pillSpawnZ]}
        args={[spawnArea.width / 2 + 2, 0.1, 1]}
        restitution={0.1}
        friction={0.9}
      />
      {/* <CuboidCollider position={[0, 0, pillSpawnZ - 0.5]} args={[spawnArea.width / 2 + 2, spawnArea.top * 2, 0.1]} /> */}
    </Suspense>
  );
};

// PillRainEffect component (the one exporting default) remains the same as before
export default function PillRainEffect({ isVisible }: { isVisible: boolean }) {
  if (!isVisible) return null;

  return (
    <div className="pill-rain-canvas fixed inset-0 z-[100] pointer-events-none">
      <Canvas
        shadows
        camera={{ position: [0, 0, 8], fov: 50 }}
        flat
        style={{pointerEvents: "auto"}}
      >
        {/* Physics wrapper needs to be inside Canvas but outside SceneContent if SceneContent uses useRapier */}
        <Physics gravity={[0, -9.5, 0]}>
            <SceneContent isVisible={isVisible} />
        </Physics>
      </Canvas>
    </div>
  );
}