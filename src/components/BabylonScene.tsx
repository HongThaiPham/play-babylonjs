"use client";
import { Scene, Engine } from "react-babylonjs";
import "@babylonjs/core/Physics/physicsEngineComponent"; // side-effect adds scene.enablePhysics function
import { PropsWithChildren, useEffect, useMemo, useState } from "react";
import { PhysicsShapeType, Vector3 } from "@babylonjs/core";
import { HavokPlugin } from "@babylonjs/core/Physics/v2/Plugins/havokPlugin";
import "@babylonjs/loaders/glTF";
import Environment from "./Environment";
import ShadowBox from "./ShadowBox";
import HavokPhysics, { HavokPhysicsWithBindings } from "@babylonjs/havok";

async function getInitializedHavok() {
  return await HavokPhysics();
}

const gravityVector = new Vector3(0, -9.81, 0);

const BabylonScene: React.FC<PropsWithChildren> = ({ children }) => {
  const [isEnable, setIsEnable] = useState(false);
  const [HK, setHK] = useState<HavokPhysicsWithBindings>();
  useEffect(() => {
    if (typeof window !== "undefined") {
      require("@babylonjs/core/Debug/debugLayer");
      require("@babylonjs/inspector");
      require("@babylonjs/core/Physics/physicsEngineComponent");
      require("@babylonjs/loaders/glTF");
      (async () => {
        setHK(await getInitializedHavok());
      })();
    }
  }, []);

  const hkPlugint = useMemo(() => {
    if (!HK) return null;
    return new HavokPlugin(false, HK);
  }, [HK]);

  console.log("HK", hkPlugint);

  if (!HK) return null;

  return (
    <Engine antialias adaptToDeviceRatio canvasId="play-babylon">
      {HK ? (
        <Scene>
          <Environment setIsEnable={setIsEnable} />
          {isEnable ? (
            <>
              <ground
                name="ground"
                width={5}
                height={5}
                receiveShadows
                checkCollisions
                subdivisions={0}
                position={new Vector3(0, -1, 0)}
              >
                <physicsAggregate
                  type={PhysicsShapeType.BOX}
                  _options={{ mass: 0, restitution: 0.1 }}
                />
              </ground>
              <ShadowBox>{children}</ShadowBox>
            </>
          ) : null}
        </Scene>
      ) : null}
    </Engine>
  );
};

export default BabylonScene;
