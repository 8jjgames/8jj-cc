import { NavLink } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="app-footer">
      <nav className="dock">

        <NavLink to="/" className={({ isActive }) => `tab ${isActive ? "is-active" : ""}`}>
          <img className="icon" src="/images/Home.png" alt="Home" />
          <span className="label">Home</span>
        </NavLink>

        <NavLink to="/event" className={({ isActive }) => `tab ${isActive ? "is-active" : ""}`}>
          <img className="icon" src="/images/Event.png" alt="Event" />
          <span className="label">Event</span>
        </NavLink>

        <NavLink to="/show" className={({ isActive }) => `tab ${isActive ? "is-active" : ""}`}>
          <img className="icon" src="/images/Show.png" alt="Show" />
          <span className="label">Show</span>
        </NavLink>

      </nav>
    </footer>
  );
}
