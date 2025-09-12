import React,{ useState} from "react";
import copyIcon from "../assets/fi-rr-copy.png";
import dismiss from "../assets/fi-rr-eye-crossed.png";
import explainationMark from "../assets/explainationMark.png";
import openIcon from "../assets/open_page.png";
import QuestionMark from "./QuestionMark";



interface Category {
  label: string;
  info?: string;
}

interface ScriptCardProps {
  script: string;
  categories: Category[];
  initialCategory: string | null;
  onCategoryChange: (newCategory: string | null) => void;
  onCopyScript: () => void;
  pasteLink: string;
  pasteLinkText?: string;
  onDismiss: () => void;
}

const ScriptCard: React.FC<ScriptCardProps> = ({
  script,
  categories,
  initialCategory,
  onCategoryChange,
  onCopyScript,
  pasteLink,
  pasteLinkText = "Open the page to paste script",
  onDismiss,
}) => {
  // Category state local to card
  const [selectedCategoryIdx, setSelectedCategoryIdx] = useState<number | null>(
    initialCategory
      ? categories.findIndex((c) => c.label === initialCategory)
      : null
  );

  // Update parent when local state changes
  const handleSelectCategory = (idx: number) => {
    setSelectedCategoryIdx(idx);
    onCategoryChange(categories[idx].label); // pass value to parent
  };

  return (
    <div className="fbp-card">
      <img src={explainationMark} alt="Info" className="fbp-info-top-icon" />
      <div className="fbp-header-row">
        <span className="fbp-header-title">Update the Facebook Pixel script</span>
        <button className="fbp-dismiss" onClick={onDismiss}>
          <img src={dismiss} alt="Dismiss" className="fbp-dismiss-icon" />
          <span>Dismiss</span>
        </button>
      </div>
      <div className="fbp-desc">
        Check categories &nbsp;·&nbsp; copy script &nbsp;·&nbsp; open the page to paste script
      </div>
      <div className="fbp-card-grid">
        <div className="fbp-category-panel">
          <span className="fbp-category-label">Category:</span>
          <div className="fbp-radio-group">
            {categories.map((cat, idx) => (
              <div key={cat.label} className="fbp-radio-item">
              <button
                type="button"
                key={cat.label}
                className={
                  "fbp-toggle-btn" + (selectedCategoryIdx === idx ? " active" : "")
                }
                onClick={() => handleSelectCategory(idx)}
              >
                <span className="fbp-toggle-slider" />
                <span className="fbp-toggle-label">{cat.label}</span>
              </button>
                              <QuestionMark hoverText="Need help? Visit our support center or contact us for assistance." />

              </div>
            ))}
          </div>
        </div>
        <div className="fbp-script-panel">
          <div className="fbp-script-row">
            <div className="fbp-script" spellCheck={false}>
              {script}
            </div>
            <button
              className="fbp-copy-btn"
              onClick={onCopyScript}
              aria-label="Copy script"
              style={{ backgroundImage: `url(${copyIcon})` }}
            />
          </div>
        </div>
      </div>
      <a
        className="fbp-paste-link"
        href={pasteLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        {pasteLinkText}
        <img
          src={openIcon}
          alt="Open page"
          className="fbp-paste-icon"
          style={{ backgroundImage: `url(${openIcon})` }}
        />
      </a>
    </div>
  );
};

export default ScriptCard;
