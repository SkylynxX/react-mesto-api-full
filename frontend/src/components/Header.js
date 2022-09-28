import logo from "../images/header-logo.svg";
import { Link } from 'react-router-dom';

export function Header(props) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип Mesto" />
      <div className="header__container">
        {props.isLoggedIn && (<p className="header__container_email header__container_email-block ">{props.userEmail}</p>)}
        <Link className="header__container_link header__container_link-out" to={props.linkPath} onClick={props.onClick}>{props.linkText}</Link>
      </div>
      
    </header>
  );
}
