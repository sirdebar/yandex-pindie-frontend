"use client"


import Styles from './Promo.module.css'
import React, { useState, useEffect } from 'react';

export const Promo = () => {
    const [codeIsVisible, setCodeIsVisible] = useState(false);

    const handleButtonClick = () => {
        setCodeIsVisible(!codeIsVisible);
        if (!codeIsVisible) {
            copyPromoCodeToClipboard();
        }
    };


    const copyPromoCodeToClipboard = () => {
        const promoCode = 'WEBTEENS10';
        navigator.clipboard.writeText(promoCode)
            .then(() => {
                alert('Промокод скопирован в буфер обмена: ', promoCode);
            })
            .catch((err) => {
                alert('Не удалось скопировать промокод: ', err);
            });
    };

    useEffect(() => {
        let timeout;
        if (codeIsVisible) {
            timeout = setTimeout(() => {
                setCodeIsVisible(false);
            }, 5000)
        }

        return () => {
            clearTimeout(timeout);
        }
    }, [codeIsVisible]);

  return (
    <section className={Styles.promo}>
    <div className={Styles['promo__description-block']}>
        <h2 className={Styles.promo__title}>Твой промо-код</h2>
        <p className={Styles.promo__description}>Скидка на все курсы Яндекс Практикума для пользователей нашего сайта!</p>
        <button className={`${Styles.button} ${Styles.promo__button}`} onClick={handleButtonClick}>
            {codeIsVisible ? <span className={Styles["promo-code"]}>WEBTEENS10</span> : 'Получить код'}
        </button>
    </div>
    <img src="/images/promo-illustration.svg" alt="Собака" className={Styles.promo__image} />
</section>
);
};