import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {Button,Form} from 'react-bootstrap'
import firebase from '../Config/firebase';
import AlertCustom from "./AlertCostum";
import {useNavigate } from "react-router-dom";

function Registro() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [alert,setAlert] = useState({variant:'',text:''})
    const navigate = useNavigate()
    const onSubmit =  async data => {
        console.log(data)
        try{
            const responseUser = await firebase.auth.createUserWithEmailAndPassword(data.email,data.password) 
            console.log("responseUser",responseUser.user.uid)  
            if(responseUser.user.uid){
                const document = await firebase.firestore().collection("usuarios")
                .add({
                    name:data.name,
                    lastname: data.lastname,
                    userId: responseUser.user.uid
                })
                console.log(document)
                if(document){
                    setAlert({variant:'success', text:'Gracias por registrarse'})
                    setTimeout(()=>{
                        navigate("/Login")
                    },1000)
                    
                }
            }
        }catch(e){
            setAlert({variant:'danger', text:'Ha ocurrido un error'})
            console.log(e)   
        }
        
    }
    
    return(
        <div>
            <AlertCustom {...alert} />
            
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" placeholder="Ingresar Nombre"  {...register("name", { required: true })}/>
                    <Form.Text className="text-muted">
                    {errors.name && <span>This field is required</span>} 
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control type="text" placeholder="Ingresar Apellido"  {...register("lastname", { required: true })}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Ingresar Correo"  {...register("email", { required: true })}/>
                    <Form.Text className="text-muted">
                    {errors.email && <span>This field is required</span>} 
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" {...register("password", { required: true,minLength:6,maxLength:12 })}/>
                    <Form.Text className="text-muted">
                    {errors.password?.type==="required" && <span>This field is required</span>}
                    {errors.password?.type==="minLength" && <span>Debe colocar al menos 6 caracteres</span>}
                    {errors.password?.type==="maxLength" && <span>No puede superar 12 caracteres</span>}
                    </Form.Text>
                </Form.Group>
                <Button type='submit' variant="info">Registrarse</Button>
                
    </Form>
        </div>
    )
}
export default Registro