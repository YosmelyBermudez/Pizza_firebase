import React, { useContext } from "react";
import {Col,Card,ListGroup,Button} from 'react-bootstrap';
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";


function Producto({
    name,
    category,
    description,
    price,
    image,
    id
})
    
    
{
    const context = useContext(AuthContext)
    const sign_price="$"
    return(
        <Col xs={12} sm={6} lg={4} xxl={3}>
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={image} alt={name} />
            <Card.Body>
            <Card.Title>{name}</Card.Title>
            </Card.Body>
            <ListGroup className="data">
                <ListGroup.Item>Precio:{sign_price}{price}</ListGroup.Item>
            </ListGroup>
            <Button variant="info"><Link to={`/Detalle/${id}`}>Detalle</Link></Button>
            {
                context.login &&
                <Button variant="info"><Link to={`/AddPizza/editar/${id}`}>Editar</Link></Button>

            }
            
            </Card>
            </Col>
    )

}
export default Producto