import { forwardRef } from "react"
const Btn = forwardRef(({text,...rest},ref) => {
  return (
        <button  {...rest} ref={ref}>{text}</button>
  )
})


export default Btn