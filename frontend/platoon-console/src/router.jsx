import { createBrowserRouter } from "react-router-dom";
import App from './App';
import ChangePassword from "./pages/ChangePassword";
import ErrorPage from "./pages/Errorpage";
import ForgotPassword from "./pages/ForgotPassword";
import GroupProgramming from "./pages/GroupProgramming";
import Homepage from './pages/Homepage';
import Login from "./pages/Login";
import Register from "./pages/Register";
import VideoGallery from "./pages/VideoGallery";
import RollCallPage from "./pages/RollCallPage";

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
        path: "change-password/:uidb64/:token/",
        element: <ChangePassword />,
      },
      {
        path: "videos/",
        element: <VideoGallery />,
      },
      {
        path: "groups/",
        element: <GroupProgramming />,
      },
      {
        path: "rollcall/",
        element: <RollCallPage />,
      },
    ],
  },

  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;

// Group 1: Sarah Taylor, Margaret Johnson, Lisa Wilson
// Group 2: Patricia Thomas, William Perez, James Lopez
// Group 3: John Sanchez, Mary Miller, Michael Martinez
// Group 4: Christopher Lewis, Elizabeth Rodriguez, Susan Garcia
// Group 5: Barbara Jones, Robert Clark, Linda Harris
// Group 6: Nancy Williams, Charles Hernandez, Karen Martin
// Group 7: Betty Brown, Richard Moore, Matthew Lee
// Group 8: Daniel Thompson, Sandra Jackson, Anthony Anderson
// Group 9: Mark Davis, Jennifer Smith, Joseph Gonzalez
// Group 10: Thomas Robinson, Jessica White, David Ramirez
