import "../style/components/ErrorBar.css"
const ErrorBar = ({message="",type=""}) => {
  return (
    <div className={`error-bar ${type}`}>
        <p className='error-bar__message'>{message}</p>
    </div>
  )
}

export default ErrorBar