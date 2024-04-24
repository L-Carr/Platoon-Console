import { createBrowserRouter } from "react-router-dom"
import App from './App';
import Homepage from './pages/Homepage'
import Login from "./pages/Login"
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
        ],
    }
]);

export default router;