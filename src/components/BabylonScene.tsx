"use client";
import { Scene, Engine, SceneEventArgs } from "react-babylonjs";
import "@babylonjs/core/Physics/physicsEngineComponent"; // side-effect adds scene.enablePhysics function
import { PropsWithChildren, useEffect, useRef, useState } from "react";
import {
  Color3,
  GroundMesh,
  HavokPlugin,
  PhysicsShapeType,
  Vector3,
} from "@babylonjs/core";
import "@babylonjs/loaders/glTF";
import ShadowBox from "./ShadowBox";
import PhysicProvider from "./PhysicProvider";
import Map from "./Map";
import Hero from "./Hero";
import HavokPhysics from "@babylonjs/havok";

import { GridMaterial } from "@babylonjs/materials";

const BabylonScene: React.FC<PropsWithChildren> = ({ children }) => {
  const [isClient, setIsClient] = useState(false);
  const [physicEnabled, setPhysicEnabled] = useState(false);
  const [groundReady, setGroundReady] = useState(false);
  const groundRef = useRef<GroundMesh>(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      require("@babylonjs/core/Debug/debugLayer");
      require("@babylonjs/loaders/glTF");
      require("@babylonjs/inspector");
      require("@babylonjs/loaders/OBJ");
      setIsClient(true);
    }
  }, []);

  function setupGroundGrid() {
    if (!groundRef.current) return;

    console.log("adjusting ground material");
    const groundMaterial = new GridMaterial(
      "groundMaterial",
      groundRef.current._scene
    );
    groundMaterial.minorUnitVisibility = 0.45;
    groundMaterial.majorUnitFrequency = 10;
    groundMaterial.gridRatio = 2;
    groundMaterial.backFaceCulling = false;
    groundMaterial.mainColor = new Color3(1, 1, 1);
    groundMaterial.lineColor = new Color3(1.0, 1.0, 1.0);
    groundMaterial.opacity = 0.1;
    groundRef.current.material = groundMaterial;
  }

  const handleScreenMount = async (sceneEventArgs: SceneEventArgs) => {
    console.log("onSceneMount: ", sceneEventArgs);
    const { scene } = sceneEventArgs;
    const engine = scene.getEngine();

    if (scene && engine) {
      window.scene = scene;
      // scene.enablePhysics(new Vector3(0, -9.81, 0), new CannonJSPlugin());
      const _res = scene.enablePhysics(
        new Vector3(0, -9.81, 0),
        new HavokPlugin(false, await HavokPhysics())
      );
      setPhysicEnabled(_res ?? false);
      // scene.debugLayer.show();
      setTimeout(setupGroundGrid, 500);
    }
  };
  const handleGroundCreated = () => {
    console.log("handleGroundCreated");
    setTimeout(() => {
      setGroundReady(true);
    }, 1000);
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
              ref={groundRef}
              width={20}
              height={15}
              receiveShadows
              checkCollisions
              subdivisions={2}
              position={new Vector3(0, -0.1, 0)}
              isPickable={false}
              onCreated={handleGroundCreated}
            >
              <physicsAggregate
                type={PhysicsShapeType.BOX}
                _options={{ mass: 0, restitution: 0.1 }}
              />
            </ground> */}
            <Map />
            {/* {groundReady ? ( */}
            <ShadowBox>
              <Hero />
            </ShadowBox>
            ){/* : null} */}
          </PhysicProvider>
        ) : null}
      </Scene>
    </Engine>
  );
};

export default BabylonScene;
