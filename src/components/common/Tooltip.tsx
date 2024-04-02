import React, { useState } from "react";

const Tooltip = ({
  children,
  content,
}: {
  children: React.ReactNode;
  content: React.ReactNode;
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseEnter = () => setShowTooltip(true);
  const handleMouseLeave = () => setShowTooltip(false);

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        position: "relative",
      }}
    >
      {children}
      <span
        style={{
          display: showTooltip ? "block" : "none",
          position: "absolute",
          padding: "5px 10px",
          backgroundColor: "#000",
          borderRadius: "3px",
          fontSize: "12px",
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
          top: "20px",
          left: "80px",
          zIndex: 99999,
          color: "white",
        }}
      >
        {content}
      </span>
    </div>
  );
};

export default Tooltip;
