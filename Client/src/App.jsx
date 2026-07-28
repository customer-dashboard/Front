import { useState } from 'react'
import './App.css'
import Inbox from "./pages/inbox";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Inbox />
    </>
  )
}

export default App
