import { Link } from "react-router-dom";
import './Nav.css';

export default function Nav() {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li><Link to="/home" className="nav-link">Home</Link></li>
        <li><Link to="#" className="nav-link">About</Link></li>
        <li><Link to="#" className="nav-link">Contact</Link></li>
      </ul>
    </nav>
  );
}
