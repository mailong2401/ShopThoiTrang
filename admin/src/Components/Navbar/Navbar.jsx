import "./Navbar.css";
import nav_logo from "../../assets/logo.png";
import nav_profile from "../../assets/profile.jpg";
const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-panel">
        <img src={nav_logo} alt="" className="nav-logo" />

        <div className="logo-container">
          <span className="shopper">SHOPPER</span>
          <span className="admin-panel">Admin Panel</span>
        </div>
      </div>
      <img src={nav_profile} alt="" className="nav-profile" />
    </div>
  );
};

export default Navbar;
