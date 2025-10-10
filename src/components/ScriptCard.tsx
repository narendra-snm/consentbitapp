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
  initialCategory: string[];
  onCategoryChange: (newCategory: string ) => void;
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
  const [showToast, setShowToast] = useState(false)
  // Category state local to card
const [selectedCategories, setSelectedCategories] = useState<string[]>(initialCategory || []);


  // Update parent when local state changes
  const handleSelectCategory = (catLabel: string) => {
  setSelectedCategories(prev =>
    prev.includes(catLabel)
      ? prev.filter(label => label !== catLabel)
      : [...prev, catLabel]
  );
  onCategoryChange(catLabel);
};
 const handleCopyScript = () => {
    onCopyScript()
    setShowToast(true)
    setTimeout(() => setShowToast(false), 2000) // Hide after 2 seconds
  }
  return (
    <div className="fbp-card">

       {showToast && <div className="fbp-toast">Script copied!</div>}
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
           {categories.map((cat) => (
  <div key={cat.label} className="fbp-radio-item">
    <button
      type="button"
      className={"fbp-toggle-btn" + (selectedCategories.includes(cat.label) ? " active" : "")}
      onClick={() => handleSelectCategory(cat.label)}
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
              onClick={handleCopyScript}
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
}

export default ScriptCard;
