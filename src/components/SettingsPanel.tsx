import React, { useState,useEffect } from "react";
import CustomizationSidebar, { CustomizationState } from "./CustomizationSidebar";
import SettingsPreview from "./SettingsPreview";
import QuestionMark from "./QuestionMark";
import ScreenThird from "./ScreenThird";
import openguideArrow from '../assets/openguideArrow.svg'
// Custom Toggle (single switch)
const Toggle = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
  <button
    type="button"
    className={`custom-toggle${checked ? ' active' : ''}`}
    onClick={onChange}
    aria-pressed={checked}
    tabIndex={0}
  >
    <span className="custom-toggle-slider" />
  </button>
);

const Tab = ({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) => (
  <button className={`settings-tab${active ? ' active' : ''}`} onClick={onClick}>
    {children}
  </button>
);

const SettingsSidebar = ({
  toggles,
  setToggle,
  selectCompliance,
  compliance,
}: any) => (
  <div className="settings-sidebar">
    <div className="settings-row">
      Expires <QuestionMark hoverText="Expires setting determines how long the user's consent choice is stored in their browser before they are asked again to provide their consent." />
      {/* <select className="settings-input">
        <option>120s</option>
      </select> */}
      <input type="number" className="settings-input" defaultValue={120} />
    </div>
    <div className="settings-row">
      Animation <QuestionMark hoverText="Shows different types of animations to apply to the banner." />
      <select className="settings-input">
        <option>Fade</option>
      </select>
    </div>
    <div className="settings-row">
      Easing <QuestionMark hoverText="Controls the smoothness  of the animation." />
      <select className="settings-input">
        <option>Ease</option>
      </select>
    </div>
    <div className="settings-row">
      Language <QuestionMark hoverText="Indicates the language preference for the cookie 
banner." />
      <select className="settings-input">
        <option>English</option>
      </select>
    </div>
    <div className="settings-row">
      Reset Interactions <QuestionMark isLeft hoverText="Enable this option to restart Webflow interactions after the Cookie Consent component has been rendered, particularly if your component relies on Webflow interactions." />
      <Toggle checked={toggles[0]} onChange={() => setToggle(0)} />
    </div>
    <div className="settings-row settings-compliance">
     <div className="align-icon"> Compliance <QuestionMark hoverText="Specifies the type of cookie compliance standard, like GDPR or CCPA." /></div>
      <div className="settings-compliance-options">
        <label className="settings-radio">
          <input
            type="radio"
            checked={compliance === 'us'}
            onChange={() => selectCompliance('us')}
            name="compliance"
          />
          US State Laws
        </label>
        <label className="settings-radio">
          <input
            type="radio"
            checked={compliance === 'gdpr'}
            onChange={() => selectCompliance('gdpr')}
            name="compliance"
          />
          GDPR
        </label>
      </div>
    </div>
    <div className="settings-row">
      <button className="settings-export-btn">Export CSV</button> <QuestionMark isLeft hoverText="Download consents in CSV format for easy analysis and sharing." />
    </div>
    <div className="settings-row">
      Show Close Button <QuestionMark isLeft hoverText="Sets the duration (in seconds) for which the cookie consent remains valid. After this period, the user will be prompted again for consent." />
      <Toggle checked={toggles[1]} onChange={() => setToggle(1)} />
    </div>
    <div className="settings-row">
      Show Cookie Icon <QuestionMark isLeft hoverText="Sets the duration (in seconds) for which the cookie consent remains valid. After this period, the user will be prompted again for consent." />
      <Toggle checked={toggles[2]} onChange={() => setToggle(2)} />
    </div>
    <div className="settings-row">
      Auto Load Cookies <QuestionMark isLeft hoverText="Sets the duration (in seconds) for which the cookie consent remains valid. After this period, the user will be prompted again for consent." />
      <Toggle checked={toggles[3]} onChange={() => setToggle(3)} />
    </div>
    <div className="settings-row">
      Disable scroll <QuestionMark isLeft hoverText="Sets the duration (in seconds) for which the cookie consent remains valid. After this period, the user will be prompted again for consent." />
      <Toggle checked={toggles[4]} onChange={() => setToggle(4)} />
    </div>
    <div className="settings-row">
      Do not share link <QuestionMark isTop isLeft hoverText="Sets the duration (in seconds) for which the cookie consent remains valid. After this period, the user will be prompted again for consent." />
      <button className="settings-input">
      open guide <img src={openguideArrow} alt="" />
      </button>
    </div>
  </div>
);






const SettingsPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [toggles, setToggles] = useState([false, false, false, false, false]);
  const [compliance, setCompliance] = useState<"us" | "gdpr">("us");
const [customization, setCustomizationRaw] = useState<CustomizationState>({
  bannerAlignment: "left",
  bannerStyle: "style1",
  font: "Inter",
  weight: "Regular",
  size: 15,
  textAlignment: "left",
  colors: {
    bannerBg: "#FFFFFF",
    bannerBg2: "#0c0c5f",
    title: "#000000",
    body: "#000000",
    btnPrimaryBg: "#000000",
    btnPrimaryText: "#fff",
    btnSecondaryBg: "#e8e8ea",
    btnSecondaryText: "#000000",
  },
  radius: { container: 12, button: 7 }
});

const setCustomization = (next: Partial<CustomizationState>) =>
  setCustomizationRaw(prev => ({ ...prev, ...next }));
 const setToggle = (idx: number) => {
  setToggles(toggles =>
    toggles.map((val, i) => (i === idx ? !val : val))   // <-- always flips
  );
};

  // Log all data whenever state changes
  useEffect(() => {
    console.log("Settings Data:", {
      activeTab,
      toggles,
      compliance,
    });
  }, [activeTab, toggles, compliance]);

  return (
    <div className="settings-root">
      {/* Tabs */}
      <div className="settings-tabs-row">
        {["Settings", "Customization", "Script"].map((tab, i) => (
          <Tab key={tab} active={activeTab === i} onClick={() => setActiveTab(i)}>
            {tab}
          </Tab>
        ))}
        <div className="settings-subscribe-note">
          You need a subscription to publish the production
        </div>
        {activeTab === 2 ? <button className="settings-publish-btn">Scan project</button>: <button className="settings-publish-btn">Create Component</button>}
      </div>

      {/* Main content */}
     {activeTab === 0 && <div className="settings-content">
        <SettingsSidebar
          toggles={toggles}
          setToggle={setToggle}
          compliance={compliance}
          selectCompliance={setCompliance}
        />
        <SettingsPreview customization={customization}/>
      </div>}
      {activeTab === 1 && (
      <div className="settings-content">
        <CustomizationSidebar
          customization={customization}
          setCustomization={setCustomization}
        />
        <SettingsPreview customization={customization} />
      </div>
    )}


    {activeTab === 2 && (
      <div className="main">
        <ScreenThird />
      </div>
    )}
    </div>
  );
};


export default SettingsPanel;
