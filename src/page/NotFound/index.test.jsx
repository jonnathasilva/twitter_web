import { describe, it } from "vitest";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import { NotFound } from "./index";

describe("Page not found 404", () => {
  it("should Redirect home", async () => {
    const { getByText } = render(<NotFound />);

    const linkElement = getByText("Página inicial");

    expect(linkElement).toHaveAttribute("href", "/");
  });

  it("should get img", () => {
    const { getByRole } = render(<NotFound />);

    const imgElement = getByRole("img");

    expect(imgElement).toHaveAttribute("src", "./imgs/logo.svg");
  });
});
