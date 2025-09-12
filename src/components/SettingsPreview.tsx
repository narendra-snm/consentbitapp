import { CustomizationState } from "./CustomizationSidebar";
import logo from "../assets/icon.svg";
import dots from "../assets/threedots.svg";
const SettingsPreview = ({
  customization,
}: {
  customization?: CustomizationState;
}) => {
  // Default fallback for non-customization tab
  const custom = customization || {
    bannerAlignment: "center",
    bannerStyle: "style1",
    font: "Inter",
    weight: "Regular",
    size: 15,
    textAlignment: "left",
    colors: {
      bannerBg: "#23234b",
      bannerBg2: "#0c0c5f",
      title: "#000000",
      body: "#4c4a86",
      btnPrimaryBg: "#000000",
      btnPrimaryText: "#fff",
      btnSecondaryBg: "#e8e8ea",
      btnSecondaryText: "#000000",
    },
    radius: { container: 12, button: 7 },
  };



  const fontWeight= custom.weight === "Regular" ? 400 : custom.weight === "Medium" ? 500 : custom.weight === "SemiBold" ? 600 : custom.weight === "Bold" ? 700 : 400;
  
  const bannerAlignment = custom.bannerAlignment === "center" ? "center" : custom.bannerAlignment === "left" ? "flex-start" : "flex-end";
const width = custom.bannerStyle === "style1" ? 318 : custom.bannerStyle === "style2" ? 318 : custom.bannerStyle === "style3" ? 250 : custom.bannerStyle === "style4" ? 318 : 448;
const buttonAlignment = custom.bannerStyle === "style4" ? "center" : "flex-end";
  console.log("Customization in Preview:", customization);
  return  (
  <div className="settings-preview-main">
    <div className="settings-preview-header">Preview</div>
    <div className="settings-preview-content">
      {/* Placeholder for browser window & cookie setting sample */}
      <div className="browser-mockup">
        <div className="browser-bar" >
          <img src={dots} alt="menu" style={{width:20, height:20,marginLeft:10}} />
        </div>
        <div className="cookie-preview" style={{ justifyContent: bannerAlignment }} >
        <div className="cookie-preview-popup" style={{textAlign: custom.textAlignment ,width:width,fontFamily:custom.font, fontWeight: fontWeight, fontSize: custom.size,  borderRadius: custom.radius.container, backgroundColor: custom.colors.bannerBg,color: custom.colors.body, }}>
          <div className="cookie-title" style={{color: custom.colors.title}}>Cookie Setting</div>
          <div className="cookie-desc">
            We use cookies to provide you with the best possible experience. They also allow us to analyze user behavior in order to constantly improve the website for you.
          </div>
          <div className="cookie-btn-row" style={{ justifyContent: buttonAlignment }}>
            <button className="cookie-pref-btn" style={{color: custom.colors.btnSecondaryText, backgroundColor: custom.colors.btnSecondaryBg, borderRadius: custom.radius.button}}>Preferences</button>
            <button className="cookie-reject-btn" style={{color: custom.colors.btnSecondaryText, backgroundColor: custom.colors.btnSecondaryBg, borderRadius: custom.radius.button}}>Reject</button>
            <button className="cookie-accept-btn" style={{color: custom.colors.btnPrimaryText, backgroundColor: custom.colors.btnPrimaryBg, borderRadius: custom.radius.button}}>Accept All</button>
          </div>
        </div>
        </div>
        <div className="cookie-fab"><img src={logo} alt="logo" /></div>
      </div>
    </div>
  </div>
);
};

export default SettingsPreview;
