import { useApiUser } from "../hooks/useApiUser"
import { useEffect, useState } from "react"
import { FaRegCopy } from "react-icons/fa";

import "../style/pages/Orders.css"
const Orders = () => {
  const {getOrderAuthUser} = useApiUser()
  const [orders, setOrders] = useState([])
  const token = localStorage.getItem('user-token');
  if(!token) {
    window.location.href = "/login";
  }
  useEffect(() => {
    const getData = async () => {
      const data = await getOrderAuthUser(token);
      setOrders(data.orders)
    }
    getData()
  }, [])
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
  }
  return (
    <section className="orders">
      <div className="orders__container">
        {
          orders.length === 0 ? (
            <p className="orders__empty">No tienes ningun pedido</p>
          ) :            orders.map((item) => {
            return (
              <div key={item._id} className="orders__item">
                <h2 className="orders__item-item date">Fecha: {item.date}</h2>
                <p className="orders__item-item total">Total: {item.total}</p>
                <p className="orders__item-item id">ID de usuario : {item.userId}</p>
                <p className="orders__item-item id">ID de pedido: {item._id} <FaRegCopy className="copy-icon" onClick={() => copyToClipboard(item._id)}/></p>
                {
                  item.products.map((product) => {
                    return (
                      <footer key={product.productId} className="orders__item-detail">
                        
                        <p className="orders__item-detail id">ID del Producto: {product.productId}</p>
                        <p className="orders__item-detail quantity">Cantidad: {product.quantity}</p>
                        <p className="orders__item-detail subtotal">Subtotal: {product.subtotal}</p>
                        <p className={`orders__item-detail state`}>Estado: {item.state}</p>
                      </footer>
                    )
                  })
                }
              </div>
            )
          }) 
        }

        
      </div>
    </section>
  )
}

export default Orders
