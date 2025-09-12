import React from "react";
import cookieBanner from "../assets/cookies_banner.png"
import coupon from "../assets/Subtract.png"
import copy from "../assets/fi-rr-copy (1).png"
const Screen5: React.FC = () => (
  <div className="screen5-grid">
    {/* Left panel */}
    <div className="screen5-left">
      <button className="modal-back-btn back">
        ← Go back
      </button>
      <div className="screen5-payment-block">
        <div className="screen5-payment-header">
        <div className="screen5-payment-title">
          Complete payment to publish cookie widget to the live site
        </div>
        <div className="screen5-coupon-row">
            <img src={coupon} alt="Coupon" className="screen5-coupon-icon" />
          <span className="screen5-coupon-label">
            Get the app free for one year,
             use coupon code - 
            ABCDEFG
          </span>
                    <button className="screen5-copy-btn" aria-label="Copy code"><img src={copy} alt="Copy" className="screen5-copy-icon" /></button>

          </div>
        </div>
        <div className="border-top"></div>
        <button className="screen5-payment-btn">
         <span> Pay now</span> <svg width="9" height="10" viewBox="0 0 9 10" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.48 5.376V4.428H7.428L3.924 1.116L4.56 0.468L8.88 4.62V5.148L4.56 9.312L3.912 8.652L7.392 5.376H0.48Z" fill="#8C79FF"/>
</svg>

        </button>
      </div>
      
      <div className="screen5-desc">
       <span>*</span> <span> Complete the payment to publish the cookie widget to the live site. If payment is not made, it will only be published to the staging site.</span>
      </div>
      <button className="screen5-publish-btn">
        Publish
      </button>
      <a className="screen5-customize-link" href="#">
       Customize →
      </a>
    </div>
    {/* Right panel (for your preview, just a placeholder box here) */}
    <div className="screen5-right">
      {/* Add your preview iframe, image, or component here */}
      <img src={cookieBanner} alt="Cookie Banner Preview" className="screen5-cookie-banner"/>
    </div>
  </div>
);

export default Screen5;
