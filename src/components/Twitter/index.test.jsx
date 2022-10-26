import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import { Twitter } from "./index";

describe("Twitter components", () => {
  it("should get information in params", () => {
    const { getByText, getByRole } = render(
      <Twitter
        name="Jonnathan"
        username="Jonnathan"
        key={1}
        avatar="avatar.png"
        children="hello world"
      />
    );

    expect(getByText("Jonnathan")).toBeInTheDocument();
    expect(getByText("@Jonnathan")).toBeInTheDocument();
    expect(getByText("hello world")).toBeInTheDocument();
    expect(getByRole("img")).toHaveAttribute("src", "./imgs/avatar.png");
    expect(getByRole("img")).toHaveAttribute("alt", "avatar");
  });
});
