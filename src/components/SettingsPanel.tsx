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
import { framer } from "framer-plugin";
import tick from "../assets/tick-square.png"
import tick2 from "../assets/tick-square2.png"
import Categories from "./Categories";

// --- Settings Types ---
type ComplianceType = "us" | "gdpr";
const allCategories = [
  { name: "Essentials", alwaysActive: true },
  { name: "Marketing" },
  { name: "Preferences" },
  { name: "Analytics" }
];

export type Category = {
  name: string;
  alwaysActive?: boolean;
};

export type CategoryCheckedState = {
  name: string;
  checked: boolean;
};
type Language = "English" | "Spanish" | "French" | "German" | "Swedish" | "Dutch" | "Portuguese" | "Italian";
interface SettingsState {
  expires: number;
  animation: string;
  easing: string;
  language: Language;
  resetInteractions: boolean;
  showCloseButton: boolean;
  showCookieIcon: boolean;
  autoLoadCookies: boolean;
  disableScroll: boolean;
  customtoggle: boolean;
  privacyUrl: string;
}

async function saveBannerSettings(siteId: string, bannerData: any) {
  try {
    const res = await fetch("https://framer-consentbit.web-8fb.workers.dev/banner/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        siteId,
        bannerData: bannerData,
      }),
    });

    if (!res.ok) throw new Error("Failed to save settings");

    const data = await res.json();
    console.log("✅ Saved:", data);
    return data;
  } catch (err) {
    console.error("Error saving settings:", err);
  }
}

// --- Custom Checkbox ---
const CustomCheckbox: React.FC<{
  checked: boolean;
  onCheck: () => void;
  label: React.ReactNode;
  tick: string;
  tick2: string;
}> = ({ checked, onCheck, label, tick, tick2 }) => (
  <label className="modal-checkbox-label">
    {checked ? (
      <img src={tick} alt="Checked" className="modal-checkbox-icon" />
    ) : (
      <img src={tick2} alt="Unchecked" className="modal-checkbox-icon" />
    )}
    <input
      type="checkbox"
      className="modal-checkbox"
      checked={checked}
      onChange={onCheck}
      style={{ display: "none" }}
    />
    {label}
  </label>
);

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
  compliance: ComplianceType[];
  setCompliance: React.Dispatch<React.SetStateAction<ComplianceType[]>>;
  exportCSVClicked: boolean;
  setExportCSVClicked: React.Dispatch<React.SetStateAction<boolean>>;
  openGuide: boolean;
  setOpenGuide: React.Dispatch<React.SetStateAction<boolean>>;
  checkedCategories: CategoryCheckedState[];
  handleCheck:   (name: string) => void
  siteId: string;
}

const SettingsSidebar: React.FC<SettingsSidebarProps> = ({
  settings,
  setSettings,
  compliance,
  setCompliance,
  exportCSVClicked,
  setExportCSVClicked,
  openGuide,
  setOpenGuide,
  checkedCategories,
  handleCheck,
  siteId
}) => {







  
 const handleToggle = (key: keyof SettingsState) => {
  setSettings((prev) => {
    const newValue = !prev[key];

    // Toggle the value immediately
    const updatedSettings = { ...prev, [key]: newValue };

    // If toggled on for resetInteractions, set defaults
    if (key === "resetInteractions" && newValue) {
      updatedSettings.animation = "fade";
      updatedSettings.easing = "ease";
      updatedSettings.language = "English";
    }

    // If toggled on, schedule toggle off after 1 second
    if (key === "resetInteractions" && newValue) {
      setTimeout(() => {
        setSettings((prevTimeout) => ({ ...prevTimeout, resetInteractions: false }));
      }, 1000);
    }

    return updatedSettings;
  });
};


  const handleInputChange = (key: keyof SettingsState, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleComplianceChange = (type: ComplianceType) => {
    setCompliance((prev) =>
      prev.includes(type)
        ? prev.filter((c) => c !== type)
        : [...prev, type]
    );
  };

  return (
    <div className="settings-sidebar">
      {exportCSVClicked && (
        <ExportDataModal siteId={siteId} onClose={() => setExportCSVClicked(false)} />
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
          <option value="fade">Fade</option>
          <option value="slide-up">Slide Up</option>
          <option value="slide-down">Slide Down</option>
          <option value="slide-left">Slide Left</option>
          <option value="slide-right">Slide Right</option>
        </select>
      </div>
      <div className="settings-row">
        Easing <QuestionMark hoverText="Controls the smoothness of the animation." />
        <select
          className="settings-input"
          value={settings.easing}
          onChange={(e) => handleInputChange("easing", e.target.value)}
        >
          <option value="ease">Ease</option>
          <option value="linear">Linear</option>
          <option value="ease-in">Ease-in</option>
          <option value="ease-out">Ease-out</option>
          <option value="ease-in-out">Ease-in-out</option>
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
          <option>Spanish</option>
          <option>French</option>
          <option>German</option>
          <option>Swedish</option>
          <option>Dutch</option>
          <option>Portuguese</option>
          <option>Italian</option>
        </select>
      </div>
<div className="settings-row ">
        Privacy URL <QuestionMark isLeft hoverText="Link to your privacy policy page." />
<input type="text" className="settings-input" value={settings.privacyUrl} onChange={(e) => handleInputChange("privacyUrl", e.target.value)} />
      </div>

     
      <div className="settings-row settings-compliance">
        <div className="align-icon custom-category-title">
          Compliance <QuestionMark hoverText="Specifies the type of cookie compliance standard, like GDPR or CCPA." />
        </div>
        <div className="settings-compliance-options">
          <CustomCheckbox
            checked={compliance.includes("us")}
            onCheck={() => handleComplianceChange("us")}
            label="US State Laws"
            tick={tick}
            tick2={tick2}
          />
          <CustomCheckbox
            checked={compliance.includes("gdpr")}
            onCheck={() => handleComplianceChange("gdpr")}
            label="GDPR"
            tick={tick}
            tick2={tick2}
          />
        </div>
      </div>
     {compliance.includes("gdpr") && <div className="settings-row">
         <Categories
      categories={allCategories}
      checkedCategories={checkedCategories}
      onCheck={handleCheck}
    />

        </div>}
      <div className="settings-row custom-category-title">
        <button className="settings-export-btn" onClick={() => setExportCSVClicked(true)}>
          Export CSV
        </button>{" "}
        <QuestionMark isLeft hoverText="Download consents in CSV format for easy analysis and sharing." />
      </div>
       <div className="settings-row custom-category-title">
        Reset Interactions <QuestionMark isLeft hoverText="Enable this option to restart Webflow interactions after the Cookie Consent component has been rendered, particularly if your component relies on Webflow interactions." />
        <Toggle checked={settings.resetInteractions} onChange={() => handleToggle("resetInteractions")} />
      </div>
      <div className="settings-row custom-category-title">
        Custom Toggle Button<QuestionMark isLeft hoverText="Enables a toggle switch. Off = standard checkbox." />
        <Toggle checked={settings.customtoggle} onChange={() => handleToggle("customtoggle")} />
      </div>
      <div className="settings-row custom-category-title">
        Show Close Button <QuestionMark isLeft hoverText="Show/hide the consent close button." />
        <Toggle checked={settings.showCloseButton} onChange={() => handleToggle("showCloseButton")} />
      </div>
      {/* <div className="settings-row custom-category-title">
        Show Cookie Icon <QuestionMark isLeft hoverText="Show/hide the cookie icon on the banner." />
        <Toggle checked={settings.showCookieIcon} onChange={() => handleToggle("showCookieIcon")} />
      </div>
      <div className="settings-row custom-category-title">
        Auto Load Cookies <QuestionMark isLeft hoverText="Automatically load cookies when consent is given." />
        <Toggle checked={settings.autoLoadCookies} onChange={() => handleToggle("autoLoadCookies")} />
      </div> */}
      <div className="settings-row custom-category-title">
        Disable scroll <QuestionMark isLeft hoverText="Prevent scrolling until user gives consent." />
        <Toggle checked={settings.disableScroll} onChange={() => handleToggle("disableScroll")} />
      </div>
      {compliance.includes("gdpr") && <div className="settings-row custom-category-title">
        Do not share link <QuestionMark  isLeft hoverText="Prevents sharing the link." />
        <button className="settings-input" onClick={() => setOpenGuide(true)}>
          open guide <img src={openguideArrow} alt="" />
        </button>
      </div>}
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
  cookieBannerHtml: string;
  setCookieBannerHtml: React.Dispatch<React.SetStateAction<string>>;
  setInjected: React.Dispatch<React.SetStateAction<boolean>>;
  injected: boolean;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  scripts,
  siteId,
  setScripts,
  cookieBannerHtml,
  setCookieBannerHtml,
  setInjected,
  injected
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
    customtoggle: false,
    privacyUrl: "",
  });

  // COMPLIANCE is now an array, default both selected
  const [compliance, setCompliance] = useState<ComplianceType[]>(["us", "gdpr"]);
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


 const [checkedCategories, setCheckedCategories] = useState<CategoryCheckedState[]>(
    allCategories.map((cat) => ({
      name: cat.name,
      checked: true
    }))
  );

  // Handler for toggling checked state, called from child
  const handleCheck = (name: string) => {
    setCheckedCategories((prev) =>
      prev.map((cat) =>
        cat.name === name ? { ...cat, checked: !cat.checked } : cat
      )
    );
  };

  console.log("Customization State:", settings, customization);
  const setCustomization = (next: Partial<CustomizationState>) =>
    setCustomizationRaw((prev) => ({ ...prev, ...next }));

  useEffect(() => {
    console.log("Settings Data:", {
      activeTab,
      settings,
      compliance,
      customization,
      checkedCategories,
    });
  }, [activeTab, settings, compliance, customization, checkedCategories]);

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
            onClick={() => {
              setCreateComponent(true)
            }}
            className="settings-publish-btn"
          >
            Create Component
          </button>
        )}
      </div>
      {createComponent && (
        <InstallBannerPopup
          open={createComponent}
          onConfirm={async () => {
            if (framer) {

              const html = cookieBannerHtml;
       
              framer.setCustomCode({ html, location: "bodyEnd" });
              console.log("Plugin UI: div saved to project body section");
              
              // alert("Div has been added to your project. Please republish the site to apply it!");
            } else {
              console.warn("framer.setCustomCode is not available.");
            }
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
            setCompliance={setCompliance}
            exportCSVClicked={exportCSVClicked}
            setExportCSVClicked={setExportCSVClicked}
            openGuide={openGuide}
            setOpenGuide={setOpenGuide}
            checkedCategories={checkedCategories}
            handleCheck={handleCheck}
           siteId={siteId}
          />
          <SettingsPreview siteId={siteId} checkedCategories={checkedCategories} settings={settings} customization={customization} cookieBannerHtml={cookieBannerHtml} setCookieBannerHtml={setCookieBannerHtml} />
        </div>
      )}
      {activeTab === 1 && (
        <div className="settings-content">
          <CustomizationSidebar
            customization={customization}
            setCustomization={setCustomization}
          />
          <SettingsPreview siteId={siteId} checkedCategories={checkedCategories} settings={settings} customization={customization} cookieBannerHtml={cookieBannerHtml} setCookieBannerHtml={setCookieBannerHtml} />
        </div>
      )}
      {activeTab === 2 && (
        <div className="script-wrapper">
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
