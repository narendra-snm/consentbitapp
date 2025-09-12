
import QuestionMark from "../assets/success.png"
import CustomizationPromo from "./CustomizationPromo";

const SuccessModal: React.FC<{ onCustomize: () => void }> = ({ onCustomize }) => (
  <div className="modal-blur-overlay">
    <div className="modal-centered-content">
      <img src={QuestionMark} alt="Info" className="modal-info-top-icon" />
      <label className="modal-checkbox-label">
        
       
      Successfully published to your site
      </label>
      
    </div>
    <div className="modal-bottom-panel">
    <CustomizationPromo/>
    </div>
  </div>
);

export default SuccessModal;
