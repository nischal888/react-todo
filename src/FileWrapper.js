import { root } from "./data";
import File from "./file";
const FileWrapper = () => {
  return (
    <div style={{ marginLeft: 15 }}>
      <File {...root} />
    </div>
  );
};

export default FileWrapper;
