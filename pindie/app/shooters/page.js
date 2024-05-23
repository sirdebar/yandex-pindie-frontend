"use client"

import { CardsListSection } from "../components/CardsListSection/CardsListSection";
import { endpoints } from '../api/config';
import { useGetDataByCategory } from '../api/api-hooks';

export default function New() {
    const shooterGames = useGetDataByCategory(endpoints.games, "shooter");
    return (
        <main className='main-inner'>
            <CardsListSection id='shooter' title='Новинки' data={shooterGames}/>
        </main>
    )
}