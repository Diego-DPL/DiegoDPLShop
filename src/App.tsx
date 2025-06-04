import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import './App.css'
import Header from "./components/layout/header"
import Footer from "./components/layout/footer"
import About from "./pages/About"

function App() {

  return (
    <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-me" element={<About />} />
        </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
