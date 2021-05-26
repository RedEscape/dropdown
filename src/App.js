import { useState } from "react";
import { CSSTransition } from "react-transition-group";
import { ReactComponent as Micropone } from "./svg/002-microphone.svg";
import { ReactComponent as PlanetEarth } from "./svg/030-planet earth.svg";
import { ReactComponent as UsersIcon } from "./svg/020-users.svg";
import { ReactComponent as IdCardIcon } from "./svg/038-id card.svg";
import { ReactComponent as SettingsIcon } from "./svg/050-settings.svg";
import { ReactComponent as SpeakersIcon } from "./svg/022-speakers.svg";

import "./index.css";

function App() {
  return (
    <Navbar>
      <NavItem icon={<Micropone />} />
      <NavItem icon={<PlanetEarth />} />
      <NavItem icon={<UsersIcon />} />

      <NavItem icon={<IdCardIcon />}>
        <DropdownMenu />
      </NavItem>
    </Navbar>
  );
}

function DropdownMenu() {
  const [activeMenu, setActiveMenu] = useState("main"); //settings, animals
  const [menuHeight, setMenuHeight] = useState(null);

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  function DropdownItem(props) {
    return (
      <a
        href="#"
        className="menu-item"
        onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}
      >
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
        <span className="icon-right">{props.rightIcon}</span>
      </a>
    );
  }

  return (
    <div className="dropdown" style={{ height: menuHeight }}>
      <CSSTransition
        in={activeMenu === "main"}
        unmountOnExit
        timeout={500}
        classNames="menu-primary"
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownItem>My Profile</DropdownItem>
          <DropdownItem
            leftIcon={<SettingsIcon />}
            rightIcon={<SpeakersIcon />}
            goToMenu="settings"
          >
            Settings
          </DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === "settings"}
        unmountOnExit
        timeout={500}
        classNames="menu-secondary"
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownItem
            leftIcon={<SettingsIcon />}
            // rightIcon={<SpeakersIcon />}
            goToMenu="main"
          >
            Animals
          </DropdownItem>
          <DropdownItem>Secondary</DropdownItem>
          <DropdownItem>Secondary</DropdownItem>
          <DropdownItem>Secondary</DropdownItem>
          <DropdownItem>Secondary</DropdownItem>
          <DropdownItem>Secondary</DropdownItem>
          <DropdownItem>Secondary</DropdownItem>
        </div>
      </CSSTransition>
    </div>
  );
}

function Navbar(props) {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">{props.children}</ul>
    </nav>
  );
}

function NavItem(props) {
  const [open, setOpen] = useState(false);
  return (
    <li className="nav-item">
      <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
        {props.icon}
      </a>

      {open && props.children}
    </li>
  );
}

export default App;
