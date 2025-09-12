import React from "react";
import QuestionMark from "./QuestionMark";

interface HelpCardProps {
  heading?: string;
  description?: string;
  tutorialImg: string;
  tutorialAlt?: string;
  tutorialLink?: string;
 
}

const HelpCard: React.FC<HelpCardProps> = ({
  heading = "Facing any issues?",
  description = "Check our tutorial video to help yourself",
  tutorialImg,
  tutorialAlt = "Tutorial Thumbnail",
  tutorialLink = "#",
  
}) => (
  <div className="help-card">
    <div className="help-card-top">
      <div className="help-card-text">
        <span className="help-card-heading">{heading}</span>
        <span className="help-card-desc">{description}</span>
      </div>
      <a href={tutorialLink} target="_blank" rel="noopener noreferrer">
        <img className="help-card-img" src={tutorialImg} alt={tutorialAlt} />
      </a>
    </div>
   <div className="header-button-div">
      <QuestionMark hoverText="Need help? Visit our support center or contact us for assistance." />
      <button className="help-btn"> Need help ?</button>
    </div>
  </div>
);

export default HelpCard;
