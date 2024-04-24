import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./components/register";
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
  ]);

  return <RouterProvider router={router} />;
}

export default App;
