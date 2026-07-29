import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Inbox from "./pages/inbox";
import Conversation from './pages/conversation'; // The page created in Step 1

const router = createBrowserRouter([
  {
    path: "/",
    element: <Inbox />,
  },
  {
    path: "/conversation",
    element: <Conversation />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App
