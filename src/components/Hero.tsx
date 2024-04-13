"use client";

import { PhysicsShapeType, Quaternion, Vector3 } from "@babylonjs/core";
import { Suspense, useState } from "react";
import { Model, useBeforeRender } from "react-babylonjs";

const Hero = () => {
  return (
    <Suspense>
      <box
        name="hero"
        width={1}
        height={2.2}
        depth={1}
        visibility={0.5}
        position={new Vector3(0, 3, 0)}
      >
        <Model
          rootUrl={"https://models.readyplayer.me/"}
          sceneFilename={"661a1b5d8106a27608ba6b5f.glb"}
          name={"661a1b5d8106a27608ba6b5f"}
          position={new Vector3(0, -1.1, 0)}
          isPickable={false}
          visibility={0}
          receiveShadows
          checkCollisions
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
