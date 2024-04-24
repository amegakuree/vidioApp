import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./components/register";
import Login from "./components/login";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
function App() {
  const router = createBrowserRouter([
    {
      path: "/register",
      element: (
        <>
          <Register />
        </>
      ),
    },
    {
      path: "/",
      element: (
        <>
          <Login />
        </>
      ),
    },
    {
      path: "/home",
      element: (
        <>
          <Navbar />
          <Home />
        </>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
