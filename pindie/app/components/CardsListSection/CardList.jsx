import Styles from './CardsListSection.module.css'
import { Card } from '../Card/Card';
import Link from 'next/link';
import { Preloader } from '../Preloader/Preloader';

export const CardList = (props) => {
    return (
            <ul className={Styles["cards-list"]}>
                {props.data ? (
                    props.data.map((item) => (
                        <li className={Styles["cards-list__item"]} key={item.id}>
                            <Link href={`/games/${item.id}`} className={Styles["card-list__link"]}>
                                <Card {...item} />
                            </Link>
                        </li>
                    ))
                ) : (
                    <Preloader />
                )}
            </ul>
    );
};