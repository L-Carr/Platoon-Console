import { createBrowserRouter } from "react-router-dom";
import App from './App';
import VideoGallery from "./pages/VideoGallery";
import ChangePassword from "./pages/ChangePassword";
import ErrorPage from "./pages/Errorpage";
import ForgotPassword from "./pages/ForgotPassword";
import Homepage from './pages/Homepage';
import Login from "./pages/Login";
import Register from "./pages/Register";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <Homepage />,
            },
            {
                path: "login/",
                element: <Login />,
            },
            {
                path: "register/",
                element: <Register />,
            },
            {
                path: "forgot-password/",
                element: <ForgotPassword />,
            },
            {
                path: "change-password/:uuid64/:token/",
                element: <ChangePassword />,
            },
            {
                path: "videos/",
                element: <VideoGallery />,
            },
        ],
    },
    {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;
