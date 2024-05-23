"use client"

import { CardsListSection } from "../components/CardsListSection/CardsListSection";
import { endpoints } from '../api/config';
import { useGetDataByCategory } from '../api/api-hooks';

export default function New() {
    const pixelGames = useGetDataByCategory(endpoints.games, "pixel");
    return (
        <main className='main-inner'>
            <CardsListSection id='pixel-game' title='Пиксельные игры' data={pixelGames}/>
        </main>
    )
}