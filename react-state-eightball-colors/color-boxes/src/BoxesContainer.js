import React, { useState } from "react";
import Box from "./Box";
import "./BoxesContainer.css";
import { choice, randInt } from "./random";

const defaultColors = [
  "Aqua", "Black", "BlanchedAlmond", "Blue", "Chocolate", "DodgerBlue",
  "Lavender", "LawnGreen", "Peru", "Plum", "SpringGreen", "SteelBlue", "Tan",
  "Teal", "Thistle", "Tomato", "Turquoise", "Violet", "Yellow", "YellowGreen",
];

/** Container for a set of colored boxes.
 *
 * Props:
 * - numBoxes: number of boxes to manage
 * - allColors: array of random colors to choose from
 *
 * State:
 * - boxes: array of box color strings
 */

function BoxesContainer({ allColors = defaultColors, numBoxes = 16 }) {
  // Note: passes a function so this can only be called once at start
  const [boxes, setBoxes] = useState(getInitialRandomColors);

  /** Return an array of random colors. */
  function getInitialRandomColors() {
    return Array.from(
      { length: numBoxes },
      () => choice(allColors)
    );
  }

  /** On button click: pick a random box, change its color to a random color. */
  function handleClick() {
    setBoxes((prevBoxes) => {
      let idx = randInt(numBoxes);
      let boxCopy = [...prevBoxes];
      boxCopy[idx] = choice(allColors);
      return boxCopy;
    });
  }

  const boxComponents = boxes.map((color, i) => <Box key={i} color={color} />);

  return (
    <div>
      <section className="BoxesContainer">{boxComponents}</section>
      <button onClick={handleClick}>Change a Box</button>
    </div>
  );
}

export default BoxesContainer;
