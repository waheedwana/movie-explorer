# Movie Explorer

A movie discovery application built with React, TypeScript and the OMDb API.

Users can search for movies, view detailed information, browse featured films and save favorites.

## Features

* Search movies by title
* View movie details
* Browse featured movies
* Add and remove favorites
* Responsive design
* Loading and error states
* Reusable components
* Client-side routing

## Tech Stack

* React
* TypeScript
* Vite
* React Router
* CSS
* OMDb API

## Project Structure

```text
src/
├── components/
│   ├── EmptyState.tsx
│   ├── ErrorMessage.tsx
│   ├── Featured.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── Loading.tsx
│   ├── MovieCard.tsx
│   ├── MovieGrid.tsx
│   └── SearchBar.tsx
├── context/
│   └── FavoritesContext.tsx
├── hooks/
│   ├── useDebounce.ts
│   └── useFetch.ts
├── pages/
│   ├── About.tsx
│   ├── Favorites.tsx
│   ├── Home.tsx
│   ├── MovieDetails.tsx
│   └── Movies.tsx
├── services/
│   └── movieApi.ts
├── types/
│   └── movie.ts
├── App.tsx
├── App.css
├── config.ts
├── index.css
└── main.tsx
```

## Getting Started

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

## API

Movie data is provided by the [OMDb API](https://www.omdbapi.com/).

## Favorites

Favorites are managed using React Context and `useState`.

Favorites are stored in memory and reset when the page is refreshed.

## What I Practiced

* React and TypeScript
* React Router
* API integration
* Custom hooks
* React Context
* State management
* Debounced search
* Reusable components
* Loading and error handling
* Responsive design

## Live Demo

Coming soon.

## Author

Waheedullah

Built as a frontend development practice project.
