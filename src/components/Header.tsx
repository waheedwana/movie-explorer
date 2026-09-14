import { useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="brand" onClick={() => setOpen(false)}>
          Movie.
        </Link>
        <button
          type="button"
          className="menu-toggle"
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
          <span />
        </button>
        <nav className={`nav${open ? " nav-open" : ""}`}>
          <Link to="/" className="nav-link" onClick={() => setOpen(false)}>
            Home
          </Link>
          <Link to="/movies" className="nav-link" onClick={() => setOpen(false)}>
            Movies
          </Link>
          <Link
            to="/favorites"
            className="nav-link"
            onClick={() => setOpen(false)}
          >
            ♡ Favorites
          </Link>
          <Link to="/about" className="nav-link" onClick={() => setOpen(false)}>
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
