import { describe, it } from "vitest";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Input } from "./index";

describe("Input Components", () => {
  it("should get props", async () => {
    const { getByPlaceholderText } = render(
      <Input type="text" name="email" placeholder="E-mail" disabled={true} />
    );

    const inputElement = getByPlaceholderText("E-mail");

    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toBeDisabled();
  });

  it("should send false props", () => {
    const { getByPlaceholderText } = render(
      <Input type="text" name="email" placeholder="E-mail" disabled={false} />
    );

    const inputElement = getByPlaceholderText("E-mail");

    expect(inputElement).not.toBeDisabled();
  });
});
