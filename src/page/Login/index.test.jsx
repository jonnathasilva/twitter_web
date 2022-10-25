import { describe, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import axios from "axios";

import { Login } from "./index";

vi.mock("react-router-dom", () => ({
  ...vi.importActual("react-router-dom"),
  useNavigate: () => vi.fn(),
  Link: () => vi.fn(),
}));

vi.mock("axios");

describe("Login", () => {
  it("Should axios", async () => {
    axios = vi.fn(() => Promise.resolve());

    const { getByPlaceholderText, getByText } = render(<Login />);

    const inputEmail = getByPlaceholderText("E-mail");
    const inputPassword = getByPlaceholderText("Senha");
    const button = getByText("Entrar");

    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(button).toBeInTheDocument();

    await userEvent.type(inputEmail, "teste012@gmail.com");
    await userEvent.type(inputPassword, "123");

    await userEvent.click(button);

    expect(axios).toHaveBeenCalledWith({
      method: "get",
      auth: { username: "teste012@gmail.com", password: "123" },
      baseURL: "http://localhost:3000",
      url: "/login",
    });
  });
});
