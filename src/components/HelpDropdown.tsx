import React, { useState, useRef, useEffect } from "react";

interface HelpLink {
  href: string;
  icon: string;
  text: string;
}

const HELP_LINKS: HelpLink[] = [
  {
    href: "https://vimeo.com/1090979483/99f46cddbf",
    icon: "https://67c7218243770a3d2c39fb20.webflow-ext.com/68b0e5583769195ccc356001/66fe4eed25e95e73e315.svg",
    text: "Watch tutorial",
  },
  {
    href: "https://www.consentbit.com/help-document",
    icon: "https://67c7218243770a3d2c39fb20.webflow-ext.com/68b0e5583769195ccc356001/d7bb4f2db06855167505.svg",
    text: "Check docs",
  },
  {
    href: "https://www.consentbit.com/contact",
    icon: "https://67c7218243770a3d2c39fb20.webflow-ext.com/68b0e5583769195ccc356001/cfe60e65bedc27b23258.svg",
    text: "Get support",
  },
  {
    href: "https://www.consentbit.com/contact",
    icon: "https://67c7218243770a3d2c39fb20.webflow-ext.com/68b0e5583769195ccc356001/68a1fe2d8c3940dbf237.svg",
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
