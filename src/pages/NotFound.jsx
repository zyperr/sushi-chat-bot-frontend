import "../style/pages/NotFound.css"
const NotFound = () => {
  return (
    <section className='not-found__container'>
        <div className="not-found-content">
            <h1 className='not-found'>404</h1>
            <p>Página no encontrada <a className='link' href='/'>Has clic aqui para regresar</a></p>
        </div>
    </section>
  )
}

export default NotFound
