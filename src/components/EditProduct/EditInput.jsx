import { useState,forwardRef } from 'react'
import { MdEdit } from "react-icons/md";
import "../../style/components/editProduct/editInput.css"
const EditInput = forwardRef(({type,idl,...rest},ref) => {
    const [edit,setEdit] = useState(false)
    const handleEdit = () => {
        setEdit(!edit)
    }
  return (
    <>
        <input type={type} disabled={!edit} {...rest} ref={ref} autoComplete='on'/>
        <label id={idl} className='edit-icon'><MdEdit  onClick={handleEdit} /></label>
    </>
  )
})

export default EditInput