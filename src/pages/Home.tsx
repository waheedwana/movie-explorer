import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import Featured from "../components/Featured";
import { useScrollReveal } from "../animations";
function Home() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const heroRef = useScrollReveal<HTMLDivElement>();
  const sectionRef = useScrollReveal<HTMLDivElement>({ delay: 80 });
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    navigate(`/movies?search=${query}`);
  }
  return (
    <main>
      <section className="hero">
        <div ref={heroRef} className="container hero-inner">
          <span className="eyebrow">A curated catalogue</span>
          <h1 className="headline">Find your next favourite film.</h1>
          <p className="hero-subtitle">
            <span className="hero-subtitle-full">
              A home for meaningful movies. We gather timeless silent films and
              modern masterpieces, keeping only what is beautiful to watch.
            </span>
            <span className="hero-subtitle-compact">
              Timeless classics and modern masterpieces, curated with care.
            </span>
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
        <div ref={sectionRef} className="section-header">
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
