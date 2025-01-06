import { NavLink } from "react-router"
import { routesHeader } from "../../routes/route"
import { UserSign } from "./UserSign"
import "../../style/components/header/header.css"

function Header() {
  return (
    <header className="header">
        <h1 className="header__title">
          <NavLink to="/" className="header__title-link">
            SushiBot 🍣
          </NavLink>  
        </h1>
        <nav className="header__nav">
          <ul className="header__nav-list">
          {
              routesHeader.map((route) => (
                <li className="header__nav-item" key={route.pathname}>
                  <NavLink
                      to={route.path}
                      className="header__nav-Item-link"
                  >
                      {route.pathname}
                  </NavLink>
                </li>
              ))
          }
          </ul>
        </nav>
        <UserSign />
    </header>
  )
}

export default Header
