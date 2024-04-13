"use client";

import { HavokPlugin, Vector3 } from "@babylonjs/core";
import { useEffect } from "react";
import { useScene } from "react-babylonjs";
import HavokPhysics from "@babylonjs/havok";
type Props = {
  setIsEnable: (isEnable: boolean) => void;
};
const Environment: React.FC<Props> = ({ setIsEnable }) => {
  const scene = useScene();

  useEffect(() => {
    // @ts-ignore
    window.scene = scene;
    HavokPhysics().then((HK) => {
      const isEnable = scene?.enablePhysics(
        new Vector3(0, -9.81, 0),
        new HavokPlugin(false, HK)
      );
      setIsEnable(isEnable ?? false);
    });
  }, [scene, setIsEnable]);
  return (
    <>
      <arcRotateCamera
        name="camera1"
        position={new Vector3(0, 5, -10)}
        setTarget={[Vector3.Zero()]}
        alpha={Math.PI / 2}
        beta={Math.PI / 4}
        radius={6}
        target={Vector3.Zero()}
        lowerRadiusLimit={3}
        upperRadiusLimit={10}
        checkCollisions
      />

      <hemisphericLight
        name="light1"
        intensity={0.7}
        direction={Vector3.Up()}
      />
    </>
  );
};

export default Environment;
