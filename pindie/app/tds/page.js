"use client"

import { CardsListSection } from "../components/CardsListSection/CardsListSection";
import { endpoints } from '../api/config';
import { useGetDataByCategory } from '../api/api-hooks';

export default function New() {
    const tdsGames = useGetDataByCategory(endpoints.games, "TDS");
    return (
        <main className='main-inner'>
            <CardsListSection id='tds' title='Top-Down Шутеры' data={tdsGames}/>
        </main>
    )
}