import React, { createContext, useState } from 'react';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Adiciona favorito, se já existir não adiciona duplicado
  const addFavorite = (favorite) => {
    setFavorites((current) => {
      if (current.find((f) => f.carName === favorite.carName)) {
        return current;
      }
      return [...current, favorite];
    });
  };

  // Remove favorito pelo nome do carro
  const removeFavorite = (carName) => {
    setFavorites((current) => current.filter((f) => f.carName !== carName));
  };

  // Verifica se o carro está nos favoritos
  const isFavorite = (carName) => {
    return favorites.some((f) => f.carName === carName);
  };

  // Atualiza os dados do favorito pelo ID (ou pelo carName como fallback)
  const updateFavorite = (updatedFavorite) => {
    setFavorites((current) =>
      current.map((fav) =>
        fav.id === updatedFavorite.id || fav.carName === updatedFavorite.carName
          ? { ...fav, ...updatedFavorite }
          : fav
      )
    );
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        updateFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
