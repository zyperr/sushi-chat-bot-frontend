import { userRoutes } from '../../routes/route'
import { NavLink } from 'react-router'
export const UserSign = ({user}) => {
    
  return (
        
    <div className="header__profile">
        {
            user ? (
                <>
                    <p className="header__profile-username">Username</p>
                    <picture className="header__profile-picture">
                    <img className="header__profile-default" src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="profile" />
                    </picture>
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
