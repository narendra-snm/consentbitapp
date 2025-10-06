import React, { useState } from "react";
import { framer } from "framer-plugin";

function InjectBodyDiv() {
  const [injected, setInjected] = useState(false);
  const [bgColor, setBgColor] = useState("#ffeb3b"); // Default yellow background
  const [textColor, setTextColor] = useState("#222"); // Default dark text color

  const injectBodyDiv = () => {
    if (injected) {
      console.log("Plugin UI: div already injected in this session");
      return;
    }
    const html = `<div style="
      position:fixed; 
      bottom:24px; 
      right:24px; 
      background:${bgColor}; 
      color:${textColor}; 
      border:2px solid #333; 
      padding:20px 40px; 
      z-index:9999; 
      font-size:20px; 
      border-radius:8px; 
      box-shadow:0 4px 16px rgba(0,0,0,0.14);"
    >
      ✅ Injected Test Div
    </div>`;

    if (framer) {
      framer.setCustomCode({ html, location: "bodyEnd" });
      console.log("Plugin UI: div saved to project body section");
      alert("Div has been added to your project. Please republish the site to apply it!");
      setInjected(true);
    } else {
      console.warn("framer.setCustomCode is not available.");
    }
  };

  return (
    <div>
      <div style={{ marginBottom: 10 }}>
        <label>
          Background Color:{" "}
          <input
            type="color"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
          />
        </label>
      </div>
      <div style={{ marginBottom: 20 }}>
        <label>
          Text Color:{" "}
          <input
            type="color"
            value={textColor}
            onChange={(e) => setTextColor(e.target.value)}
          />
        </label>
      </div>
      <button onClick={injectBodyDiv}>Add Div to Framer Site</button>
    </div>
  );
}

export default InjectBodyDiv;
