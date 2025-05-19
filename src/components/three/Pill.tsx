"use client";

import { useRef } from 'react';
import { Capsule} from '@react-three/drei';
import { RigidBody, RapierRigidBody, RigidBodyProps } from '@react-three/rapier';
import * as THREE from 'three';

interface PillProps extends Omit<RigidBodyProps, 'children'> { // Accept all RigidBodyProps except children
  id: string;
  color: string;
  smiley: string;
}

export function Pill({ id, color, ...rigidBodyProps }: PillProps) {
  const bodyRef = useRef<RapierRigidBody>(null);
  const meshGroupRef = useRef<THREE.Group>(null);

  // Optional: Add a very subtle random initial spin for visual variety when falling
  // This can also be done when spawning if preferred.
  // useEffect(() => {
  //   if (bodyRef.current) {
  //     bodyRef.current.setAngvel({ x: 0, y: 0, z: (Math.random() - 0.5) * 0.5 }, true);
  //   }
  // }, []);

  return (
    <RigidBody
      ref={bodyRef}
      name={`pill-${id}`} // For debugging
      colliders="cuboid" // Cuboid collider often better for capsule-like shapes stacking
      restitution={0.3}
      friction={0.7}
      linearDamping={0.2}
      angularDamping={0.8} // Slightly more angular damping for 2D feel
      canSleep={true}
      {...rigidBodyProps} // Spread position, etc. passed from parent
    >
      <group ref={meshGroupRef}>
        <Capsule
          args={[0.18, 0.35, 10, 12]} // radius, length, capSegments, radialSegments
          rotation={[0, 0, Math.PI / 2]} // Rotate capsule to be horizontal
          castShadow
        >
          <meshStandardMaterial color={color} metalness={0.2} roughness={0.7} />
        </Capsule>
       
      </group>
    </RigidBody>
  );
}