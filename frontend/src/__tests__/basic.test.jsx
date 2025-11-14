// src/__tests__/basic.test.jsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../App.jsx";

describe("MoviePsychic App", () => {
  it("renders the main prompt text", () => {
    render(<App />);
    // Adjust this text if your SpeechBubble text changed
    expect(
      screen.getByText(/Pick a card, and I will reveal your fate/i)
    ).toBeInTheDocument();
  });
});
