import Header from "./components/Header";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import { About } from "./pages/About";
import Favorites from "./pages/Favorites";
import MovieDetails from "./pages/MovieDetails";
import { FavoritesProvider } from "./context/FavoritesContext";
import { Footer } from "./components/Footer";
import { useScrollToTopOnChange } from "./animations";

function ScrollToTopOnNavigate() {
  const { pathname } = useLocation();
  useScrollToTopOnChange(pathname);
  return null;
}

function App() {
  return (
    <FavoritesProvider>
      <BrowserRouter>
        <ScrollToTopOnNavigate />
        <Header />
        <main className="site-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/about" element={<About />} />
            <Route path="/movies/:id" element={<MovieDetails />} />
          </Routes>
        </main>
      </BrowserRouter>
      <Footer />
    </FavoritesProvider>
  );
}

export default App;
