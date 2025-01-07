import { BrowserRouter, Routes, Route, NavLink } from "react-router";
import Header from "./components/header/Header.jsx";
import { ChatBot } from "./pages/ChatBot.jsx";
import LoginPage from "./pages/Login.jsx"
import MenuPage from "./pages/Menu.jsx";
import RegisterPage from "./pages/Register.jsx"
import { useUserContext } from "./context/userProvider.jsx";
import { LogOut } from "./pages/LogOut.jsx";
import Orders from "./pages/Orders.jsx"
import NotFound from "./pages/NotFound.jsx";
import DashBoard from "./pages/DashBoard.jsx";
function App() {
    const user = useUserContext()
  return (
      <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/" element={<ChatBot userData={user}/>} />
                <Route path="/login" element={<LoginPage/>} />
                <Route path="/register" element={<RegisterPage/>} />
                <Route path="/menu" element={<MenuPage/>} />
                <Route path="/logout" element={<LogOut/>} />
                <Route path="/orders" element={<Orders/>}/>
                <Route path="*" element={<NotFound/>} />
                {
                    user?.role === "admin" &&  (
                        <Route path="/admin" element={<DashBoard/>} />
                    )
                }
            </Routes>
      </BrowserRouter>
  )
}

export default App
