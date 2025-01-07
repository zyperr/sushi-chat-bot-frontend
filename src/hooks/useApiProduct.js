const url = "http://localhost:3000/v1";
const useApiProduct = () => {
    const getProducts = async () => {
        try {
            const response = await fetch(`${url}/products`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            if (!data) {
                throw new Error('No data found');
            }
            return data;
        } catch (err) {
            console.error('Error fetching products:', err);
            return null;
        }
    }
    const getProduct = async (id) => {
        try{
            const response = await fetch(`${url}/products/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            if (!data) {
                throw new Error('No data found');
            }
            return data;
        }catch(err){

        }
    }

    const updateProduct = async (id,data,token) => {
        const response = await fetch(`${url}/products/admin/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body:JSON.stringify(data)
        })
        const dataResponse = await response.json();
        return {...dataResponse,status:response.status}
    }
    const updateFile = async (id,file,token) => {
        console.log(file)
        const response = await fetch(`${url}/products/admin/${id}`,{
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body:file
        })

        const data = await response.json();

        return {...data,status:response.status}
    }
    const deleteProduct = async (id,token) => {
        const response = await fetch(`${url}/products/admin/${id}`,{
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        const data = await response.json();
        return {...data,status:response.status}
    }
    return {
        getProducts,
        getProduct,
        updateProduct,
        updateFile,
        deleteProduct
    }
}

export {
    useApiProduct
}