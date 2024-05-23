"use client"

import { CardsListSection } from "../components/CardsListSection/CardsListSection";
import { endpoints } from '../api/config';
import { useGetDataByCategory } from '../api/api-hooks';

export default function New() {
    const popularGames = useGetDataByCategory(endpoints.games, "popular");
    return (
        <main className='main-inner'>
            <CardsListSection id='popular' title='Популярное' data={popularGames}/>
        </main>
    )
}