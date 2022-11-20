import { useState, useEffect } from "react"
import { getByIdProducto } from "../Config/PizzaService";
import { useParams } from "react-router-dom";
import { set } from "react-hook-form";
import AlertCustom from "./AlertCostum";


function Detalle() {
    const [producto,setProducto] = useState([])
    const { id } = useParams()
    const [alert,setAlert] = useState({variant:'',text:''})
    console.log(id)

    const ConsumirDatos = async() => {
    const respuesta = await getByIdProducto(id)
    console.log(respuesta.data())
    setProducto(respuesta.data())
    
  }
    
  useEffect (() => {
    ConsumirDatos()
  },[])

  const handleBuy = async () =>{
    try{
      
      setAlert({variant:'success', text:'Gracias por comprar'})
        
    }catch(e){
        console.log(e)
    }
}

    
    return (
       <div>
        <AlertCustom {...alert} />
        <img src={producto.image} alt={producto.name} style={{width: '15%'}} />
                <p>{producto.name}</p>
                <p> {producto.description}</p>
                <p> Precio: $ {producto.price} </p>
                <button onClick={handleBuy}>Confirmar Compra</button>
       </div>

    );
}
export default Detalle