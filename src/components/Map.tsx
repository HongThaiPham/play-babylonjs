"use client";

import { Vector3 } from "@babylonjs/core";
import { Suspense } from "react";
import { Model } from "react-babylonjs";
import { PhysicsShapeType } from "@babylonjs/core/Physics/v2/IPhysicsEnginePlugin";

const Map = () => {
  return (
    <Suspense>
      <Model
        rootUrl={"/assets/"}
        sceneFilename={"startupweekend.glb"}
        name={"startupweekend"}
        position={Vector3.Zero()}
        scaling={new Vector3(1, 1, 1)}
        receiveShadows
        isPickable={false}
        reportProgress

        // onLoadProgress={({ loaded, total }) => {
        //   console.log("loading map", loaded, total);
        // }}
      >
        <physicsAggregate
          type={PhysicsShapeType.BOX}
          _options={{ mass: 0, restitution: 10 }}
        />
      </Model>
    </Suspense>
  );
};

export default Map;
