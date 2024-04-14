"use client";
import { HavokPlugin, Vector3 } from "@babylonjs/core";
import HavokPhysics from "@babylonjs/havok";
import { PropsWithChildren, useEffect, useState } from "react";
import { useScene } from "react-babylonjs";
import Environment from "./Environment";

const PhysicProvider: React.FC<PropsWithChildren> = ({ children }) => {
  // const scene = useScene();
  // const [isEnable, setIsEnable] = useState(false);

  // useEffect(() => {
  //   if (!scene) return;
  //   window.scene = scene;
  //   const engine = scene.getEngine();
  //   engine.displayLoadingUI();
  //   HavokPhysics().then((HK) => {
  //     const isEnable = scene.enablePhysics(
  //       new Vector3(0, -9.81, 0),
  //       new HavokPlugin(false, HK)
  //     );

  //     setIsEnable(isEnable ?? false);
  //     engine.hideLoadingUI();
  //   });
  // }, [scene, setIsEnable]);

  // if (!isEnable) return null;
  return (
    <>
      <Environment />
      {children}
    </>
  );
};

export default PhysicProvider;
