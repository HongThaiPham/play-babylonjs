"use client";
import { Vector3 } from "@babylonjs/core";
import { PropsWithChildren } from "react";

const ShadowBox: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <directionalLight
      name="dl"
      intensity={0.6}
      direction={new Vector3((-5 * Math.PI) / 4, (-5 * Math.PI) / 4, -Math.PI)}
      position={new Vector3(0, 4, 16)}
    >
      <shadowGenerator
        mapSize={1024}
        useBlurExponentialShadowMap
        blurKernel={64}
        shadowCastChildren
      >
        {children}
      </shadowGenerator>
    </directionalLight>
  );
};

export default ShadowBox;
