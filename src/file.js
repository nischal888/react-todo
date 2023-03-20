import React, { useCallback, useState } from "react";
const File = ({ id, children }) => {
  const [showChildren, setShowChildren] = useState(false);
  const handleClick = useCallback(() => {
    setShowChildren(!showChildren);
  }, [showChildren, setShowChildren]);

  return (
    <div style={{ marginTop: "20px" }}>
      <span onClick={handleClick}>
        <h4
          style={{
            cursor: "pointer",
            color: showChildren ? "orange" : "grey",
          }}
        >
          {id}
        </h4>
      </span>
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          left: 25,
          borderLeft: "1px solid",
          paddingLeft: 15,
        }}
      >
        {showChildren &&
          (children ?? []).map((node) => <File key={node.id} {...node} />)}
      </div>
    </div>
  );
};

export default File;
