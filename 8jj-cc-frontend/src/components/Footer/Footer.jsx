import "./Footer.css";
import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="app-footer">
      <nav className="dock">
        <NavLink to="/" className="tab">
          <img src="/images/Home.png" alt="Home" />
          <span>Home</span>
        </NavLink>

        <NavLink to="/event" className="tab">
          <img src="/images/Event.png" alt="Event" />
          <span>Event</span>
        </NavLink>

        <NavLink to="/show" className="tab">
          <img src="/images/Show.png" alt="Show" />
          <span>Show</span>
        </NavLink>
      </nav>
    </footer>
  );
}
