import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";

import { Home } from "./Home";
import { Login } from "./Login";
import { Signup } from "./Signup";
import { NotFound } from "./NotFound";
import { ProtectRoute } from "./protectRouter";

export const Router = () => {
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
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return <RouterProvider router={router} />;
};
