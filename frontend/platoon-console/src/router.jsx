import { createBrowserRouter } from "react-router-dom"
import App from './App';
import Homepage from './pages/Homepage'
import Login from "./pages/Login"
import Register from "./pages/Register";
import ErrorPage from "./pages/Errorpage";
import GoogleApiInitializer from "./components/Calendar";

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
            }
        ],
    },
    {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;
