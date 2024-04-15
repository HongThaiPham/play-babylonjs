"use client";

import { Vector3 } from "@babylonjs/core";
import { Suspense } from "react";
import { Model } from "react-babylonjs";
import { PhysicsShapeType } from "@babylonjs/core/Physics/v2/IPhysicsEnginePlugin";

const Map = () => {
  return (
    <Suspense>
      <box
        name="background"
        visibility={0}
        height={0.01}
        position={new Vector3(0, 0, 0)}
        checkCollisions
        receiveShadows
      >
        <Model
          rootUrl={"/assets/"}
          sceneFilename={"startupweekend.glb"}
          name={"startupweekend"}
          position={new Vector3(0, 0, 0)}
          // scaling={new Vector3(1, 1, 1)}
          receiveShadows
          checkCollisions
          isPickable={false}
          reportProgress
          // onLoadProgress={({ loaded, total }) => {
          //   console.log("loading map", loaded, total);
          // }}
        ></Model>
        <physicsAggregate
          type={PhysicsShapeType.BOX}
          _options={{ mass: 0, restitution: 0.1 }}
        />
      </box>
    </Suspense>
  );
};

export default Map;
