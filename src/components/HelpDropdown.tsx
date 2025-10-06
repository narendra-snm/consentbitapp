import React, { useState, useRef, useEffect } from "react";
import tutorial from "../assets/watchtutorial.svg"
import checkdocs from "../assets/checkdocs.svg"
import getsupport from "../assets/getsupport.svg"
import savefeedback from "../assets/savefeedback.svg"

interface HelpLink {
  href: string;
  icon: string;
  text: string;
}

const HELP_LINKS: HelpLink[] = [
  {
    href: "https://vimeo.com/1090979483/99f46cddbf",
    icon: tutorial,
    text: "Watch tutorial",
  },
  {
    href: "https://www.consentbit.com/help-document",
    icon: checkdocs,
    text: "Check docs",
  },
  {
    href: "https://www.consentbit.com/contact",
    icon: getsupport,
    text: "Get support",
  },
  {
    href: "https://www.consentbit.com/contact",
    icon: savefeedback,
    text: "Send feedback",
  },
];

const HelpDropdown: React.FC = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="help-dropdown" ref={dropdownRef}>
      <button className="help-btn" onClick={() => setOpen((o) => !o)}>
        Need help ?
      </button>
      {open && (
        <div className="dropdown-content">
          <p className="helptext">Help</p>
          <ul>
            {HELP_LINKS.map((link) => (
              <li key={link.text}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={link.icon}
                    alt={link.text}
                    width={16}
                    height={16}
                    style={{
                      marginRight: 8,
                      verticalAlign: "middle",
                      opacity: 0.5,
                    }}
                  />
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default HelpDropdown;
