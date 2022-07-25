import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { shuffle } from "./utils/utils";
import { DriverCard } from "./data/driver";
import Card from "./components/Card";

const DRIVERS_SET: DriverCard[] = [
  { name: "max", matched: false },
  { name: "perez", matched: false },
  { name: "hamilton", matched: false },
  { name: "george", matched: false },
  { name: "norris", matched: false },
  { name: "daniel", matched: false },
  { name: "leclerc", matched: false },
  { name: "sainz", matched: false },
];

function App() {
  const initialDrivers: DriverCard[] = [];
  const [drivers, setDrivers] = useState(initialDrivers);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(-1);
  const [choiceTwo, setChoiceTwo] = useState(-1);
  const [disabled, setDisabled] = useState(false);
  const [initingGame, setInitingGame] = useState(false);

  useEffect(() => {
    if (choiceOne === -1 || choiceTwo === -1) {
      return;
    }

    setDisabled(true);

    if (drivers[choiceOne].name === drivers[choiceTwo].name) {
      setDrivers((previousDrivers: DriverCard[]) => {
        return previousDrivers.map((driver) => {
          if (drivers[choiceOne].name == driver.name) {
            return { ...driver, matched: true };
          }
          return driver;
        });
      });
      resetTurn();
    } else {
      setTimeout(() => resetTurn(), 1000);
    }
  }, [choiceOne, choiceTwo]);

  useEffect(() => {
    setInitialDriversSet(false);
  }, []);

  const handleChoice = (cardIndex: number) => {
    choiceOne === -1 ? setChoiceOne(cardIndex) : setChoiceTwo(cardIndex);
    console.log(choiceOne);
    console.log(choiceTwo);
  };

  const resetTurn = () => {
    setChoiceOne(-1);
    setChoiceTwo(-1);
    setTurns((previousTurns) => previousTurns + 1);
    setDisabled(false);
  };

  const setInitialDriversSet = (isNewGame: boolean) => {
    if (isNewGame) {
      setInitingGame(true);
      setTimeout(() => {
        setChoiceOne(-1);
        setChoiceTwo(-1);
        const _drivers = [...DRIVERS_SET, ...DRIVERS_SET];
        const _shuffled = shuffle(_drivers) as DriverCard[];
        setDrivers(_shuffled);
        setTurns(0);
        setInitingGame(false);
      }, 500);
    } else {
      setChoiceOne(-1);
      setChoiceTwo(-1);
      const _drivers = [...DRIVERS_SET, ...DRIVERS_SET];
      const _shuffled = shuffle(_drivers) as DriverCard[];
      setTurns(0);
      setDrivers(_shuffled);
    }
  };

  return (
    <div className="App">
      <div className="game__container__wrapper">
        <div className="header">
          <div className="title">F1 Memory Game</div>
          <div className="header-wrapper">
            <button
              className="new-game"
              onClick={() => setInitialDriversSet(true)}
            >
              New Game
            </button>
            <div className="turns">
              {turns} {turns === 1 ? "move" : "moves"}
            </div>
          </div>
        </div>
        <div className="game__container">
          {drivers.map((driver: DriverCard, index: number) => {
            return (
              <Card
                disabled={disabled}
                driver={driver}
                index={index}
                handleChoice={handleChoice}
                key={index}
                flipped={
                  (index === choiceOne ||
                    index === choiceTwo ||
                    driver.matched) &&
                  !initingGame
                }
              ></Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
