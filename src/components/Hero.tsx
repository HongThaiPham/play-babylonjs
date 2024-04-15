"use client";

import {
  AbstractMesh,
  FreeCamera,
  Mesh,
  PhysicsShapeType,
  Quaternion,
  SceneLoader,
  Vector3,
} from "@babylonjs/core";
import { Suspense, useEffect, useState } from "react";
import {
  ILoadedModel,
  Model,
  useBeforeRender,
  useEngine,
  useScene,
} from "react-babylonjs";

const Hero = () => {
  const scene = useScene();
  const engine = useEngine();
  const [enableAnim, setEnableAnim] = useState(false);
  const [enablePhysics, setEnablePhysics] = useState(false);
  function onModelLoaded(model: ILoadedModel) {
    console.log("model loaded: ", model, engine?.getDeltaTime());
    console.log(typeof model);
    if (model instanceof AbstractMesh) {
      const animationGroups = model.animationGroups
        ? model.animationGroups[0]
        : null;
      console.log("model animation: ", animationGroups);

      const totalFrames = model.animationGroups
        ? model.animationGroups[0]!.to
        : 0;
      console.log("total frames: ", totalFrames);
      console.log("onModelLoaded: ", model);
    }

    if (scene && engine) {
      setInterval(() => {
        const parent = model.rootMesh as Mesh;
        parent.moveWithCollisions(new Vector3(0, 0.01, 0.01));
      }, 30);

      setEnableAnim(true);
      // setEnablePhysics(true);
      // scene.animationGroups[0]?.stop();
      // const anim = scene.getAnimationGroupByName("F_Standing_Idle_001");
      // console.log("anim: ", anim);
      // console.log(anim!.targetedAnimations[0].animation);
      // anim!.addTargetedAnimation(anim!.targetedAnimations[0].animation, model);
      // anim?.start(true);
      // scene.stopAllAnimations();
      // scene.getAnimationGroupByName("IDLE")?.start(true);
      (scene.getCameraByName("camera1")! as FreeCamera).lockedTarget =
        model.rootMesh;

      window.tele = (x: number, y: number, z: number) => {
        const parent = model.rootMesh as Mesh;
        parent.position = new Vector3(x, y, z);
      };
      SceneLoader.ImportAnimationsAsync(
        "/assets/",
        "animated-m.glb",
        scene
      ).then((anim) => {
        // console.log("animation: ", anim);
        scene.stopAllAnimations();
        scene.getAnimationGroupByName("VICTORY")?.start(true);
      });
    }
  }

  useEffect(() => {
    scene?.onReadyObservable.addOnce(() => {
      setEnablePhysics(true);
    });
  }, [scene?.onReadyObservable]);

  console.log("render");

  return (
    <Suspense fallback={<box name="fallback" />}>
      {/* <capsule
        name="palyer-capsune"
        position={new Vector3(0, 0.4, 0)}
        visibility={0.1}
        checkCollisions
        options={{
          height: 1,
          radius: 0.4,
          tessellation: 16,
          subdivisions: 2,
        }}
      > */}
      {/* <box
        name="hero"
        width={1}
        height={2.2}
        depth={1}
        visibility={0.3}
        position={new Vector3(0, 1.1, 0)}
      > */}
      <Model
        // rootUrl={"https://models.readyplayer.me/"}
        // sceneFilename={"661a1b5d8106a27608ba6b5f.glb"}
        rootUrl={"/assets/"}
        sceneFilename={"models/readyplayer.glb"}
        name={"661a1b5d8106a27608ba6b5f"}
        position={new Vector3(0, -0.5, 0)}
        isPickable={false}
        scaleToDimension={1}
        visibility={0}
        receiveShadows
        checkCollisions
        onModelLoaded={onModelLoaded}

        // onLoadProgress={({ loaded, total }) => {
        //   console.log("loading hero", loaded, total);
        // }}
      >
        {enablePhysics ? (
          <physicsAggregate
            type={PhysicsShapeType.CAPSULE}
            _options={{
              mass: 1,
              // restitution: 0.5,
              // friction: 0.5,
            }}
          />
        ) : null}
      </Model>

      {/* {enableAnim ? (
          <Model
            name="hero-idle"
            rootUrl="/assets/"
            sceneFilename="animated-m.glb"
            position={new Vector3(0, -0.5, 0)}
            receiveShadows
            checkCollisions
            onModelLoaded={console.log}
          />
        ) : null} */}
      {/* <physicsAggregate
          type={PhysicsShapeType.CAPSULE}
          _options={{
            mass: 1,
            // restitution: 0.5,
            // friction: 0.5,
          }}
        /> */}
      {/* </capsule> */}
      {/* </box> */}
    </Suspense>
  );
};

export default Hero;
