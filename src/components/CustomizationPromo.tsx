import promo from"../assets/image 3.png"
const CustomizationPromo = ({ onCustomize }: { onCustomize: () => void }) => (
  <div className="customize-promo-box">
    {/* Left Side */}
    <div className="customize-promo-left">
      <div className="customize-promo-title">
        Want to customize further?<br />
        Match the widget to your brand with:
      </div>
      <ul className="customize-promo-list">
        <li>Brand colors and alignment</li>
        <li>Smooth animations</li>
        <li>Region-specific compliance settings</li>
      </ul>
      <button className="customize-promo-btn" onClick={onCustomize}>
        Start Customizing <span className="customize-promo-arrow">→</span>
      </button>
    </div>
    {/* Right Side (you add your image or config preview here) */}
    <div className="customize-promo-right">
      {/* Place your own image or content here */}
      <img src={promo} alt="Customization Preview" className="customize-promo-image"/>
    </div>
  </div>
);

export default CustomizationPromo;
