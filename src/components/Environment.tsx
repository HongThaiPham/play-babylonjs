"use client";

import { Vector3 } from "@babylonjs/core";
import { useState } from "react";

const Environment: React.FC = () => {
  const [fps, setFps] = useState<string>("60 fps");
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
      <adtFullscreenUi name="UI">
        <textBlock
          key="fpsCounter"
          text={fps}
          width={30}
          height={30}
          color={"orange"}
          fontSize={18}
          top={"-48%"}
          left={"48.5%"}
        />
      </adtFullscreenUi>
    </>
  );
};

export default Environment;
