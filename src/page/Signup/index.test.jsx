import { describe, it, vi } from "vitest";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import axios from "axios";

import { Signup } from "./index";

vi.mock("react-router-dom", () => ({
  useNavigate: () => vi.fn(),
}));

vi.mock("axios");

describe("Page signup", () => {
  it("should send data to axios", async () => {
    axios = vi.fn(() => Promise.resolve());

    const { getByPlaceholderText, getByRole } = render(<Signup />);

    const inputName = getByPlaceholderText("Nome");
    const inputUserName = getByPlaceholderText("Nome de Usuário");
    const inputEmail = getByPlaceholderText("E-mail");
    const inputPassword = getByPlaceholderText("Senha");
    const buttonElement = getByRole("button");

    expect(inputName).toBeInTheDocument();
    expect(inputUserName).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();

    await userEvent.type(inputName, "jonnathan");
    await userEvent.type(inputUserName, "jonnathan");
    await userEvent.type(inputEmail, "test012@gmail.com");
    await userEvent.type(inputPassword, "123");
    await userEvent.click(buttonElement);

    expect(axios).toHaveBeenCalledWith({
      method: "post",
      data: {
        username: "jonnathan",
        name: "jonnathan",
        email: "test012@gmail.com",
        password: "123",
      },
      baseURL: "http://localhost:3000",
      url: "/signup",
    });
  });

  it("should redirect login", () => {
    const { getByRole } = render(<Signup />);

    const linkElement = getByRole("link");

    expect(linkElement).toHaveAttribute("href", "/login");
  });
});
