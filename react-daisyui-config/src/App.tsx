import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "../pages/Home"
import Ride from "../pages/Ride"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ride" element={<Ride />} />
      </Routes>
    </BrowserRouter>
  )
}
