import { useForm } from "react-hook-form";
import {Button,Form} from 'react-bootstrap'
import firebase from '../Config/firebase';
import {useNavigate } from "react-router-dom";

function AddPizza(){

    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const onSubmit =  async data => {
        console.log(data)
        try{
            const document = await firebase.firestore().collection("pizzas")
            .add(data)
            console.log(document)
            navigate("/Home")
            
        }catch(e){
            console.log(e)
        }
        
    }

    return(
        <>
        <div>
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
        </>
    )

}
export default AddPizza