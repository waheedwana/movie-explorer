export function About() {
  return (
    <section className="page">
      <div className="container narrow">
        <div className="page-header">
          <span className="eyebrow">About</span>
          <h1>About</h1>
          <p>Learn how Movie works.</p>
        </div>

        <div className="about-card">
          <h2>What is Movie Explorer?</h2>
          <p>
            Movie Explorer is a portfolio project built to demonstrate modern
            React development. It searches and displays movies using the{" "}
            <a href="https://www.omdbapi.com" target="_blank" rel="noreferrer">
              OMDb API
            </a>
            .
          </p>

          <h2> Tech stack</h2>
          <ul>
            <li>React</li>
            <li>TypeScript</li>
            <li>Vite</li>
            <li>React Router (v6)</li>
            <li>OMDb API</li>
          </ul>

          <h2>Features</h2>
          <ul>
            <li>Live movie search with URL-synced query parameters</li>
            <li>Movie details with ratings, cast, and plot</li>
            <li>Favorites saved to localStorage</li>
            <li>Loading / error / empty states everywhere</li>
            <li>Request cancellation with AbortController</li>
            <li>Responsive layout</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
