import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../App.jsx";

test("renders without crashing", () => {
  render(<App />);
  expect(screen.getByText(/Pick a card/i)).toBeInTheDocument();
});
