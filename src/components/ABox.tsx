import { CreateBox, Vector3 } from "@babylonjs/core";

const ABox = () => {
  // const box = CreateBox("box", { size: 2 });
  // box.position = new Vector3(0, 1, 0);
  // box.rotation = Vector3.Zero();
  return (
    <box
      name="box"
      size={1}
      position={new Vector3(0, 1, 0)}
      rotation={new Vector3(0, 1, 0)}
    />
  );
};

export default ABox;
