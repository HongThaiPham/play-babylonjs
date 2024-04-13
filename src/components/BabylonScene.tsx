"use client";
import { Scene, Engine } from "react-babylonjs";
import "@babylonjs/core/Physics/physicsEngineComponent"; // side-effect adds scene.enablePhysics function
import { PropsWithChildren, useEffect, useState } from "react";
import { PhysicsShapeType, Vector3 } from "@babylonjs/core";
import "@babylonjs/loaders/glTF";
import ShadowBox from "./ShadowBox";
import PhysicProvider from "./PhysicProvider";
import Map from "./Map";
import Hero from "./Hero";
const BabylonScene: React.FC<PropsWithChildren> = ({ children }) => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      require("@babylonjs/core/Debug/debugLayer");
      require("@babylonjs/loaders/glTF");
      require("@babylonjs/inspector");
      require("@babylonjs/loaders/OBJ");
      setIsClient(true);
    }
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <Engine antialias adaptToDeviceRatio canvasId="play-babylon">
      <Scene>
        <PhysicProvider>
          {/* <ground
            name="ground"
            width={20}
            height={15}
            receiveShadows
            checkCollisions
            subdivisions={0}
            position={new Vector3(0, -1, 0)}
          >
            <physicsAggregate
              type={PhysicsShapeType.BOX}
              _options={{ mass: 0, restitution: 0.1 }}
            />
          </ground> */}
          <Map />
          <ShadowBox>
            <Hero />
          </ShadowBox>
        </PhysicProvider>
      </Scene>
    </Engine>
  );
};

export default BabylonScene;
