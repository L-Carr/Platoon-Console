import { createBrowserRouter } from "react-router-dom"
import App from './App';
import Homepage from './pages/Homepage'
import Login from "./pages/Login"

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
        ],
    }
]);

export default router;