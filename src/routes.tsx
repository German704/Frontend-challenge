import { createBrowserRouter } from "react-router-dom";
import Layout from "./layout/layout";
import AddProject from "./pages/add-project";
import UpdateProject from "./pages/update-project";
import Projects from "./pages/projects";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children: [
            {
                index: true,
                path: "/",
                element: <Projects/>,
            },
            {
                path: "/projects/create",
                element: <AddProject/>
            },
            {
                path: "/projects/update/:id",
                element: <UpdateProject/>
            },
        ],
    }
]);

export default routes;