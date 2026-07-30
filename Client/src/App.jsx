import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Inbox from "./pages/inbox";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Inbox />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App
