"use client"

import React from "react";
import { Banner } from "./components/Banner/Banner";
import { Promo } from "./components/Promo/Promo";
import { endpoints } from "./api/config";
import { CardsListSection } from "./components/CardsListSection/CardsListSection";
import { useGetDataByCategory } from "./api/api-hooks";
import { Preloader } from "./components/Preloader/Preloader";

export default function Home() {
  const popularGames = useGetDataByCategory(endpoints.games, "popular");
  const newGames = useGetDataByCategory(endpoints.games, "new");

  return (
    <main className="main">
      <Banner />
      {popularGames === null || newGames === null ? (
        <Preloader /> 
      ) : (
        <>
          <CardsListSection type="slider" id="popular" title="Популярные" data={popularGames} />
          <CardsListSection type="slider" id="new" title="Новинки" data={newGames} />
          <Promo />
        </>
      )}
    </main>
  );
}
