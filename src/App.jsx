import './App.css';
import { BrowserRouter as  Router, Link,Route,Routes} from 'react-router-dom';
import Home from './Components/Home';
import Container from 'react-bootstrap/Container';
import Login from './Components/Login';
import Registro from './Components/Registro';
import NotFound from './Components/NotFound';
import NavBar from './Components/NavBar';
import AddPizza from './Components/AddPizza';
import ModificarProducto from './Components/ModificarProducto';
import Detalle from './Components/Detalle';
import AuthProvider from './Context/AuthContext';



function App() {
  return (
    <div className="App">
      <img src="https://img.freepik.com/vector-gratis/pizza-sabrosa-redonda-colorida_1284-10219.jpg?w=2000" alt="pizza" style={{width: '15%'}} />
        <Router>
          <AuthProvider>
            <NavBar />
          <Container>
            <Routes>
              <Route path= '/Registro' element={<Registro />} />
              <Route path ='/Login' element={<Login />} />
              <Route path ='/Home' element={<Home />} />
              <Route path ='/AddPizza/alta' element={<AddPizza />} />
              <Route path ='/AddPizza/editar/:id' element={< ModificarProducto />} />
              <Route path= '/Detalle/:id' element={<Detalle />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </Container>
        </AuthProvider>
		</Router>
    </div>
  );
}

export default App;
