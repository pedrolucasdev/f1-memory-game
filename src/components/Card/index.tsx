import React from "react";
import { DriverCard } from "../../data/driver";
import "./style.css";

interface CardProps {
  driver: DriverCard;
  index: number;
  handleChoice: Function;
  flipped: boolean;
  disabled: boolean;
}

function Card(props: CardProps) {
  const { driver, index, handleChoice, flipped, disabled } = props;

  const handleClick = () => {
    if (!disabled) {
      handleChoice(index);
    }
  };

  return (
    <div className="card-container" onClick={() => handleClick()}>
      <div className="card">
        <div
          className={flipped ? "flipped" : ""}
          style={{ height: "100%", width: "100%" }}
        >
          <div
            className="front"
            style={{
              backgroundImage:
                "url(https://pedrolucasdev.github.io/f1-memory-game/images/" +
                driver.name +
                ".jpg)",
            }}
          ></div>
          <div
            className="back"
            style={{
              backgroundImage:
                "url(https://i.pinimg.com/originals/bf/de/9c/bfde9cdc72cf1b9935db50fea22506e3.png)",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default Card;
