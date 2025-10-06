import { useState } from "react";
import close from "../assets/close.svg"
import copy from "../assets/copy.svg"
import thumbnail   from "../assets/thumnIL.jpg"
const OpenGuide = ({ onClose }: { onClose: () => void }) => {


   const [showToast, setShowToast] = useState(false);

  // ✅ copy text and show toast
  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setShowToast(true);

      // hide toast after 2 seconds
      setTimeout(() => setShowToast(false), 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  return (
    <div className="popup-overlays1">
      <div className="popup-content1">
        
        {/* Header with title and close button */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 15,
            padding: 16,
            borderBottom: "1px solid rgba(139, 119, 249, 0.3)",
          }}
        >
          <h3 style={{ margin: 0, fontSize: 12 }}>Copy Contents</h3>
          <button
            style={{
              background: "none",
              border: "none",
              fontSize: 20,
              cursor: "pointer",
              color: "rgb(102, 102, 102)",
            }}
            onClick={onClose}
            aria-label="Close popup"
          >
            <img
              src={close}
              alt="Close"
            />
          </button>
        </div>

        {/* Content section */}
        <div style={{ padding: 15 }}>
          
          {/* Copy fields */}
          <div
            className="contentdiv"
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: 10,
              justifyContent: "space-between",
              width: 260,
            }}
          >
            <div>
              <p style={{ margin: 0, fontSize: 12, color: "rgb(160, 160, 176)" }}>
                Name
              </p>
            </div>
            <div>
              <div className="data-attribute">
                <p className="linktext" style={{ lineHeight: "2px" }}>
                  consentbit-data-donotshare
                </p>
                <button onClick={() => handleCopy("consentbit-data-donotshare")}>
                <img
                  src={copy}
                  alt="Copy"
                  title="Copy text"
                  style={{
                    width: 13,
                    height: 13,
                    cursor: "pointer",
                    opacity: 0.7,
                  }}
                />
                </button>
              </div>
            </div>
          </div>

          <div
            className="contentdiv"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: 260,
            }}
          >
            <div>
              <p style={{ margin: 0, fontSize: 12, color: "rgb(160, 160, 176)" }}>
                Value
              </p>
            </div>
            <div>
              <div className="data-attribute">
                <p className="linktext" style={{ lineHeight: "2px" }}>
                  consentbit-link-donotshare
                </p>
                <button onClick={() => handleCopy("consentbit-link-donotshare")}>
                <img
                  src={copy}
                  alt="Copy"
                  title="Copy text"
                  style={{
                    width: 13,
                    height: 13,
                    cursor: "pointer",
                    opacity: 0.7,
                    transition: "opacity 0.2s",
                  }}
                />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* How to use section */}
        <div>
          <div style={{ padding: 15 }}>
            <div
              style={{
                borderBottom: "1px solid rgba(139, 119, 249, 0.3)",
                marginBottom: 20,
              }}
            >
              <h4
                style={{
                  margin: "0 0 10px",
                  fontSize: 12,
                  color: "rgb(160, 160, 176)",
                  fontWeight: 400,
                }}
              >
                How to use
              </h4>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div
                style={{
                  borderRadius: 6,
                  fontSize: 12,
                  lineHeight: 1.4,
                  color: "rgb(160, 160, 176)",
                }}
              >
                <p style={{ margin: "0 0 15px" }}>
                  <span style={{ color: "rgb(255, 255, 255)" }}>Step 1 -</span> Copy the custom attribute above
                </p>
                <p style={{ margin: "0 0 15px" }}>
                  <span style={{ color: "rgb(255, 255, 255)" }}>
                    Step 2 -
                  </span>{" "}
                  In Webflow Designer, select your link element
                </p>
                <p style={{ margin: "0 0 15px" }}>
                  <span style={{ color: "rgb(255, 255, 255)" }}>
                    Step 3 -
                  </span>{" "}
                  Go to Element Settings → Custom Attributes
                </p>
                <p style={{ margin: 0 }}>
                  <span style={{ color: "rgb(255, 255, 255)" }}>
                    Step 4 -
                  </span>{" "}
                  Paste the copied value as the custom attribute
                </p>
                <div style={{ width: "85%" }}>
                  <p>*Place the cookie banner inside a reusable component and include it across all pages of the site.</p>
                </div>
              </div>
              <div
                style={{
                  width: 242,
                  justifyContent: "left",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <p style={{ marginBottom: 12, fontSize: 12, color: "rgb(255, 255, 255)" }}>
                  Watch tutorial
                </p>
                <div>
                  <a target="_blank" rel="noopener noreferrer" href="https://vimeo.com/1107523507">
                    <img
                      src={thumbnail }
                      alt=""
                      style={{ marginBottom: 5, width: 118, height: 70 }}
                    />
                  </a>
                </div>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://vimeo.com/1107523507"
                  style={{
                    textDecoration: "none",
                    color: "rgb(160, 160, 176)",
                    fontSize: 12,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  How to enable do not share link
                  <img
                    src="https://67c7218243770a3d2c39fb20.webflow-ext.com/68b0e5583769195ccc356001/ee42504ef725615ee00c.svg"
                    alt=""
                    style={{ marginLeft: 5 }}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
 {/* Toast */}
        {showToast && <div className="fbp-toast">Copied!</div>}
      </div>
    </div>
  );
};

export default OpenGuide;
