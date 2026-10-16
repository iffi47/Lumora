import { createContext, useContext, useState } from "react";
const FavoritesContext = createContext({
 favorites: [],
 toggleFavorite: () => {},
});
export function FavoritesProvider({ children }) {
 const [favorites, setFavorites] = useState(() => {
  try {
   const value = JSON.parse(localStorage.getItem("lumora-favorites") || "[]");
   return Array.isArray(value) ? value : [];
  } catch {
   return [];
  }
 });
 const toggleFavorite = (id) =>
  setFavorites((previous) => {
   const next = previous.includes(id)
    ? previous.filter((item) => item !== id)
    : [...previous, id];
   try {
    localStorage.setItem("lumora-favorites", JSON.stringify(next));
   } catch {}
   return next;
  });
 return (
  <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
   {children}
  </FavoritesContext.Provider>
 );
}
export const useFavorites = () => useContext(FavoritesContext);
