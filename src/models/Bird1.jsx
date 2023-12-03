import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useAnimations, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useThree } from '@react-three/fiber';

import birdScene from "../assets/3d/bird1.glb";

export function Bird1() {
  const birdRef = useRef();

  const { scene, animations } = useGLTF(birdScene);
  const { actions } = useAnimations(animations, birdRef);
  const { camera } = useThree(); // Access to the Three.js camera

  useEffect(() => {
    actions["fly2_bird"].play();
  }, [actions]);

  useFrame(({ clock, camera, gl }) => {
    const radius = 3;
    const speed = 0.7;
    const height = 0.05;
    const depth = 2;
  
    const theta = clock.elapsedTime * speed;
    const x = Math.cos(theta) * radius;
    const z = Math.sin(theta) * radius * depth;
  
    birdRef.current.position.x = x;
    birdRef.current.position.z = z;
    birdRef.current.position.y = height;
  
    birdRef.current.rotation.y = -theta;
  
    // Check if the bird is behind the island
    const birdWorldPosition = new THREE.Vector3();
    birdRef.current.getWorldPosition(birdWorldPosition);
  
    // Calculate the direction vector from the camera to the bird
    const direction = new THREE.Vector3().subVectors(birdWorldPosition, camera.position);
  
    // Check if the bird is behind the island by comparing angles
    const angle = direction.angleTo(camera.getWorldDirection(new THREE.Vector3()));
    const isBehindIsland = angle > Math.PI / 2;
  
    // Make the bird invisible if it's behind the island
    birdRef.current.visible = !isBehindIsland;
  
    // Update the depth buffer to ensure correct rendering
    gl.autoClearDepth = true;
    gl.render(scene, camera);
  });

  return (
    <mesh ref={birdRef} position={[-5, 2, 1]} scale={[0.2, 0.2, 0.2]} rotation={[0, 7, 0]}>
      <primitive object={scene} />
    </mesh>
  );
}