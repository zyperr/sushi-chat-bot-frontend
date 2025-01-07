import { NavLink } from "react-router"
import { routesHeader } from "../../routes/route"
import { UserSign } from "./UserSign"
import "../../style/components/header/header.css"
import { useUserContext } from "../../context/userProvider"

function Header() {
  const user = useUserContext()
  return (
    <header className="header">
        <h1 className="header__title">
          <NavLink to="/" className="header__title-link">
            SushiBot 🍣
          </NavLink>  
        </h1>
        <UserSign user={user} />
    </header>
  )
}

export default Header
