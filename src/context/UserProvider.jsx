import React,{useEffect, useState,useContext} from 'react'
import { useApiUser } from "../hooks/useApiUser";

const UserContext = React.createContext({})

export const useUserContext = () => useContext(UserContext)

const isTokenExpired = (token) => {
  const decodedToken = JSON.parse(atob(token.split('.')[1]));
  const now = Math.floor(Date.now() / 1000);
  if (decodedToken.exp < now) {
    localStorage.removeItem('user-token');
    return true
  }  
}

function UserProvider({children}) {
  const [user, setUser] = useState(null)
  const {getAuthUser} = useApiUser()
  const token = localStorage.getItem('user-token');
  useEffect(() => {
    const getData = async () => {
      if(!token) return
      if(isTokenExpired(token)) return
      const data = await getAuthUser(token);
      setUser(data);
    }
    getData()
  }, [token]);
  return (
    <UserContext.Provider value={user}>
        {children}
    </UserContext.Provider>
  )
}

export default UserProvider