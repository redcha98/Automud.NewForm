import "./Header.css";
import LogoImage from "../../assets/images/LogoBianco.svg";

const Header = () => {
  return (
    <header className="header">
      <img src={LogoImage} alt="Logo" />
    </header>
  );
};

export default Header;
