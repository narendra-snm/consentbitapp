import { framer, CanvasNode } from "framer-plugin";
import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import SettingsPanel from "./components/SettingsPanel";
// import LoadingScreen from "./components/LoadingScreen";
import "./App.css";

// --- Optional screens/modals ---
import MainContent from "./components/ScreenOne";
import ScreenTwo from "./components/ScreenTwo";
import ScreenThird from "./components/ScreenThird";
import Screen5 from "./components/Screen5";
import ConfirmModal from "./components/ConfirmModal";
import SuccessModal from "./components/SuccessModal";
// import InstallBannerPopup from "./components/InstallBannerPopup";
// import ChoosePlan from "./components/ChoosePlan";
// import AdvancedCSVExportModal from "./components/ExportDataModal";
// import OpenGuide from "./components/OpenGuide";
import PulseAnimation from "./components/PulseAnimation";
// import InjectBodyDiv from "./components/InjectBodyDiv";
// import Categories from "./components/Categories";
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
framer.showUI({
  width: 800,
  height: 591,
  position: "top right",
});

type User = {
  id: string;
  displayName: string;
  email?: string;
  isPublihsed?: boolean;
};
type ScriptData = {
  script: string;
  isChanged: boolean;
  isDismiss: boolean;
  isSaved?: boolean;
  isEditing?: boolean;
   category: string[];
};



// function useSelection() {
//   const [selection, setSelection] = useState<CanvasNode[]>([]);
//   useEffect(() => {
//     return framer.subscribeToSelection(setSelection);
//   }, []);
//   return selection;
// }
const projectInfo = await framer.getProjectInfo();

const siteId = projectInfo.id; 
const publishInfo = await framer.getPublishInfo();
console.log(publishInfo);
const siteUrl = publishInfo?.production?.url || "Not Published";

async function fetchScript(){
const publishInfo = await framer.getPublishInfo();
console.log(publishInfo);
const siteUrl = publishInfo?.production?.url || "Not Published";
const result = await fetch(`https://framer-consentbit.web-8fb.workers.dev/api/fetch-scripts?url=${encodeURIComponent(siteUrl)}`);
const data = await result.json();
console.log("Fetched Script Data:", data);
// return data.scripts.map((item:any, index: number) => ({
//   script: item[index],
//   isChanged: false,
//   isSaved: false,
//   isEditing: true,
//   isDismiss: false,
//   category: [],
// })); 

// const update=data.scripts.map((item:any, index: number) => ({
//   ...item,
//   category: [],
// }));
// console.log("Updated Script Data with category:", { ...data, scripts: update});
// return { ...data, scripts: update};
return data;

}


export function App() {



 const [injected, setInjected] = React.useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
   const [check , setCheck] = useState(false);
const [scripts, setScripts] = useState<ScriptData[]>([])
const [screen, setScreen] = useState(1);
const [cookieBannerHtml, setCookieBannerHtml] = useState(`
  <style>
.consentbit-ccpa-banner-div,.consentbit-ccpa_preference,.consentbit-gdpr_banner_div,.consentbit-preference_div{padding:20px;box-shadow:2px 2px 20px #00000082}to{transform:translateY(0);transform:translateX(0);top:50%;left:50%;transform:translate(-50%,-50%);transform:translateY(0) scale(1);opacity:1;transform:translate(-50%,-50%) translateY(0) scale(1)}20%,80%{opacity:1;transform:translateY(0) scale(1)}100%{opacity:0;transform:translateY(-10px) scale(.8)}.consentbit-ccpa-banner-div[data-animation=slide-up],.consentbit-ccpa_banner_div[data-animation=slide-up],.consentbit-gdpr-banner-div[data-animation=slide-up],.consentbit-gdpr_banner_div[data-animation=slide-up]{animation:.6s ease-out forwards slideUpBottom}.consentbit-banner-div[data-animation=slide-down],.consentbit-ccpa-banner-div[data-animation=slide-down],.consentbit-ccpa_banner_div[data-animation=slide-down],.consentbit-gdpr-banner-div[data-animation=slide-down],.consentbit-gdpr_banner_div[data-animation=slide-down]{animation:.6s ease-out forwards slideDownBottom}.consentbit-banner-div[data-animation=slide-left],.consentbit-ccpa-banner-div[data-animation=slide-left],.consentbit-ccpa_banner_div[data-animation=slide-left],.consentbit-gdpr-banner-div[data-animation=slide-left],.consentbit-gdpr_banner_div[data-animation=slide-left]{animation:.6s ease-out forwards slideLeftBottom}.consentbit-banner-div[data-animation=slide-right],.consentbit-ccpa-banner-div[data-animation=slide-right],.consentbit-ccpa_banner_div[data-animation=slide-right],.consentbit-gdpr-banner-div[data-animation=slide-right],.consentbit-gdpr_banner_div[data-animation=slide-right]{animation:.6s ease-out forwards slideRightBottom}.consentbit-banner-div[data-animation=fade],.consentbit-ccpa-banner-div[data-animation=fade],.consentbit-ccpa_banner_div[data-animation=fade],.consentbit-gdpr-banner-div[data-animation=fade],.consentbit-gdpr_banner_div[data-animation=fade]{opacity:0;will-change:opacity,transform;animation:.5s ease-out forwards fadeIn}.consentbit-banner-div[data-animation=fade-in-out],.consentbit-ccpa-banner-div[data-animation=fade-in-out],.consentbit-ccpa_banner_div[data-animation=fade-in-out],.consentbit-gdpr-banner-div[data-animation=fade-in-out],.consentbit-gdpr_banner_div[data-animation=fade-in-out]{opacity:0;will-change:opacity,transform;animation:1.2s ease-in-out forwards fadeInOut}.consentbit-ccpa-preference-div[data-animation=slide-up],.consentbit-ccpa_preference[data-animation=slide-up],.consentbit-preference-div[data-animation=slide-up],.consentbit-preference_div[data-animation=slide-up]{animation:.6s ease-out forwards slideUpCenter}.consentbit-ccpa-preference-div[data-animation=slide-down],.consentbit-ccpa_preference[data-animation=slide-down],.consentbit-preference-div[data-animation=slide-down],.consentbit-preference_div[data-animation=slide-down]{animation:.6s ease-out forwards slideDownCenter}.consentbit-ccpa-preference-div[data-animation=slide-left],.consentbit-ccpa_preference[data-animation=slide-left],.consentbit-preference-div[data-animation=slide-left],.consentbit-preference_div[data-animation=slide-left]{animation:.6s ease-out forwards slideLeftCenter}.consentbit-ccpa-preference-div[data-animation=slide-right],.consentbit-ccpa_preference[data-animation=slide-right],.consentbit-preference-div[data-animation=slide-right],.consentbit-preference_div[data-animation=slide-right]{animation:.6s ease-out forwards slideRightCenter}.consentbit-ccpa-preference-div[data-animation=fade],.consentbit-ccpa_preference[data-animation=fade],.consentbit-preference-div[data-animation=fade],.consentbit-preference_div[data-animation=fade]{opacity:0;will-change:opacity,transform;animation:.5s ease-out forwards fadeCenterIn}.consentbit-gdpr_banner_div{z-index:99999;transform-style:preserve-3d;background-color:#fff;border-radius:12px;flex-direction:column;justify-content:center;align-items:center;width:459px;font-family:Inter;display:none;position:fixed;bottom:6%;right:3%;transform:translate3d(0,0,0);left:23px;transform:none}.consentbit-ccpa-banner-text,.consentbit-gdpr_banner_text{color:#4c4a66;font-size:16px;line-height:1.5;font-weight:Regular;text-align:left;width:100%;margin:0 0 10px;display:block}.consebit-ccpa-prefrence-container,.consentbit-banner_button_container,.consentbit-prefrence-container{justify-content:right;width:100%;margin-top:10px;display:flex}.consentbit-banner_accept,.consentbit-banner_button_decline,.consentbit-banner_button_preference{text-align:center;border-radius:3px;justify-content:center;min-width:80px;margin-left:5px;margin-right:5px;cursor:pointer;font-family:Montserrat,sans-serif;display:flex}.consentbit-banner_button_decline,.consentbit-banner_button_preference{color:#000;background-color:#c9c9c9}.consentbit-banner_accept{color:#fff;background-color:#000}.consentbit-banner_headings,.consentbit-ccpa-banner-heading{color:#000;font-size:20px;font-weight:Regular;text-align:left;width:100%;margin-top:0;margin-bottom:10px}.consentbit-ccpa-innerdiv,.consentbit-innerdiv{max-width:877px;margin-left:auto;margin-right:auto}.consentbit-banner_second-bg{z-index:-3;opacity:.3;background-color:#0c0c5f;border-top-right-radius:12px;border-bottom-right-radius:12px;width:35%;height:100%;position:absolute;bottom:0;right:0}.close-consent,.close-consentbit{z-index:99;color:#000;cursor:pointer;justify-content:center;align-items:center;width:25px;height:25px;font-family:Montserrat,sans-serif;display:flex;position:absolute;top:5%;left:auto;right:2%}.consentbit-preference_div{z-index:99999;background-color:#fff;border-radius:12px;flex-direction:column;justify-content:flex-start;align-items:center;max-width:435px;max-height:510px;font-family:Inter;position:relative;top:50%;left:50%;overflow-y:scroll;transform:translate(-50%,-50%)}.consentbit-ccpa_prefrence_text,.consentbit-prefrence_text{color:#000;text-align:left;width:100%;max-width:400px;margin:0 0 10px;font-size:14px;font-weight:400;line-height:1.5;display:block}.consentbit-ccpa-linkblock,.consentbit-checkbox-label{min-width:80px;margin-left:5px;margin-right:5px;cursor:pointer}.consentbit-ccpa-formblock,.consentbit-formblock{background-color:#fff;border-radius:8px;flex-direction:column;width:100%;max-width:400px;display:flex}.consentbit-ccpa-prefrence-block,.consentbit-prefrence_block{flex-direction:column;width:100%;margin-top:10px;display:flex}.consentbit-prefrence_toggle{color:#10d68a00;justify-content:space-between;width:100%;margin-top:10px;display:flex}.consebit-prefrence-accept,.consentbit-checkbox-label,.consentbit-prefrence-decline{justify-content:center;display:flex}.consentbit-button-preference{color:#483999;font-size:18px;font-weight:500}.consebit-ccpa-prefrence-container a,.consentbit-prefrence-container a{text-decoration:none;cursor:pointer}.consentbit-checkbox-label{color:#000;text-align:center;background-color:#c9c9c9;border-radius:3px}.consebit-ccpa-prefrence-heading,.consebit-prefrence-heading{color:#000;text-align:left;width:100%;margin-top:0;margin-bottom:10px;font-size:20px;font-weight:500}.consentbit-toggle{cursor:pointer;-webkit-appearance:none;appearance:none;background-color:transparent;border-radius:4px;width:20px;height:20px;display:inline-block;position:relative}.consentbit-change-preference{z-index:999;cursor:pointer;background-image:url("https://cdn.prod.website-files.com/63d5330e6841081487be0bd6/67ebf5ee639d12979361f2bc_consent.png");background-position:50%;background-size:cover;border-radius:50%;width:55px;height:55px;position:fixed;bottom:3%;left:2%}.consentbit-close{z-index:99;color:#000;cursor:pointer;justify-content:center;align-items:center;width:25px;height:25px;font-family:Montserrat,sans-serif;display:flex;position:absolute;top:5%;left:auto;right:10px}.consentbit-preference{z-index:99999;display:none;position:fixed;inset:0%}.consentbit-ccpa-banner-div{z-index:99999;transform-style:preserve-3d;background-color:#fff;border-radius:12px;flex-direction:column;justify-content:center;align-items:center;width:459px;min-height:220px;font-family:Inter;display:none;position:fixed;bottom:3%;left:auto;right:3%;transform:translate3d(0,0,0)}.consentbit-ccpa-button-container{justify-content:left;width:100%;margin-top:10px;display:flex}.consentbit-ccpa-linkblock{color:#483999;border-radius:48px}.consentbit-banner-ccpasecond-bg{z-index:-3;opacity:.3;background-color:#798eff;border-top-right-radius:4px;border-bottom-right-radius:4px;width:35%;height:100%;position:absolute;bottom:0;right:0}.consentbit-ccpa_preference{z-index:99999;border-radius:12px;background-color:#fff;color:#000;flex-direction:column;justify-content:flex-start;align-items:center;font-family:Montserrat,sans-serif;display:none;position:fixed;top:50%;left:50%;overflow-y:scroll;transform:translate(-50%,-50%)}.consentbit-ccpa-prefrence-toggle{direction:rtl;color:#483999;flex-flow:row;justify-content:space-between;width:100%;margin-top:10px;display:flex}.cookie-btn-row button{cursor:pointer}.consentbit-ccpa-button-preference,.consentbit-prefrence-decline{color:#000;text-align:center;cursor:pointer;background-color:#c9c9c9;border-radius:3px;justify-content:center;min-width:80px;margin-left:5px;margin-right:5px;display:flex;padding:9px 15px}.consebit-ccpa-prefrence-accept,.consebit-ccpa-prefrence-decline,.consebit-prefrence-accept{text-align:center;border-radius:7px;min-width:80px;margin-left:5px;margin-right:5px;padding:9px 15px}.consebit-ccpa-prefrence-accept{color:#fff;cursor:pointer;background-color:#000;justify-content:center;display:flex}.consebit-ccpa-prefrence-decline,.consent-close{color:#000;justify-content:center;cursor:pointer}.consebit-ccpa-prefrence-decline{background-color:#e8e8ea;display:flex}[customtoggle=true]{position:relative;display:inline-block;width:49px;height:24px}.consent-close{z-index:99;align-items:center;width:25px;height:25px;font-family:Montserrat,sans-serif;display:flex;position:absolute;top:10px;left:auto;right:0}.div-block{display:none}.consebit-prefrence-accept{color:#fff;cursor:pointer;background-color:#000;justify-content:center;display:flex}@media screen and (max-width:991px){.consentbit-ccpa_preference,.consentbit-preference_div{width:100%;max-width:23.5rem}}@media screen and (max-width:767px){.consentbit-ccpa-banner-div,.consentbit-gdpr_banner_div{width:100%;max-width:100%;inset:auto 0 0;transform:none}.consentbit-banner_button_container{text-align:center;flex-direction:column;justify-content:center;row-gap:12px;margin-bottom:10px;display:flex}}
  </style>
  <div id="toggle-consent-btn" scroll-control="true" class="consentbit-change-preference"></div>
  <div id="consent-banner" class="cookie-preview consentbit-gdpr-banner-div consentbit-gdpr_banner_div hidden" data-animation="fade" style="display: none !important; position: fixed; z-index: 9999999; left: 23px; transform: none; visibility: hidden !important; opacity: 0 !important;">
 
  <div class="cookie-preview-popup consentbit-innerdiv" style="
		text-align:left;

		width: 100%;
		font-family:Inter;
		font-weight:400;
		font-size:15px;
		border-radius:12px;
		
		color:#000000; 
		
		
	  ">
    
    <div class="cookie-title" style="color:#000000;font-weight:600;margin-bottom:16px;">
      Cookie Settings
    </div>
    <div class="cookie-desc">
      We use cookies to provide you with the best possible experience. They also allow us to analyze user behavior in order to constantly improve the website for you.  
    </div>
    <div class="cookie-btn-row" style="margin-top:16px; display:flex;gap:8px;justify-content:flex-end;">
      <button id="preferences-btn" class="cookie-pref-btn" style="font-size:15px;padding:7px 14px;border:none;color:#000000;background-color:#e8e8ea;border-radius:7px;">
        Preference
      </button>
      <button id="decline-btn" class="cookie-reject-btn" style="font-size:15px;padding:7px 14px;border:none;color:#000000;background-color:#e8e8ea;border-radius:7px;">
         Reject
      </button>
      <button id="accept-btn" class="cookie-accept-btn" style="font-size:15px;padding:7px 14px;border:none;color:#fff;background-color:#000000;border-radius:7px;">
         Accept
      </button>
    </div>
  </div>
</div>

<div id="main-banner" class="consentbit-preference show-banner" style="display: block !important; visibility: visible !important; opacity: 1 !important;">
  <div data-animation="Fade" class="consentbit-preference_div">
    <h4 class="consebit-prefrence-heading">Cookie Preferences</h4>
    <p class="consentbit-prefrence_text">
     By clicking, you agree to store cookies on your device to enhance navigation, analyze usage, and support marketing  
    </p>
    <div id="consentbit-preference_div" class="consentbit-prefrence_block">
      <div class="consentbit-prefrence_block">
        <div class="w-form">
          <form id="email-form" name="email-form" data-name="Email Form" method="get" data-wf-page-id="68adcbabbd0941faf8b0f6e3" data-wf-element-id="662bb4bb-38c2-4633-ba3c-94853af51a03" data-turnstile-sitekey="0x4AAAAAAAQTptj2So4dx43e" aria-label="Email Form">

         
            <div>
              <div class="consentbit-prefrence_toggle">
                <p class="consentbit-button-preference">Essential</p>
                <label id="necessary-checkbox" class="w-checkbox consentbit-toggle"><input type="checkbox" id="checkbox" name="checkbox" data-name="Checkbox" data-consent-id="necessary-checkbox" class="w-checkbox-input" disabled=""><span class="w-form-label" for="checkbox"></span></label>
              </div>
              <p class="consentbit-prefrence_text">
               Essential cookies enable core site functions like security and accessibility. They don't store personal data and cant be disabled.
              </p>
            </div>
            <div>
              <div class="consentbit-prefrence_toggle">
                <p class="consentbit-button-preference">Analytics</p>
                <label id="analytics-checkbox" class="w-checkbox consentbit-toggle"><input type="checkbox" id="checkbox-2" name="checkbox-2" data-name="Checkbox 2" data-consent-id="analytics-checkbox" class="w-checkbox-input"><span class="w-form-label" for="checkbox-2"></span></label>
              </div>
              <p class="consentbit-prefrence_text">
                These cookies collect anonymous data to help us improve website functionality and enhance user experience.
              </p>
            </div>
           <div>
              <div class="consentbit-prefrence_toggle">
                <p class="consentbit-button-preference">Marketing</p>
                <label id="marketing-checkbox" class="w-checkbox consentbit-toggle"><input type="checkbox" id="checkbox-3" name="checkbox-3" data-name="Checkbox 3" data-consent-id="marketing-checkbox" class="w-checkbox-input"><span class="w-form-label" for="checkbox-3"></span></label>
              </div>
              <p class="consentbit-prefrence_text">
                These cookies track users across websites to deliver relevant ads and may process personal data, requiring explicit consent.
              </p>
            </div>
            <div>
              <div class="consentbit-prefrence_toggle">
                <p class="consentbit-button-preference">Preferences</p>
                <label id="personalization-checkbox" class="w-checkbox consentbit-toggle"><input type="checkbox" id="checkbox-5" name="checkbox-5" data-name="Checkbox 5" data-consent-id="personalization-checkbox" class="w-checkbox-input"><span class="w-form-label" for="checkbox-5"></span></label>
              </div>
              <p class="consentbit-prefrence_text">
               These cookies remember settings like language or region and store display preferences to offer a more personalized, seamless experience.
              </p>
            </div>
            <div>
              <div>
                <input type="hidden" name="cf-turnstile-response" id="cf-chl-widget-qnkn0_response" value="0.a14CwqWmLpN69rTD813XVPvK0qUIZuVZ-48ikJ9o_qxsh3jLLSz7gY9tCiTGjflto4qES2CASPAzx36SpRXMitCaAUJ0i4TKguiH8vRtcLGX8KVJ_D-F_RM0hgd3i_IuUdYVGnXZgpkm8y1rBasg3k7Fl7g8g_spqxfLoq7dt72QaBVHDJUwGzgzOdvNdzhP0a2Dfx4hR6-n_twx_BiZXMWH85xB5unXAJ8mvHX1y-ABT8x1AeXSlRUwuU5jTZwJRQA8k2RYxxJSiuq8Yg8FwoTwP54rOXEImOU0oRWbeVibwRvEYGhA-xgFv--BRqnKUtN_jipmXGJKguMahxsDnMzCqSlvnb1ockIfxu5CAl8XX9HKe5QK2fo4kWD6nAuoQnZ744RNdJ3zQg691eC5Rg7Kw09x4YCVq-USLlK9ebb4tts-JiDX1M_hk_n6Yjw8b4MECJF19OV_U2d43Fpjd6D10KsEwJJvnATXG4PRK3HLype2WmQ3VHXz45IWPDr_K5jDVYUsbRf-up8daMm93Im1l4FR2eKunPomgfBASU3DsoNQseN8K5eK7FHUUc85hnInbkTFy21LrD9BbspRKHazKKS5X_cPaSAPN2DCgmGJBuEOeINWeeAcDLtTGG_orHI19CBKoGVgS2cRa-5HNEiSVINly_PGvHG-oCQA-NHB7KPKwFlaNvxRx46A0SeC7wxSaprpT3ktZqjEUxEfqkzYh5Lhq5l301GyihkktVwUCYcVRGy_S5_wUSYyPR-qeEogqjNFUzPGeyYIWJ4wQ0yPqC5IOdgIRbrWttVmDSQaj4DuHIYTgxuPQ5kgu32LkRcGKB7jUf2G73kILCWqt-U1KpFyKo6i4vehn0NUjmr6TCtxl6V_tTjPWIGUMbBFYC2m-xOQG4FdlL6zi0h6cdE44AO_xnai6S8JMJ9wjk0yjtx1BNUzE9I9PQwamrA10YFCQSI5d91CE_hGOG0L0K1gCIRt3Od1Oohbf4hENXY2Prt_4pJKlGDXxzJkuC3p.Pmv2JAeG_BD4T9j1wnDBPw.0d34d4f3562d80d32333e61203bf9c3e4cb428c0984507551c5cbba7af2a6f49">
              </div>
            </div>
          </form>
          <div class="w-form-done" tabindex="-1" role="region" aria-label="Email Form success">
            <div>Thank you! Your submission has been received!</div>
          </div>
          <div class="w-form-fail" tabindex="-1" role="region" aria-label="Email Form failure">
            <div>Oops! Something went wrong while submitting the form.</div>
          </div>
        </div>
      </div>
    </div>
    <div class="consentbit-prefrence-container">
      <a id="save-preferences-btn" href="#" class="consebit-prefrence-accept w-button">   Save Preference</a><a id="cancel-btn" href="#" class="consentbit-prefrence-decline w-button">               Reject
</a>
    </div>
    <p consentbit="close" class="consentbit-close">X</p>
  </div>
</div>
<div id="consensite-id">${siteId}</div>
<script src="https://cdn.jsdelivr.net/gh/naren4545/script@baec9cd/script.js" ></script>


`);
  // ✅ Fetch profile using stored JWT token
  // const fetchProfile = async () => {
  //   setLoading(true);
  //   const token = localStorage.getItem("auth_token");
  //   if (!token) {
  //     setUser(null);
  //     setLoading(false);
  //     return;
  //   }

  //   try {
  //     const res = await fetch("https://consentbitapp.onrender.com/auth/me", {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     const data = await res.json();

  //     if (data.loggedIn) {
  //       console.log("✅ User is logged in:", data.user);
  //       setUser(data.user);
  //     } else {
  //       console.log("⚠️ Token invalid or expired");
  //       setUser(null);
  //       localStorage.removeItem("auth_token");
  //     }
  //   } catch (err) {
  //     console.error("❌ Profile fetch failed:", err);
  //     setUser(null);
  //     localStorage.removeItem("auth_token");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // // ✅ Trigger Google login popup
  // const triggerGoogleLogin = () => {
  //   window.open(
  //     "https://consentbitapp.onrender.com/auth/google",
  //     "_blank",
  //     "width=500,height=600"
  //   );
  // };

  // ✅ Stateless logout — just delete token
  const logout = () => {
    localStorage.removeItem("auth_token");
    setUser(null);
    setScreen(1);
  };

    const injectHeadScript = () => {
  if (injected) return alert(":warning: Script already injected this session");
  const html = `<script src="https://cdn.jsdelivr.net/gh/devika2255/scripts@1894dcb/scriptinjection.js"></script>`;
  framer.setCustomCode({ html, location: "headEnd" });
  setInjected(true);
  alert(":white_check_mark: Script added to project head. Republish site to apply.");
};
  // // ✅ Listen for JWT token via postMessage
  // useEffect(() => {
  //   fetchProfile();

  //   const listener = (event: MessageEvent) => {
  //     console.log("📩 Message received:", event.origin, event.data);

  //     // Expecting: { type: "auth-success", token: "..." }
  //     if (event.data?.type === "auth-success" && event.data.token) {
  //       const token = event.data.token;
  //       localStorage.setItem("auth_token", token);
  //       console.log("✅ Token received and saved:", token);
  //       fetchProfile(); // refresh
  //     }
  //   };

  //   window.addEventListener("message", listener);
  //   return () => window.removeEventListener("message", listener);
  // }, []);

  // --- UI States ---
  // if (loading) return <LoadingScreen />;

  // if (!user) {
  //   return (
  //     <div style={{ padding: "20px", textAlign: "center" }}>
  //       <p>Please log in to use this plugin</p>
  //       <button
  //         onClick={triggerGoogleLogin}
  //         style={{
  //           padding: "10px 20px",
  //           background: "#4285F4",
  //           color: "#fff",
  //           border: "none",
  //           borderRadius: "6px",
  //           cursor: "pointer",
  //         }}
  //       >
  //         Login with Google
  //       </button>
  //     </div>
  //   );
  // }

// const scanScripts = async () => {
//   try {
//     setLoading(true);
//     const data = await fetchScript();
//     console.log("Fetched Script Data in useEffect:", data);
//     if (data && data.scripts) {
//       setScripts(data.scripts);
//     } else {
//       console.warn("No scripts found in response:", data);
//     }
//   } catch (error) {
//     console.error("Error fetching scripts:", error);
//   } finally {
//     // always runs, whether success or error
//     setLoading(false);
//   }
// };


  
const handleCheck = () => {
    setCheck(!check);
  }
  return (
    <>
      <Header />

   {screen === 1 &&   <MainContent setscreen={setScreen} siteUrl={siteUrl} siteId={siteId} onClick={async() => {
   console.log("User state in onClick:", user);
   if(user?.isPublihsed){
try {
    
    setLoading(true);

    const data = await fetchScript();
    console.log("Fetched Script Data in useEffect:", data);

    if (data && data.scripts) {
      setScripts(data.scripts);
      
    } else {
      console.warn("No scripts found in response:", data);
    }
  } catch (error) {
    console.error("Error fetching scripts:", error);
  } finally {
    // always runs, whether success or error
    setLoading(false);
  }
   }
   user?.isPublihsed?setScreen(7) : setScreen(2)

    }} setUser={setUser} user={user} loading={loading}   setLoading={setLoading} />}
     { screen === 2 &&  <ScreenTwo onClick={async () => {
  try {
    
    setLoading(true);

    const data = await fetchScript();
    console.log("Fetched Script Data in useEffect:", data);

    if (data && data.scripts) {
      setScripts(data.scripts);
      setScreen(3);
    } else {
      console.warn("No scripts found in response:", data);
    }
  } catch (error) {
    console.error("Error fetching scripts:", error);
  } finally {
    // always runs, whether success or error
    setLoading(false);
  }
}} />}


         { loading && <PulseAnimation/> }
               {screen === 3 && <ScreenThird siteId={siteId} isPanel={true} scripts={scripts} setScripts={setScripts} onClick={() => {setScreen(4)}}/> }



 {screen === 4 && <ConfirmModal 
      checked={check}
      onCheck={handleCheck}
      onProceed={() => {setScreen(5)}}
      onGoBack={() => {setScreen(3)}}
      />  }


            {screen === 5 && <Screen5 onBack={() => {setScreen(4)}} onPublish={async () => {
                        if (framer) {
            
                          const html = cookieBannerHtml;
                   
                          framer.setCustomCode({ html, location: "bodyEnd" });
                          console.log("Plugin UI: div saved to project body section");
                          setScreen(6);
                          saveBannerSettings(siteId, {settings:{
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
  },compliance:["gdpr"],
customization:{
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
  }
})
                          // alert("Div has been added to your project. Please republish the site to apply it!");
                        } else {
                          console.warn("framer.setCustomCode is not available.");
                        }}} 
                        onNext={() => {setScreen(7)}}/> }
  {screen === 6 && <SuccessModal onCustomize={() => { setScreen(7) }} /> }
   
        {screen === 7 && <SettingsPanel 
        user={user}
        injected={injected}
        setInjected={setInjected}
        cookieBannerHtml={cookieBannerHtml}
        setCookieBannerHtml={setCookieBannerHtml}
        siteId={siteId} scripts={scripts} setScripts={setScripts} /> }
     {/* <ScreenThird />
      <Screen5 />
      <SettingsPanel />
      <InstallBannerPopup />
      <ChoosePlan />
      <AdvancedCSVExportModal />
      <OpenGuide />
      <ConfirmModal />
      <SuccessModal /> */}
      
 
     {/* {user && <div style={{ marginTop: "20px", textAlign: "center" }}>
        <p>
          ✅ Logged in as <b>{user.displayName}</b> ({user.email})
        </p>
        <button
          onClick={logout}
          style={{
            marginTop: "10px",
            padding: "8px 16px",
            background: "#F44336",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>} */}
    </>
  );
}
