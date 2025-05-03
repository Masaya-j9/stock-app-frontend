import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";
import Home from "../../pages/index";
import React from "react";


describe("Home Component", () => {
  it('renders the heading with "Hello World"', () => {
    render(<Home />);
    const heading = screen.getByText("Hello World");
    expect(heading).toBeInTheDocument();
  });

  it('renders a button with "Click Me"', () => {
    render(<Home />);
    const button = screen.getByText("Click Me");
    expect(button).toBeInTheDocument();
  });
});
