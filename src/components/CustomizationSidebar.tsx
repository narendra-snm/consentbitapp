import React, { useState,useRef,useEffect } from "react";
import { HexColorPicker } from "react-colorful"; // Provides drag/select palette
import centerActive from "../assets/centerA.svg";
import center from "../assets/center.svg";
import leftActive from "../assets/leftA.svg";
import rightrActive from "../assets/rightA.svg";
import left from "../assets/left.svg";
import right from "../assets/right.svg";
import style1 from "../assets/style1.svg"
import style2 from "../assets/style2.svg"
import style3 from "../assets/style3.svg"
import style4 from "../assets/style4.svg"
import style5 from "../assets/style5.svg"

import centerTextActive from "../assets/centerTextActive.svg";
import centerText from "../assets/centerText.svg";
import leftTextActive from "../assets/leftTextActive.svg";
import rightTextActive from "../assets/rightTextActive.svg";
import leftText from "../assets/leftText.svg";
import rightText from "../assets/rightText.svg";
import QuestionMark from "./QuestionMark";


const fonts = [
  "Inter",
  "Lato",
  "Oswald",
  "Merriweather",
  "Open Sans",
  "Ubuntu",
  "Droid Sans",
  "Exo",
];
const weights = ["Thin", "Light", "Regular", "Semibold", "Bold", "Extra Bold"];
const sizes = [12, 13, 14, 15, 16, 17, 18];

const alignments = [
  {
    name: "left",
    icon: left,
  },
  { name: "center", icon: center },
  { name: "right", icon: right },
];

const alignmentsActive = [leftActive, centerActive, rightrActive];

const textAlignments = [
  {
    name: "left",
    icon: leftText,
  },
  { name: "center", icon: centerText },
  { name: "right", icon: rightText },
];
const textAlignmentsActive = [leftTextActive, centerTextActive, rightTextActive];
const bannerStyles = [{
    name: "style1",
    icon: style1,
  },
   { name: "style2", icon: style2 },
   { name: "style3", icon: style3 },
   { name: "style4", icon: style4 },
   { name: "style5", icon: style5 },];
// const bannerStyles = ["style1", "style2",
// "style3","style4","style5"];

interface CustomizationSidebarProps {
  customization: CustomizationState;
  setCustomization: (next: Partial<CustomizationState>) => void;
}

export interface CustomizationState {
  bannerAlignment: "left" | "center" | "right";
  bannerStyle: "style1" | "style2" | "style3" | "style4"| "style5";
  font: string;
  weight: string;
  size: number;
  textAlignment: "left" | "center" | "right";
  colors: {
    bannerBg: string;
    bannerBg2: string;
    title: string;
    body: string;
    btnPrimaryBg: string;
    btnPrimaryText: string;
    btnSecondaryBg: string;
    btnSecondaryText: string;
  };
  radius: {
    container: number;
    button: number;
  };
}
type CustomColorsProps = {
  customization: CustomizationState;
  setCustomization: (next: any) => void;
};

type ColorPickerDropdownProps = {
  label: string;
  value: string;
  onChange: (color: string) => void;
   className : string;
};

export const ColorPickerDropdown: React.FC<ColorPickerDropdownProps> = ({
  label,
  value,
  onChange,
   className = "",
}) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div>
      <span>{label}</span>
      <div className={`color-picker-dropdown${className ? ` ${className}` : ""}`}  ref={containerRef}>
        <button
          className="color-picker-button"
          type="button"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="color-text">{value}</span>
          <div className="color-preview" style={{ backgroundColor: value }} />
        </button>
        <div className={`color-picker-container${open ? "" : " hidden"}`}>
          {/* Custom palette that allows dragging & picking */}
          <HexColorPicker
            color={value}
            onChange={onChange}
            style={{ width: "180px", height: "180px" }}
          />
        </div>
      </div>
    </div>
  );
};

function CustomColors({ customization, setCustomization }: CustomColorsProps) {
  
  const { colors } = customization;

  return (
    <div className="custom">
      <div className="customs">
        <ColorPickerDropdown
          className=""
          label="Banner Background"
          value={colors.bannerBg}
          onChange={v =>
            setCustomization({
              ...customization,
              colors: { ...colors, bannerBg: v }
            })
          }
        />
        <ColorPickerDropdown
          className="right"
          label="Second Background"
          value={colors.bannerBg2}
          onChange={v =>
            setCustomization({
              ...customization,
              colors: { ...colors, bannerBg2: v }
            })
          }
        />
      </div>
      <div className="customs">
        <ColorPickerDropdown
        className=""
          label="Body Text Color"
          value={colors.body}
          onChange={v =>
            setCustomization({
              ...customization,
              colors: { ...colors, body: v }
            })
          }
        />
        <ColorPickerDropdown
          className="right"
          label="Title Text Color"
          value={colors.title}
          onChange={v =>
            setCustomization({
              ...customization,
              colors: { ...colors, title: v }
            })
          }
        />
      </div>
      <div className="settings-label">Primary Button <QuestionMark  hoverText="Customize the background and text color for the primary button." /></div>
      <div className="customs">
        <ColorPickerDropdown
        className=""
          label="Background Color"
          value={colors.btnPrimaryBg}
          onChange={v =>
            setCustomization({
              ...customization,
              colors: { ...colors, btnPrimaryBg: v }
            })
          }
        />
        <ColorPickerDropdown
        
          className="right"
          label="Text Color"
          value={colors.btnPrimaryText}
          onChange={v =>
            setCustomization({
              ...customization,
              colors: { ...colors, btnPrimaryText: v }
            })
          }
        />
      </div>
      <div className="settings-label">Secondary Button <QuestionMark isLeft  hoverText="Customize the background and text color for the secondary  button." /></div>
      <div className="customs">
        <ColorPickerDropdown
        className=""
          label="Background Color"
          value={colors.btnSecondaryBg}
          onChange={v =>
            setCustomization({
              ...customization,
              colors: { ...colors, btnSecondaryBg: v }
            })
          }
        />
        <ColorPickerDropdown
          className="right"
          label="Text Color"
          value={colors.btnSecondaryText}
          onChange={v =>
            setCustomization({
              ...customization,
              colors: { ...colors, btnSecondaryText: v }
            })
          }
        />
      </div>
    </div>
  );
}

const CustomizationSidebar: React.FC<CustomizationSidebarProps> = ({
  customization,
  setCustomization,
}) =>{
  const [open, setOpen] = useState(false);
  const [openWeight, setOpenWeight] = useState(false);
  const [openSize, setOpenSize] = useState(false);
  console.log(customization.bannerAlignment);
  return (
  <div className="settings-sidebar" style={{ width: "260px" }}>
    <div className="settings-label">Cookie Banner Alignment <QuestionMark isLeft={true} hoverText="Adjust the cookie banner's alignment for optimal placement on your site." /></div>
    <div className="settings-align-group">
      {alignments.map((a, i): any => (
        <button
          key={a.name}
          className={
            "custom-align-btn" +
            (customization.bannerAlignment === a.name ? " active" : "")
          }
          onClick={() => setCustomization({ bannerAlignment: a.name as any })}
        >
          {customization.bannerAlignment === a.name ? (
            <img src={alignmentsActive[i]} alt="alignment" />
          ) : (
            <img src={a.icon} alt="alignment" />
          )}
        </button>
      ))}
    </div>
    <div className="settings-label" style={{ marginTop: 17 }}>
      Cookie Banner Styles <QuestionMark isLeft={true} hoverText="Customize the appearance of the cookie banner to match your site's design." />
    </div>
    <div className="settings-styles-group">
      {bannerStyles.map((s) => (
        <button
          key={s.name}
          className={
            "custom-style-btn" +
            (customization.bannerStyle === s.name ? " active" : "")
          }
          onClick={() => setCustomization({ bannerStyle: s.name as any })}
        >
          <img src={s.icon} alt="style" />
        </button>
      ))}
    </div>

    {/* Typography */}
    <div className="settings-label" style={{ marginTop: 17 }}>
      Typography <QuestionMark  hoverText="Customize font styles and sizes to enhance readability and design." />
    </div>
    <div style={{position:"relative"}}>
       <svg
        className={`dropdown-icon ${open ? "open" : ""}`}
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: "absolute",
          left: "111px",
          top: "50%",
          
          transition: "transform 0.3s ease",
        }}
      >
        <path
          d="M3 4.5L6 7.5L9 4.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    <select
      className="settings-input"
      value={customization.font}
       // toggle on mouse down so clicking the control when it's focused still toggles
        onMouseDown={() => setOpen((p) => !p)}
        // when user actually picks an option, close icon
        onChange={(e) => {
          setCustomization({ font: e.target.value });
          setOpen(false);
        }}
        // if focus leaves (click outside), close icon
        onBlur={() => setOpen(false)}
        // keyboard support: open on Enter/Space/Arrow, close on Escape
        onKeyDown={(e) => {
          const k = e.key;
          if (k === "Enter" || k === " " || k === "Spacebar" || k === "ArrowDown" || k === "ArrowUp") {
            setOpen(true);
          } else if (k === "Escape") {
            setOpen(false);
          }
        }}
        style={{ appearance: "none", paddingRight: "28px" }}
    >
      {fonts.map((f) => (
        <option key={f} value={f}>
          {f}
        </option>
      ))}
    </select>
</div>
    <div className="settings-row">
      <div style={{position:"relative"}}>
         <svg
        className={`dropdown-icon ${openWeight ? "open" : ""}`}
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: "absolute",
          left: "111px",
          top: "50%",
          transform: "translateY(-50%)",
          transition: "transform 0.3s ease",
        }}
      >
        <path
          d="M3 4.5L6 7.5L9 4.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <select
        className="settings-input"
        value={customization.weight}
         // toggle on mouse down so clicking the control when it's focused still toggles
        onMouseDown={() => setOpenWeight((p) => !p)}
        // when user actually picks an option, close icon
        onChange={(e) => {
          setCustomization({ weight: e.target.value });
          setOpenWeight(false);
        }}
        // if focus leaves (click outside), close icon
        onBlur={() => setOpenWeight(false)}
        // keyboard support: open on Enter/Space/Arrow, close on Escape
        onKeyDown={(e) => {
          const k = e.key;
          if (k === "Enter" || k === " " || k === "Spacebar" || k === "ArrowDown" || k === "ArrowUp") {
            setOpenWeight(true);
          } else if (k === "Escape") {
            setOpenWeight(false);
          }
        }}
        style={{ appearance: "none", paddingRight: "28px" }}
      >
        {weights.map((w) => (
          <option key={w}>{w}</option>
        ))}
      </select>
      </div>
      <div style={{position:"relative"}}>
      <select
        className="settings-input font-size-select"
        value={customization.size}
         // toggle on mouse down so clicking the control when it's focused still toggles
        onMouseDown={() => setOpenSize((p) => !p)}
        // when user actually picks an option, close icon
        onChange={(e) => {
          setCustomization({ size: Number(e.target.value) });
          setOpenSize(false);
        }}
        // if focus leaves (click outside), close icon
        onBlur={() => setOpenSize(false)}
        // keyboard support: open on Enter/Space/Arrow, close on Escape
        onKeyDown={(e) => {
          const k = e.key;
          if (k === "Enter" || k === " " || k === "Spacebar" || k === "ArrowDown" || k === "ArrowUp") {
            setOpenSize(true);
          } else if (k === "Escape") {
            setOpenSize(false);
          }
        }}
        style={{ appearance: "none", paddingRight: "28px" }}
      >
        {sizes.map((sz) => (
          <option key={sz} value={sz}>
            {sz}
          </option>
        ))}
      </select>
       <svg
        className={`dropdown-icon ${openSize ? "open" : ""}`}
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: "absolute",
          right: "9px",
          top: "50%",
          transform: "translateY(-50%)",
          transition: "transform 0.3s ease",
        }}
      >
        <path
          d="M3 4.5L6 7.5L9 4.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      </div>
    </div>
<div style={{display:"flex",gap:"11px"}}>
    <div className="settings-label">Alignment</div>
    <div className="settings-align-group">
      {textAlignments.map((a,i) => (
        <button
          key={a.name}
          className={
            "custom-align-btn" +
            (customization.textAlignment === a.name ? " active" : "")
          }
          onClick={() => setCustomization({ textAlignment: a.name as any })}
        >
        {customization.textAlignment === a.name ? (
            <img src={textAlignmentsActive[i]} alt="alignment" />
          ) : (
            <img src={a.icon} alt="alignment" />
          )}
        </button>
      ))}
    </div>
</div>
    {/* Colours */}
    <div className="settings-label" style={{ marginTop: 17 }}>
      Colours <QuestionMark  hoverText="Customize the colors to match your site's branding and design." />
    </div>
    {/* <div className="settings-color-group">
      <label>
        Banner background{" "}
        <input
          type="color"
          value={customization.colors.bannerBg}
          onChange={(e) =>
            setCustomization({
              colors: { ...customization.colors, bannerBg: e.target.value },
            })
          }
        />
      </label>
      <label>
        Banner background 2{" "}
        <input
          type="color"
          value={customization.colors.bannerBg2}
          onChange={(e) =>
            setCustomization({
              colors: { ...customization.colors, bannerBg2: e.target.value },
            })
          }
        />
      </label>
      <label>
        Title Text Color{" "}
        <input
          type="color"
          value={customization.colors.title}
          onChange={(e) =>
            setCustomization({
              colors: { ...customization.colors, title: e.target.value },
            })
          }
        />
      </label>
      <label>
        Body Text Color{" "}
        <input
          type="color"
          value={customization.colors.body}
          onChange={(e) =>
            setCustomization({
              colors: { ...customization.colors, body: e.target.value },
            })
          }
        />
      </label>
    </div> */}
    <CustomColors customization={customization} setCustomization={setCustomization}/>
    {/* <div className="settings-label" style={{ marginTop: 17 }}>
      Primary Button
    </div>
    <div className="settings-color-group">
      <label>
        Background Colour{" "}
        <input
          type="color"
          value={customization.colors.btnPrimaryBg}
          onChange={(e) =>
            setCustomization({
              colors: { ...customization.colors, btnPrimaryBg: e.target.value },
            })
          }
        />
      </label>
      <label>
        Text Colour{" "}
        <input
          type="color"
          value={customization.colors.btnPrimaryText}
          onChange={(e) =>
            setCustomization({
              colors: {
                ...customization.colors,
                btnPrimaryText: e.target.value,
              },
            })
          }
        />
      </label>
    </div>
    <div className="settings-label" style={{ marginTop: 17 }}>
      Secondary Button
    </div>
    <div className="settings-color-group">
      <label>
        Background Colour{" "}
        <input
          type="color"
          value={customization.colors.btnSecondaryBg}
          onChange={(e) =>
            setCustomization({
              colors: {
                ...customization.colors,
                btnSecondaryBg: e.target.value,
              },
            })
          }
        />
      </label>
      <label>
        Text Colour{" "}
        <input
          type="color"
          value={customization.colors.btnSecondaryText}
          onChange={(e) =>
            setCustomization({
              colors: {
                ...customization.colors,
                btnSecondaryText: e.target.value,
              },
            })
          }
        />
      </label>
    </div> */}
    {/* Radius controls */}
    <div className="settings-label" style={{ marginTop: 17 }}>
      Corner radius  <QuestionMark isLeft={true} hoverText="Adjust the corner radius of buttons and containers in the cookie banner." />
    </div>
    <div className="settings-row">
      <div>
        <label>Container</label>
        <input
          type="number"
          min={0}
          max={40}
          value={customization.radius.container}
          onChange={(e) =>
            setCustomization({
              radius: {
                ...customization.radius,
                container: Number(e.target.value),
              },
            })
          }
          className="settings-input"
          style={{ width: 87, marginLeft: 8 }}
        />
      </div>
      <div>
        <label>Button</label>
        <input
          type="number"
          min={0}
          max={40}
          value={customization.radius.button}
          onChange={(e) =>
            setCustomization({
              radius: {
                ...customization.radius,
                button: Number(e.target.value),
              },
            })
          }
          className="settings-input"
          style={{ width: 87, marginLeft: 8 }}
        />
      </div>
    </div>
  </div>
);
}

export default CustomizationSidebar;
