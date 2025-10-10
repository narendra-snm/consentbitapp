import React, { useState } from "react";

import start from "../assets/star.svg";
import cross from "../assets/cross.svg";
import arrow from "../assets/arrow.svg"

type ChoosePlanProps = {
  onClose: () => void;
};

const ChoosePlan: React.FC<ChoosePlanProps> = ({ onClose }) => {
  const [isAnnual, setIsAnnual] = useState(false);
  const price = isAnnual ? 6 : 8;
  const pricingText = isAnnual ? "/Paid Annually" : "/Paid Monthly";

  const handleToggle = (value: "monthly" | "annually") => {
    setIsAnnual(value === "annually");
  }

  return (
    <div className="choose-plan-overlay">
      <div className="choose-plan-modal">
        <div className="flexx">
          <h2 className="choose-plan-title">Choose plan</h2>

          <button className="choose-plan-close" onClick={onClose}>
            <img src={cross} alt="" />
          </button>

        </div>

        <div className="choose-plan-description">
          {/* <FaStar className="choose-plan-star" /> */}
          <img src={start} alt="" />
          <p>
            Simple pricing, complete access—go monthly for flexibility or save big with a yearly subscription. All features, always available
          </p>
        </div>

        <div className="plan-big-card">
          <div className="choose-plan-card">
            <p>Celebrate our launch with a free year of Consentbit - CONSENTBIT100</p>
            <div className="choose-plan-price">
              ${price}
            </div>
            <div className="choose-plan-subtext">{pricingText}</div>

            <div className="switches-container">
              <input
                type="radio"
                id="switchMonthly"
                name="switchPlan"
                checked={!isAnnual}
                onChange={() => handleToggle("monthly")}
              />
              <input
                type="radio"
                id="switchYearly"
                name="switchPlan"
                checked={isAnnual}
                onChange={() => handleToggle("annually")}
              />
              <label htmlFor="switchMonthly">Monthly</label>
              <label htmlFor="switchYearly">Annually</label>
              <div className="switch-wrapper">
                <div className="switch"></div>
              </div>

            </div>
           {isAnnual &&( <div className="anually-text">
              you save 20%
            </div>)}

            <div className="center">
              <button
                className="choose-plan-cta"
                onClick={() => {
                  const url = isAnnual ? "https://buy.stripe.com/eVq28sf835UuaBXfJ2ds405" : "https://buy.stripe.com/aFafZie3Z6Yy39vbsMds404";
                  window.open(url, "_blank");
                }}
              >
                Purchase Now <img src={arrow} alt="" />
              </button>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
};

export default ChoosePlan;


