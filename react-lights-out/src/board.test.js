import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Board from "./Board";

describe("Board Component Tests", () => {
  test("renders successfully without crashing", () => {
    render(<Board />);
    // No need for explicit assertions, if it renders without crashing, the test passes
  });

  test("matches snapshot for a fully lit board", () => {
    const { asFragment } = render(<Board chanceLightStartsOn={1} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test("displays 'You Win!' when lights are initially out", () => {
    const { getByText } = render(<Board chanceLightStartsOn={0} />);
    expect(getByText("You Win!")).toBeInTheDocument();
  });

  describe("Cell Click Tests", () => {
    test("correctly toggles lights on cell click", () => {
      const { getAllByRole } = render(<Board nrows={3} ncols={3} chanceLightStartsOn={1} />);
      const cells = getAllByRole("button");

      cells.forEach(cell => {
        expect(cell).toHaveClass("Cell-lit");
      });

      fireEvent.click(cells[4]);

      const litIndices = [0, 2, 6, 8];
      cells.forEach((cell, idx) => {
        expect(cell).toHaveClass(litIndices.includes(idx) ? "Cell-lit" : "Cell");
      });
    });

    test("displays 'You Win!' when the board is clicked and game is won", () => {
      const { queryByText, getAllByRole } = render(<Board nrows={1} ncols={3} chanceLightStartsOn={1} />);

      expect(queryByText("You Win!")).not.toBeInTheDocument();

      const cells = getAllByRole("button");
      fireEvent.click(cells[1]);

      expect(queryByText("You Win!")).toBeInTheDocument();
    });
  });
});
