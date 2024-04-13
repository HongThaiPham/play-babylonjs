"use client";

import { Vector3 } from "@babylonjs/core";

const Environment: React.FC = () => {
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
