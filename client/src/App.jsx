import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Register from './components/Register';
import { VideoRoom } from "./components/VideoRoom";
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
    {
      path: "/room",
      element: (
        <>
          <Navbar />
          <Home />
          <VideoRoom/>
        </>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
