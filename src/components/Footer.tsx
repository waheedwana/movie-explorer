import { useScrollReveal } from "../animations";

export function Footer() {
  const revealRef = useScrollReveal<HTMLDivElement>();

  return (
    <footer className="footer">
      <div ref={revealRef} className="container footer-inner">
        <p>© 2026 Movie Explorer</p>
        <p>Built with curiosity, code and a love for great movies.</p>
      </div>
    </footer>
  );
}
