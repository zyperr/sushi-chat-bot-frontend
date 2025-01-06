import { BrowserRouter, Routes, Route } from "react-router";
import Header from "./components/header/Header.jsx";
import { ChatBot } from "./pages/ChatBot.jsx";
import LoginPage from "./pages/Login.jsx"
import MenuPage from "./pages/Menu.jsx";
import RegisterPage from "./pages/Register.jsx"
function App() {

  return (
      <BrowserRouter>
          <Header/>
          <Routes>
              <Route path="/" element={<ChatBot />} />
              <Route path="/login" element={<LoginPage/>} />
              <Route path="/register" element={<RegisterPage/>} />
              <Route path="/bot" element={<ChatBot />} />
              <Route path="/menu" element={<MenuPage/>} />
          </Routes>
      </BrowserRouter>
  )
}

export default App
