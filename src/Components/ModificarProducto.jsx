import { useParams } from "react-router-dom";
import { set, useForm } from "react-hook-form";
import {Button,Form} from 'react-bootstrap'
import firebase from '../Config/firebase';
import { useEffect} from "react";
import {useNavigate } from "react-router-dom";
import { deleteProducto, getByIdProducto, update } from "../Config/PizzaService";
import { AuthContext } from "../Context/AuthContext";

function ModificarProducto(){
    const {id} = useParams()
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const navigate = useNavigate();
    useEffect(
        () =>{
            const result = async ()=>{
                try{
                    const respuesta = await getByIdProducto(id)
                    console.log(respuesta.data())
                    if(respuesta){
                        setValue('name',respuesta.data().name)
                        setValue('category',respuesta.data().category)
                        setValue('description',respuesta.data().description)
                        setValue('price',respuesta.data().price)
                        setValue('image',respuesta.data().image)
                    }
            
                }catch(e){
                    console.log(e)
                }
            }
            result()
        },
        [id]

    )
    const onSubmit =  async data => {
        console.log(data)
        try{
            const document = await update(id,data)
            console.log(document)
            navigate("/Home")
            
        }catch(e){
            console.log(e)
        }
        
    }
    const handleDelete = async () =>{
        try{
            const document = await deleteProducto(id)
            console.log(document)
            navigate("/Home")
        }catch(e){
            console.log(e)
        }
    }
    
    return(
        <div>
            <Button variant="danger" onClick={handleDelete}>Eliminar</Button>
            <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" placeholder="Ingresar Nombre"  {...register("name", { required: true })}/>
                    <Form.Text className="text-muted">
                    {errors.name && <span>This field is required</span>} 
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Categoría</Form.Label>
                    <Form.Control type="text" placeholder="Ingresar Categoría"  {...register("category", { required: true })}/>
                    <Form.Text className="text-muted">
                    {errors.category && <span>This field is required</span>} 
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control type="text" placeholder="Ingresar Descripción"  {...register("description", { required: true })}/>
                    <Form.Text className="text-muted">
                    {errors.description && <span>This field is required</span>} 
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Precio</Form.Label>
                    <Form.Control type="number" placeholder="Ingresar Precio"  {...register("price", { required: true })}/>
                    <Form.Text className="text-muted">
                    {errors.price && <span>This field is required</span>} 
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Imagen</Form.Label>
                    <Form.Control type="text" placeholder="Ingresar URL"  {...register("image", { required: true })}/>
                    <Form.Text className="text-muted">
                    {errors.image && <span>This field is required</span>} 
                    </Form.Text>
                </Form.Group>

                <Button type='submit' variant="info">Guardar</Button>
               
                
    </Form>
        </div>

    )

    }
export default ModificarProducto