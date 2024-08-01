import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../RootLayout";
import Home from "../Pages/Home";

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            {
                path: '', // This will be the default child route
                element: <Home />
            }
        ]
    }
]);

export default router;
