
const saveToken = (token) => {
    const userToken = localStorage.getItem('user-token');
    if (userToken) {
        localStorage.removeItem('user-token')
        const res = localStorage.setItem('user-token', token);
        console.log(res)
    }else{
        const res = localStorage.setItem('user-token', token);
        console.log(res)
    }
} 

const url = "http://localhost:3000/v1"
const useApiUser = () => {
    const register = async (user) => {
        const {name,email,password} = user 
        try {
            const response = await fetch(`${url}/users/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                
                body: JSON.stringify({name,email,password}),
            })
            if(response.ok){
                const data = await response.json();
                return {
                    message:data.message,
                    status:response.status
                }
            }
            const error = await response.json();
            return {
                message:error.message,
                status:response.status
            }

        }catch(err){
            console.error(err);
        }
    }
    const login = async (user) => {
        const {name,password} = user
        try{
            const response = await fetch(`${url}/users/login`, {
                method: "POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body:JSON.stringify({name,password})
            }) 
            const data = await response.json();
            if(response.ok){
                saveToken(data?.token)
                return {
                    user:data,
                    status:response.status
                }
            }
            return {
                message:data.message,
                status:response.status
            }

        }catch(err){
            console.error(err);
        }
    }
    const getAuthUser = async  (token) => {
        try{
            const response = await fetch(`${url}/users/me`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })
            if(!response.ok){
                return {}
            }
            const data = await response.json();
            return data
        }catch(err){
            console.error(err);
        }
    }
    const logout = () => {
        localStorage.removeItem('user-token');
        const timer = setTimeout(() => {
            window.location.href = "/login";
        }, 3500);
        return () => clearTimeout(timer)
    }
    const getOrderAuthUser = async (token) => {
        try{
            const response = await fetch(`${url}/users/getOrders`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            })
            if(!response.ok){
                return {}
            }
            const data = await response.json();
            return data
            
        }catch(err){
            console.error(err);
        }
    }
    const chatBot = async ( userMessage,token,page) => {
        const a = {message:userMessage}
        console.log(JSON.stringify(a))
        const response = await fetch(`${url}/bot?page=${page}`, {
            method:"POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body:JSON.stringify(a)
        })
        const data = await response.json();
        console.log(data)
        return data
    }

    return {
        register,
        login,
        getAuthUser,
        getOrderAuthUser,
        logout,
        chatBot
    }
}


export {
    useApiUser
}


