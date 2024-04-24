import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./components/register";
import Login from "./components/login";
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
  ]);

  return <RouterProvider router={router} />;
}

export default App;
