import { useParams } from "react-router"
import { useEffect,useState } from "react";
import { useApiProduct } from "../hooks/useApiProduct";
import EditInput from "../components/EditProduct/EditInput";
import {useForm} from "react-hook-form"
import SubmitData from "../components/btn";
import SubmitFile from "../components/btn";
import EliminateProduct from "../components/btn"
import ErrorBar from "../components/ErrorBar";
import "../style/pages/EditProduct.css"

export const EditProduct = () => {
    const token = localStorage.getItem('user-token');
    if(!token) window.location.href = "/login";
    const {register:registerData,handleSubmit:handleSubmitData} = useForm(); 
    const {register:registerFile,handleSubmit:handleSubmitFile} = useForm(); 
    const params = useParams();
    const {getProduct,updateProduct,updateFile,deleteProduct} = useApiProduct();
    const [product, setProduct] = useState({});
    const [error,setError]= useState({type:"",message:""})
    
    useEffect(() => {
        const getData = async () => {
            const data = await getProduct(params.id);
            setProduct(data);
        };
        getData();

    }, []);
    const onSubmitData = async (data) => {
        if(isNaN(data.price)){
            data.price = product.price
        }
        if(isNaN(data.pieces)){
            data.pieces = product.pieces
        }
        if(data.name === undefined || data.name == ""){
            data.name = product.name
        }
        const dataUpdate = await updateProduct(params.id,data,token);
        if(dataUpdate.status !== 200) setError({type:"error",message:"Ocurrio un error editar el producto"});
        if(dataUpdate.status === 200) setError({type:"ok",message:"Producto editado exitosamente"});
        const timer = setTimeout(() => {
            setError({type:"",message:""})
            window.location.reload();
        },1500)
        return () => clearTimeout(timer)
    }
    const onSubmitFile = async (data) => {
        const formData = new FormData();
        formData.append('picture', data.picture[0]);

        const response = await updateFile(params.id,formData,token);
        if(response.status !== 200) setError({type:"error",message:"Ocurrio un error editar el producto"});
        if(response.status === 200) setError({type:"ok",message:"La imagen se actualizo exitosamente"});

        const timer = setTimeout(() => {
            setError({type:"",message:""})
            window.location.reload();
        },1500)
        return () => clearTimeout(timer)
    }
    const onDeleteProduct = async () => {
        const response = await deleteProduct(params.id,token);
        if(response.status !== 200) setError({type:"error",message:"Ocurrio un error eliminar el producto"});
        if(response.status === 200) setError({type:"ok",message:"Producto eliminado exitosamente, redirigiendo..."});
        const timer = setTimeout(() => {
            setError({type:"",message:""})
            window.location.href = "/dashboard";
        },1500)
        return () => clearTimeout(timer)
    }
  return (
    <section className="section__edit">
        <form className="form__edit" onSubmit={handleSubmitData(onSubmitData)}>
                <label className="form__edit-label" htmlFor="name">Product Name</label>
            <div className="form__edit-wrapper">

                <EditInput type="text" placeholder="Name" defaultValue={product.name} className="form__edit-input name" id="name" idl="name" {...registerData("name",{setValueAs: v => v || product.name})} />
            </div>
                <label className="form__edit-label" htmlFor="price">Product Price</label>
            <div className="form__edit-wrapper">
                <EditInput idl="price" type="number" placeholder="Price" defaultValue={product.price} className="form__edit-input price" id="price"  {...registerData("price",{valueAsNumber:true})}/>
            </div>
                <label className="form__edit-label" htmlFor="pieces">Product Pieces</label>
            <div className="form__edit-wrapper">
                <EditInput idl="pieces" type="number" placeholder="Pieces" defaultValue={product.pieces}  className="form__edit-input pieces" id="pieces"  {...registerData("pieces",{valueAsNumber:true})}/>
            </div>
            <SubmitData text="guardar datos" />
        </form>
        <form className="form__edit" onSubmit={handleSubmitFile(onSubmitFile)}>
            <label className="form__edit-label" htmlFor="picture">Product Picture</label>
                <div className="form__edit-wrapper">
                    <EditInput idl="picture" type="file"  accept="image/jpg, image/png image/jpeg image/webp" placeholder="Picture" className="form__edit-input picture" id="picture" {...registerFile("picture")}/>
                </div>
            <SubmitFile text="guardar imagen" />
        </form>
        <EliminateProduct text="eliminar producto" className="eliminate" onClick={onDeleteProduct} />
        <ErrorBar type={error.type} message={error.message}/>
    </section>
  )
}
