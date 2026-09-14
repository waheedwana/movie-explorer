import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { MovieType } from "../types/movie";

interface FavoritesContextType {
  favorites: MovieType[];
  toggleFavorite: (movie: MovieType) => void;
  isFavorite: (id: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | null>(null);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<MovieType[]>([]);

  const toggleFavorite = (movie: MovieType) => {
    setFavorites((current) =>
      current.some((m) => m.id === movie.id)
        ? current.filter((m) => m.id !== movie.id)
        : [...current, movie],
    );
  };

  const isFavorite = (id: string) => favorites.some((movie) => movie.id === id);

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext)!;
}
