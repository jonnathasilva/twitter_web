import { useState } from "react";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";

import { Home } from "./Home";
import { Login } from "./Login";
import { Signup } from "./Signup";
import { ProtectRoute } from "./protectRouter";

export const Router = () => {
  const [user, setUser] = useState();

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectRoute>
          <Home />
        </ProtectRoute>
      ),
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
  ]);

  return <RouterProvider router={router} />;
};
