import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import {Button, Form} from 'react-bootstrap';
import firebase from '../Config/firebase';
import {useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import AlertCustom from "./AlertCostum";

function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [alert,setAlert] = useState({variant:'',text:''})
    const navigate = useNavigate();
    const context = useContext(AuthContext)
    const onSubmit = async data => {
        console.log(data)
        try{
            const responseUser = await firebase.auth.signInWithEmailAndPassword(data.email,data.password)
            console.log("responseUser",responseUser.user.uid)
            
            if(responseUser.user.uid){
                const userDocument = await firebase.firestore().collection("usuarios")
                .where("userId","==",responseUser.user.uid)
                .get()

                const user = userDocument.docs[0].data()

                context.handlerLogin(user)
                setAlert({variant:'success', text:`Bienvenido/a ${user?.name}`})
                    setTimeout(()=>{
                        navigate("/Home") 
                    },2000)
                    
                 
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
                <Button type='submit' variant="info">Inicio de Sesión</Button>
    </Form>
        </div>
    )
}
export default Login
