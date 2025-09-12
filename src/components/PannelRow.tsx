import tutorialImg from "../assets/tutorial-thumbnail.png";
import explainationMark from "../assets/explainationMark2.png";
import QuestionMark from "./QuestionMark";

const LeftCard = () => (
  <div className="help-card">
    <div className="help-card-top">
      <div>
        <div className="help-title">Facing any issues?</div>
        <div className="help-desc">Check our tutorial video to help yourself</div>
      </div>
      <img
        className="help-img"
        src={tutorialImg}
        alt="YouTube Thumbnail Tutorial"
      />
    </div>
    <div className="help-card-bottom">
      <QuestionMark hoverText="Need help? Visit our support center or contact us for assistance." />
      <span className="help-need-text">Need help ?</span>
    </div>
  </div>
);

const RightCard = ({ isblurred }: { isblurred: boolean }) =>{ 
  const style = isblurred ? {  background: '#403A60' } : {};
  return(
  <div className="info-card" style={style}>
    <div className="info-header">
      <span className="info-shield-icon"><img src={explainationMark}/></span>
      <span className="info-title">
        Update the scripts in your project that handle cookie creation
      </span>
    </div>
    <div className="info-desc">
      Check your project scripts for any that create cookies. Organize them, replace with our snippet, and follow our tutorial to streamline your workflow.
    </div>
    <a href="#" className="info-link">
      Need help? See the docs <span className="info-link-arrow">↗</span>
    </a>
  </div>
);
}
const PanelRow = ({ isblurred }: { isblurred: boolean }) => (
  <div className="panel-row">
    <LeftCard />
    <RightCard isblurred={isblurred} />
  </div>
);

export default PanelRow;
