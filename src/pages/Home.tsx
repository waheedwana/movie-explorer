import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import Featured from "../components/Featured";
function Home() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    navigate(`/movies?search=${query}`);
  }
  return (
    <main>
      <section className="hero">
        <div className="container hero-inner">
          <span className="eyebrow">A curated catalogue</span>
          <h1 className="headline">Find your next favourite film.</h1>
          <p className="hero-subtitle">
            A home for meaningful movies. We gather timeless silent films and
            modern masterpieces, keeping only what is beautiful to watch.
          </p>

          <form className="hero-search" onSubmit={handleSubmit}>
            <input
              placeholder="Search by title, director or genre"
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
            />
            <button className="btn btn-search">Search</button>
          </form>
        </div>
      </section>
      <section className="container section">
        <div className="section-header">
          <span className="eyebrow">Films too rare</span>
          <h2 className="section-title">
            A collection of films worth remembering.
          </h2>
          <Link to="/movies" className="section-action">
            Browse the catalogue →
          </Link>
        </div>
        <div className="movie-grid">
          <Featured />
        </div>
      </section>
    </main>
  );
}

export default Home;
