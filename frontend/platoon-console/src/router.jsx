import { createBrowserRouter } from "react-router-dom";
import App from './App';
import Homepage from './pages/Homepage';
import Login from "./pages/Login";
import Register from "./pages/Register";
import ErrorPage from "./pages/ErrorPage";
import GoogleApiInitializer from "./components/Calendar";
import ForgotPassword from "./pages/ForgotPassword";
import ChangePassword from "./pages/ChangePassword";

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
                path: "google-calendar/",
                element: <GoogleApiInitializer />,
            },
            {
                path: "forgot-password/",
                element: <ForgotPassword />,
            },
            {
                path: "change-password/:uuid64/:token/",
                element: <ChangePassword />,
            },
        ],
    },
    {
        path: "*",
        element: <ErrorPage />,
    },
]);

export default router;