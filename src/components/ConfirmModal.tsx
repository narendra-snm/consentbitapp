import React from "react";
import PanelRow from "./PannelRow"; // or your own path
import QuestionMark from "../assets/QuestionMark2.png"
import tick from "../assets/tick-square.png"
import tick2 from "../assets/tick-square2.png"
const ConfirmModal: React.FC<{
  checked: boolean;
  onCheck: () => void;
  onProceed: () => void;
  onGoBack: () => void;
}> = ({ checked, onCheck, onProceed, onGoBack }) => (
  <div className="modal-blur-overlay">
    <div className="modal-centered-content">
      <img src={QuestionMark} alt="Info" className="modal-info-top-icon" />
      <label className="modal-checkbox-label">
        { checked ? (
          <img src={tick} alt="Checked" className="modal-checkbox-icon" />
        ) : (
          <img src={tick2} alt="Unchecked" className="modal-checkbox-icon" />
        )}
        <input
          type="checkbox"
          className="modal-checkbox"
          checked={checked}
          onChange={onCheck}
        />
       
        Confirm that you are added all scripts to the backend
      </label>
      <div className="modal-actions-row">
        <button className="modal-back-btn" onClick={onGoBack}>
          ← go back
        </button>
        <button
          className="modal-next-btn"
          disabled={!checked} 
          onClick={onProceed}
        >
          proceed to next step
        </button>
      </div>
    </div>
    <div className="modal-bottom-panel">
      <PanelRow isblurred={true} />
    </div>
  </div>
);

export default ConfirmModal;
