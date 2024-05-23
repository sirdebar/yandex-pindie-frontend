"use client"

import { CardsListSection } from "../components/CardsListSection/CardsListSection";
import { useGetDataByCategory } from "../api/api-hooks";
import { endpoints } from '../api/config';

export default function New() {
    const runnerGames = useGetDataByCategory(endpoints.games, "runner");

    return (
        <main className='main-inner'>
            <CardsListSection id='runners' title='Раннеры' data={runnerGames}/>
        </main>
    )
}