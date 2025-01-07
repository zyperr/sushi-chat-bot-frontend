import {useEffect, useState}from 'react'
import CardProduct from '../components/menu/CardProduct'
import { useApiProduct } from '../hooks/useApiProduct'
import { NavLink } from "react-router"
import "../style/pages/dashboard.css"
const DashBoard = () => {
  const {getProducts} = useApiProduct();
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem('user-token');
  if(!token){
    window.location.href = "/login";
  }
  useEffect(() => {
    const getData = async () => {
      const {data} = await getProducts();
      console.log(data)
      setProducts(data);
    };
    getData();
  }, []);
  console.log(products)
  return (
    <section className='dashboard'>
      <div className='dashboard__container'>
        {
          products.length > 0 ? (
            products.map((product) => (
              <div key={product._id} className='dashboard__item-container'>
                <NavLink to={`/admin/product/${product._id}`} className="dashboard__item-link">
                  <CardProduct
                    name={product.name}
                    picture={product.picture}
                    price={product.price}
                    pieces={product.pieces}
                  />
                </NavLink>
              </div>
            ))
          ) : (
            <p>Cargando...</p>
          )
        }
      </div>
    </section>
  )
}

export default DashBoard
