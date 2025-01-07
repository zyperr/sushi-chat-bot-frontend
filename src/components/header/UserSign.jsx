import { userRoutes } from '../../routes/route'
import { NavLink } from 'react-router'
import { useState } from 'react'
import { RiArrowDropDownLine } from "react-icons/ri";

export const UserSign = ({user}) => {
    const [showDropdown, setShowDropdown] = useState(false)
    const toggleDropdown = () => {
        setShowDropdown(!showDropdown)
    }
  return (
        
    <div className="header__profile">
        {
            user ? (
                <>
                    <p className="header__profile-username">{user.name}</p>
                    <picture className="header__profile-picture">
                    <img className="header__profile-default" src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="profile" />
                    </picture>
                    <RiArrowDropDownLine className='header__profile-dropdown-icon' onClick={toggleDropdown}/>
                    <div className={ showDropdown ? 'header__profile-dropdown active' : 'header__profile-dropdown'}>
                        <ul className='header__profile-dropdown-list'>
                            <li className='header__profile-dropdown-item'>
                                <NavLink to="/orders" className="header__profile-dropdown-link">Pedidos</NavLink>
                            </li>
                            <li className='header__profile-dropdown-item'>
                                <NavLink to="/logout" className="header__profile-dropdown-link">Cerrar sesion</NavLink>
                            </li>
                            {
                                user?.role === 'admin' && (
                                    <li className='header__profile-dropdown-item'>
                                        <NavLink to="/admin" className="header__profile-dropdown-link">Admin</NavLink>
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                </>
            ) : (
                <>
                    {
                        userRoutes.map((route) => (
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
                </>
            )
        }
    </div>
  )
}
