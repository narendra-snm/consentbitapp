import React, { useState, useEffect } from "react";
import CustomizationSidebar, { CustomizationState } from "./CustomizationSidebar";
import SettingsPreview from "./SettingsPreview";
import QuestionMark from "./QuestionMark";
import ScreenThird from "./ScreenThird";
import openguideArrow from "../assets/openguideArrow.svg";
import ChoosePlan from "./ChoosePlan";
import ExportDataModal from "./ExportDataModal";
import InstallBannerPopup from "./InstallBannerPopup";
import OpenGuide from "./OpenGuide";

// --- Settings Types ---
type ComplianceType = "us" | "gdpr";

interface SettingsState {
  expires: number;
  animation: string;
  easing: string;
  language: string;
  resetInteractions: boolean;
  showCloseButton: boolean;
  showCookieIcon: boolean;
  autoLoadCookies: boolean;
  disableScroll: boolean;
}
async function saveBannerSettings(siteId: string, bannerData: any) {
  try {
    const res = await fetch("https://bannerdata.narendra-3c5.workers.dev/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        siteId,
        bannerData: bannerData, // 👈 wrap here
      }),
    });9

    if (!res.ok) throw new Error("Failed to save settings");

    const data = await res.json();
    console.log("✅ Saved:", data);
    return data;
  } catch (err) {
    console.error("Error saving settings:", err);
  }
}

// --- Toggle ---
const Toggle: React.FC<{
  checked: boolean;
  onChange: () => void;
}> = ({ checked, onChange }) => (
  <button
    type="button"
    className={`custom-toggle${checked ? " active" : ""}`}
    onClick={onChange}
    aria-pressed={checked}
    tabIndex={0}
  >
    <span className="custom-toggle-slider" />
  </button>
);

// --- Tab ---
const Tab: React.FC<{
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}> = ({ active, children, onClick }) => (
  <button className={`settings-tab${active ? " active" : ""}`} onClick={onClick}>
    {children}
  </button>
);

// --- Sidebar ---
interface SettingsSidebarProps {
  settings: SettingsState;
  setSettings: React.Dispatch<React.SetStateAction<SettingsState>>;
  compliance: ComplianceType;
  selectCompliance: (c: ComplianceType) => void;
  exportCSVClicked: boolean;
  setExportCSVClicked: React.Dispatch<React.SetStateAction<boolean>>;
  openGuide: boolean;
  setOpenGuide: React.Dispatch<React.SetStateAction<boolean>>;
}

const SettingsSidebar: React.FC<SettingsSidebarProps> = ({
  settings,
  setSettings,
  compliance,
  selectCompliance,
  exportCSVClicked,
  setExportCSVClicked,
  openGuide,
  setOpenGuide,
}) => {
  const handleToggle = (key: keyof SettingsState) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleInputChange = (key: keyof SettingsState, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="settings-sidebar">
      {exportCSVClicked && (
        <ExportDataModal onClose={() => setExportCSVClicked(false)} />
      )}
      {openGuide && (
        <OpenGuide onClose={() => setOpenGuide(false)} />
      )}
      <div className="settings-row">
        Expires <QuestionMark hoverText="Expires setting determines how long the user's consent choice is stored in their browser before they are asked again to provide their consent." />
        <input
          type="number"
          className="settings-input"
          value={settings.expires}
          onChange={(e) => handleInputChange("expires", Number(e.target.value))}
        />
      </div>
      <div className="settings-row">
        Animation <QuestionMark hoverText="Shows different types of animations to apply to the banner." />
        <select
          className="settings-input"
          value={settings.animation}
          onChange={(e) => handleInputChange("animation", e.target.value)}
        >
          <option>Fade</option>
        </select>
      </div>
      <div className="settings-row">
        Easing <QuestionMark hoverText="Controls the smoothness of the animation." />
        <select
          className="settings-input"
          value={settings.easing}
          onChange={(e) => handleInputChange("easing", e.target.value)}
        >
          <option>Ease</option>
        </select>
      </div>
      <div className="settings-row">
        Language <QuestionMark hoverText="Indicates the language preference for the cookie banner." />
        <select
          className="settings-input"
          value={settings.language}
          onChange={(e) => handleInputChange("language", e.target.value)}
        >
          <option>English</option>
        </select>
      </div>
      <div className="settings-row">
        Reset Interactions <QuestionMark isLeft hoverText="Enable this option to restart Webflow interactions after the Cookie Consent component has been rendered, particularly if your component relies on Webflow interactions." />
        <Toggle checked={settings.resetInteractions} onChange={() => handleToggle("resetInteractions")} />
      </div>
      <div className="settings-row settings-compliance">
        <div className="align-icon">
          Compliance <QuestionMark hoverText="Specifies the type of cookie compliance standard, like GDPR or CCPA." />
        </div>
        <div className="settings-compliance-options">
          <label className="settings-radio">
            <input
              type="radio"
              checked={compliance === "us"}
              onChange={() => selectCompliance("us")}
              name="compliance"
            />
            US State Laws
          </label>
          <label className="settings-radio">
            <input
              type="radio"
              checked={compliance === "gdpr"}
              onChange={() => selectCompliance("gdpr")}
              name="compliance"
            />
            GDPR
          </label>
        </div>
      </div>
      <div className="settings-row">
        <button className="settings-export-btn" onClick={() => setExportCSVClicked(true)}>
          Export CSV
        </button>{" "}
        <QuestionMark isLeft hoverText="Download consents in CSV format for easy analysis and sharing." />
      </div>
      <div className="settings-row">
        Show Close Button <QuestionMark isLeft hoverText="Show/hide the consent close button." />
        <Toggle checked={settings.showCloseButton} onChange={() => handleToggle("showCloseButton")} />
      </div>
      <div className="settings-row">
        Show Cookie Icon <QuestionMark isLeft hoverText="Show/hide the cookie icon on the banner." />
        <Toggle checked={settings.showCookieIcon} onChange={() => handleToggle("showCookieIcon")} />
      </div>
      <div className="settings-row">
        Auto Load Cookies <QuestionMark isLeft hoverText="Automatically load cookies when consent is given." />
        <Toggle checked={settings.autoLoadCookies} onChange={() => handleToggle("autoLoadCookies")} />
      </div>
      <div className="settings-row">
        Disable scroll <QuestionMark isLeft hoverText="Prevent scrolling until user gives consent." />
        <Toggle checked={settings.disableScroll} onChange={() => handleToggle("disableScroll")} />
      </div>
      <div className="settings-row">
        Do not share link <QuestionMark isTop isLeft hoverText="Prevents sharing the link." />
        <button className="settings-input" onClick={() => setOpenGuide(true)}>
          open guide <img src={openguideArrow} alt="" />
        </button>
      </div>
    </div>
  );
};

// --- Main Panel ---
type ScriptData = {
  script: string;
  isChanged: boolean;
  isDismiss: boolean;
  isSaved?: boolean;
  isEditing?: boolean;
  category: string[];
};

interface SettingsPanelProps {
  scripts: ScriptData[];
  siteId: string;
  setScripts: React.Dispatch<React.SetStateAction<ScriptData[]>>;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  scripts,
  siteId,
  setScripts,
}) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [choosePlan, setChoosePlan] = useState(false);
  const [createComponent, setCreateComponent] = useState(false);

  const [settings, setSettings] = useState<SettingsState>({
    expires: 120,
    animation: "Fade",
    easing: "Ease",
    language: "English",
    resetInteractions: false,
    showCloseButton: false,
    showCookieIcon: false,
    autoLoadCookies: false,
    disableScroll: false,
  });

  const [compliance, setCompliance] = useState<ComplianceType>("us");
  const [exportCSVClicked, setExportCSVClicked] = useState(false);
  const [openGuide, setOpenGuide] = useState(false);

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
    radius: { container: 12, button: 7 },
  });
console.log("Customization State:", settings, customization);
  const setCustomization = (next: Partial<CustomizationState>) =>
    setCustomizationRaw((prev) => ({ ...prev, ...next }));

  useEffect(() => {
    console.log("Settings Data:", {
      activeTab,
      settings,
      compliance,
      customization,
    });
  }, [activeTab, settings, compliance, customization]);

  return (
    <div className="settings-root">
      {/* Tabs */}
      {choosePlan && <ChoosePlan onClose={() => setChoosePlan(false)} />}
      <div className="settings-tabs-row">
        {["Settings", "Customization", "Script"].map((tab, i) => (
          <Tab key={tab} active={activeTab === i} onClick={() => setActiveTab(i)}>
            {tab}
          </Tab>
        ))}
        <div className="settings-subscribe-note">
          <button onClick={() => setChoosePlan(true)}>
            You need a subscription to publish the production
          </button>
        </div>
        {activeTab === 2 ? (
          <button className="settings-publish-btn">Scan project</button>
        ) : (
          <button
            onClick={() => setCreateComponent(true)}
            className="settings-publish-btn"
          >
            Create Component
          </button>
        )}
      </div>
      {createComponent && (
        <InstallBannerPopup
          open={createComponent}
          onConfirm={async() => {
            await saveBannerSettings(siteId, { settings: settings, compliance: compliance, customization: customization });
            setCreateComponent(false);
          }}
          onCancel={() => {
            setCreateComponent(false);
          }}
        />
      )}
      {activeTab === 0 && (
        <div className="settings-content">
          <SettingsSidebar
            settings={settings}
            setSettings={setSettings}
            compliance={compliance}
            selectCompliance={setCompliance}
            exportCSVClicked={exportCSVClicked}
            setExportCSVClicked={setExportCSVClicked}
            openGuide={openGuide}
            setOpenGuide={setOpenGuide}
          />
          <SettingsPreview customization={customization} />
        </div>
      )}
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
          <ScreenThird
            siteId={siteId}
            scripts={scripts}
            setScripts={setScripts}
            isPanel={false}
          />
        </div>
      )}
    </div>
  );
};

export default SettingsPanel;
