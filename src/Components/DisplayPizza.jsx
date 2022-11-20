import { useState, useEffect } from "react"
import { getAllProductos} from "../Config/PizzaService";
import Producto from "./Producto";
import { Row, Accordion, Spinner } from 'react-bootstrap';


function DisplayPizza() {
    const [productos, setProductos] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [categorias, setCategorias] = useState([])
    useEffect(() => {
        const result = async () => {
            try {
                const responseData = await getAllProductos()
                console.log(responseData)
                const data = responseData.map(value => {
                    const fields = value._delegate._document.data.value.mapValue.fields
                    const fire = value
                    console.log(fire)
                    return { id: fire.id, category: fields.category.stringValue, image: fields.image.stringValue, name:fields.name.stringValue,description:fields.description.stringValue,price:fields.price.stringValue}
                })
                const categoriesN = data.map(value => value.category)
                const categories = categoriesN.filter((value, indice) => { return categoriesN.indexOf(value) === indice })
                setCategorias(categories)
                setProductos(data)
                setIsLoading(false)
            } catch (e) {
                console.log(e)
            }
        }
        result()
    }, []);
    if (isLoading) {
        return (
            <Spinner animation="border" variant="danger" />
        )
    } else {
        return (
            <>
                <div>
                    <Accordion defaultActiveKey="0">
                        {categorias.map((value, key) => (<Accordion.Item eventKey={key}>
                            <Accordion.Header>{value}</Accordion.Header>
                            <Accordion.Body>
                            <Row>
                                {console.log(productos)}
                                {productos.filter(producto => producto.category === value).map((producto) =>
                                (
                                    <Producto {...producto}/>
                                ))}
                            </Row>
                            </Accordion.Body>
                        </Accordion.Item>))}
                    </Accordion>
                </div>
            </>
        )
    }

}
export default DisplayPizza