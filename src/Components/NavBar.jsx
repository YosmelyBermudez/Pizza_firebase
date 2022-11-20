import {Link} from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

function NavBar(login){
    const context = useContext(AuthContext)
    return(
        <>
        <Navbar bg="light" expand="lg">
            <Navbar.Brand as={Link} to="/Home">Pizza Napoletana</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto"> 
                {
                    !context.login &&
                    <>
                        <Nav.Link as={Link} to="/Home">Home</Nav.Link>
                        <Nav.Link as ={Link} to ="/Registro">Registro</Nav.Link>
                        <Nav.Link as={Link} to= "/Login">Login</Nav.Link>
                    </>
                }
                {
                    context.login &&
                    <>
                        <NavDropdown title="Añadir" id="basic-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/AddPizza/Alta">Alta</NavDropdown.Item>
                        </NavDropdown> 
                        <Nav.Link onClick={context.handlerLogout}>Salir</Nav.Link>   
                    </>
                }
            
            </Nav>
            </Navbar.Collapse>
            {
                context.login &&
                <div> Hola {context.user.name}</div>
            }
        </Navbar>
        </>
    )
}
export default NavBar
