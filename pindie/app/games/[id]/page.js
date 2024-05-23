"use client";

import { GameNotFound } from "@/app/components/GameNotFound/GameNotFound";
import React, { useState, useEffect } from "react";
import Styles from "./Game.module.css";
import { endpoints } from "@/app/api/config";
import {
  isResponseOk,
  getNormalizedGamesDataById,
  checkIfUserVoted,
  vote,
} from "@/app/api/api-utils";
import { Preloader } from "@/app/components/Preloader/Preloader";
import { useStore } from "@/app/store/app-store";

export default function GamePage(props) {
  const [currGame, setCurrGame] = useState(null);
  const [preloaderVisible, setPreloaderVisible] = useState(true);
  const [isVoted, setIsVoted] = useState(false);

  const authContext = useStore();

  useEffect(() => {
    async function fetchData() {
        setPreloaderVisible(true);
      const game = await getNormalizedGamesDataById(
        endpoints.games,
        props.params.id
      );
      isResponseOk(game) ? setCurrGame(game) : setCurrGame(null);
      setPreloaderVisible(false);
    }
    fetchData();
  }, []);

  useEffect(() => {
    authContext.user && currGame ? setIsVoted(checkIfUserVoted(currGame, authContext.user.id)) : setIsVoted(false);
}, [authContext.user, currGame]); 

const handleVote = async () => {
  const jwt = authContext.token; 
  let usersIdArray = currGame.users.length ? currGame.users.map((user) => user.id) : [];
  usersIdArray.push(authContext.user.id); 
  const response = await vote(
    `${endpoints.games}/${currGame.id}`, 
    jwt,
    usersIdArray
  );
  if (isResponseOk(response)) {
    setCurrGame((prevGame) => {
      return {
        ...prevGame, 
        users: [...prevGame.users, authContext.user],
      };
    });
    setIsVoted(true);
  }
};

  return (
    <main className="main">
      {currGame ? (
        <section className={Styles["game"]}>
          <iframe
            className={Styles["game__iframe"]}
            src={currGame.link}
            title={currGame.title}
          ></iframe>
          <section className={Styles["about"]}>
            <h2 className={Styles["about__title"]}>{currGame.title}</h2>
            <div className={Styles["about__content"]}>
              <p className={Styles["about__description"]}>
                {currGame.description}
              </p>
              <div className={Styles["about__author"]}>
                <p>
                  Автор:
                  <span className={Styles["about__accent"]}>
                    {currGame.developer}
                  </span>
                </p>
              </div>
            </div>
            <div className={Styles["about__vote"]}>
              <p className={Styles["about__vote-amount"]}>
                За игру уже проголосовали:
                <span className={Styles["about__accent"]}>{currGame.users.length}</span>
              </p>
              <button
                disabled={!authContext.isAuth || isVoted}
                className={`button ${Styles["about__vote-button"]}`}
                onClick={handleVote}
              >
                {isVoted ? "Голос учтён!" : "Голосовать"}
              </button>
            </div>
          </section>
        </section>
      ) : preloaderVisible ? (
        <Preloader />
      ) : (
        <GameNotFound />
      )}
    </main>
  );
}

