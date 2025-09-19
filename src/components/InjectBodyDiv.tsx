import React, { useState } from "react";
import { framer, CanvasNode } from "framer-plugin";
function InjectBodyDiv() {
  const [injected, setInjected] = useState(false);

  const injectBodyDiv = () => {
    if (injected) {
      console.log("Plugin UI: div already injected in this session");
      return;
    }
    const html =  `<div style="position:fixed; bottom:24px; right:24px; background:#ffeb3b; color:#222; border:2px solid #333; padding:20px 40px; z-index:9999; font-size:20px; border-radius:8px; box-shadow:0 4px 16px rgba(0,0,0,0.14);">
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
    <button onClick={injectBodyDiv}>
      Add Div to Framer Site
    </button>
  );
}

export default InjectBodyDiv;
