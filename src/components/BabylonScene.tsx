"use client";
import { Scene, Engine, SceneEventArgs } from "react-babylonjs";
import "@babylonjs/core/Physics/physicsEngineComponent"; // side-effect adds scene.enablePhysics function
import { PropsWithChildren, useEffect, useState } from "react";
import { HavokPlugin, PhysicsShapeType, Vector3 } from "@babylonjs/core";
import "@babylonjs/loaders/glTF";
import ShadowBox from "./ShadowBox";
import PhysicProvider from "./PhysicProvider";
import Map from "./Map";
import Hero from "./Hero";
import HavokPhysics from "@babylonjs/havok";
const BabylonScene: React.FC<PropsWithChildren> = ({ children }) => {
  const [isClient, setIsClient] = useState(false);
  const [physicEnabled, setPhysicEnabled] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      require("@babylonjs/core/Debug/debugLayer");
      require("@babylonjs/loaders/glTF");
      require("@babylonjs/inspector");
      require("@babylonjs/loaders/OBJ");
      setIsClient(true);
    }
  }, []);

  const handleScreenMount = async (sceneEventArgs: SceneEventArgs) => {
    console.log("onSceneMount: ", sceneEventArgs);
    const { scene } = sceneEventArgs;
    const engine = scene.getEngine();
    if (scene && engine) {
      // scene.enablePhysics(new Vector3(0, -9.81, 0), new CannonJSPlugin());
      const _res = scene.enablePhysics(
        new Vector3(0, -9.81, 0),
        new HavokPlugin(false, await HavokPhysics())
      );
      setPhysicEnabled(_res ?? false);
      scene.debugLayer.show();
    }
  };

  if (!isClient) {
    return null;
  }

  return (
    <Engine
      antialias
      adaptToDeviceRatio
      canvasId="play-babylon"
      style={{ height: "100vh" }}
      engineOptions={{
        deterministicLockstep: true,
        lockstepMaxSteps: 4,
      }}
    >
      <Scene collisionsEnabled={true} onSceneMount={handleScreenMount}>
        {physicEnabled ? (
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
        ) : null}
      </Scene>
    </Engine>
  );
};

export default BabylonScene;
