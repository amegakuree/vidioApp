import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./component/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { VideoRoom } from "./components/VideoPlayer";
import Register from './components/Register';
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
          <VideoRoom />
        </>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
