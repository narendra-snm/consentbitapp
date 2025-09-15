import PanelRow from "./PannelRow";

const ScreenTwo = ({onClick}: {onClick: () => void}) => {

  return (
    <div className="main">
    <div className="main bg-screen">
      <h1>
        Welcome to <span className="highlight">Consentbit</span>
      </h1>
      <p className="description">
        Scan your Webflow site, review detected scripts, add backend, 
        and publish when you’re ready
      </p>

      

      <button className="authorize-btn" onClick={onClick}>Scan Project</button>
      <div className="bottom-panel">
        <PanelRow isblurred={false} />
      </div>
     
    </div>
    </div>
  );
};

export default ScreenTwo;
