/**
 * IMPORTANT: Loading glTF models into a Three.js scene is a lot of work.
 * Before we can configure or animate our model’s meshes, we need to iterate through
 * each part of our model’s meshes and save them separately.
 *
 * But luckily there is an app that turns gltf or glb files into jsx components
 * For this model, visit https://gltf.pmnd.rs/
 * And get the code. And then add the rest of the things.
 * YOU DON'T HAVE TO WRITE EVERYTHING FROM SCRATCH
 */

import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

import scene from "../assets/3d/blob.glb";


export function Blob({ currentAnimation, ...props }) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(scene);
  const { actions } = useAnimations(animations, group);

  // This effect will run whenever the currentAnimation prop changes
  useEffect(() => {
    Object.values(actions).forEach((action) => action.stop());

    if (actions[currentAnimation]) {
      actions[currentAnimation].play();
    }
  }, [actions, currentAnimation]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group
          name="Sketchfab_model"
          position={[-0.053, -65.294, -16.652]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <group
            name="f083b38492e24f058faf3a9ae78ea6a0fbx"
            rotation={[Math.PI / 2, 0, 0]}
          >
            <group name="Object_2">
              <group name="RootNode">
                <group name="Object_4">
                  <primitive object={nodes._rootJoint} />
                  <skinnedMesh
                    name="Object_7"
                    geometry={nodes.Object_7.geometry}
                    material={materials["01_-_Default"]}
                    skeleton={nodes.Object_7.skeleton}
                  />
                  <group
                    name="Object_6"
                    position={[0, 0, -79.337]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <group name="Seal" rotation={[-Math.PI / 2, 0, 0]} />
                  <group
                    name="Point001"
                    position={[0, 31.435, 74.111]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <group
                    name="Point003"
                    position={[0, 37.674, -30.223]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <group
                    name="Point005"
                    position={[0, 7.966, -129.213]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <group
                    name="Point004"
                    position={[0, 20.286, -79.71]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                  <group
                    name="Point002"
                    position={[0, 38.602, 22.103]}
                    rotation={[-Math.PI / 2, 0, 0]}
                  />
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload(scene);