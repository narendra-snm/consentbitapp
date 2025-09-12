import QuestionMark from "./QuestionMark";
import logo from "../assets/logo.png"
import HelpDropdown from "./HelpDropdown";
const Header = () => {
  return (
    <header className="header">
      <div className="logo">
       <img src={logo} alt="logo" /> 
      </div>
      <div className="header-button-div">
      <QuestionMark isLeft hoverText="Need help? Visit our support center or contact us for assistance." />
     <HelpDropdown/>
    </div>
    </header>
  );
};

export default Header;
