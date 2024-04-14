"use client";

import {
  AbstractMesh,
  PhysicsShapeType,
  Quaternion,
  Vector3,
} from "@babylonjs/core";
import { Suspense, useState } from "react";
import {
  ILoadedModel,
  Model,
  useBeforeRender,
  useScene,
} from "react-babylonjs";

const Hero = () => {
  const scene = useScene();
  function onModelLoaded(model: ILoadedModel) {
    console.log("model loaded: ", model);
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

    if (scene) {
      // scene.animationGroups[0]?.stop();
    }
  }

  return (
    <Suspense fallback={<box name="fallback" />}>
      <box
        name="hero"
        width={1}
        height={2.2}
        depth={1}
        visibility={0.3}
        position={new Vector3(0, 1.1, 0)}
      >
        <Model
          // rootUrl={"https://models.readyplayer.me/"}
          // sceneFilename={"661a1b5d8106a27608ba6b5f.glb"}
          rootUrl={"/assets/"}
          sceneFilename={"scene.gltf"}
          name={"661a1b5d8106a27608ba6b5f"}
          position={new Vector3(0, -1.1, 0)}
          isPickable={false}
          // scaleToDimension={1}
          visibility={0}
          receiveShadows
          checkCollisions
          onModelLoaded={onModelLoaded}
          // onLoadProgress={({ loaded, total }) => {
          //   console.log("loading hero", loaded, total);
          // }}
        ></Model>
        <physicsAggregate
          type={PhysicsShapeType.CAPSULE}
          _options={{
            mass: 60,
            restitution: 0,
            friction: 0.5,
          }}
        />
      </box>
    </Suspense>
  );
};

export default Hero;
