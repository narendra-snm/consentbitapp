import React, { useState } from "react";
import cookieBanner from "../assets/cookies_banner.png";
import coupon from "../assets/Subtract.png";
import copy from "../assets/fi-rr-copy (1).png";

const Screen5 = ({onBack, onNext,onPublish}:{onBack: () => void;onPublish: () => void; onNext: () => void}) => {
  const [showToast, setShowToast] = useState(false);
  const couponCode = "ABCDEFG";

  const handleCopy = () => {
    navigator.clipboard.writeText(couponCode).then(() => {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000); // hide after 2s
    });
  };

  return (
    <div className="screen5-grid">
      {/* Left panel */}
      <div className="screen5-left">
        <button className="modal-back-btn back" onClick={onBack}>← Go back</button>

        <div className="screen5-payment-block">
          <div className="screen5-payment-header">
            <div className="screen5-payment-title">
              Complete payment to publish cookie widget to the live site
            </div>

            <div className="screen5-coupon-row">
              <img src={coupon} alt="Coupon" className="screen5-coupon-icon" />
              <span className="screen5-coupon-label">
                Get the app free for one year, use coupon code - {couponCode}
              </span>
              <button
                className="screen5-copy-btn"
                aria-label="Copy code"
                onClick={handleCopy}
              >
                <img src={copy} alt="Copy" className="screen5-copy-icon" />
              </button>
            </div>
          </div>

          <div className="border-top"></div>
          <button className="screen5-payment-btn">
            <span> Pay now</span>
            <svg
              width="9"
              height="10"
              viewBox="0 0 9 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.48 5.376V4.428H7.428L3.924 1.116L4.56 0.468L8.88 4.62V5.148L4.56 9.312L3.912 8.652L7.392 5.376H0.48Z"
                fill="#8C79FF"
              />
            </svg>
          </button>
        </div>

        <div className="screen5-desc">
          <span>*</span>{" "}
          <span>
            Complete the payment to publish the cookie widget to the live site.
            If payment is not made, it will only be published to the staging
            site.
          </span>
        </div>

        <button className="screen5-publish-btn" onClick={onPublish}>Publish</button>
        <a className="screen5-customize-link" onClick={onNext}>
          Customize →
        </a>
      </div>

      {/* Right panel */}
      <div className="screen5-right">
        <img
          src={cookieBanner}
          alt="Cookie Banner Preview"
          className="screen5-cookie-banner"
        />
      </div>

      {/* Toast */}
      {showToast && <div className="fbp-toast">Coupon copied!</div>}
    </div>
  );
};

export default Screen5;
