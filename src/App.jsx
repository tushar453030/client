import { BrowserRouter as Router,Route,Routes,Navigate } from 'react-router-dom';

import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Product from "./pages/Product";

import Login from "./pages/Login";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Success from './pages/Success';
import { useSelector } from 'react-redux';

const App = () =>{
  const user = useSelector((state) => state.user.currentUser);

  return (
    
    
    
    
     <Router>
      <Routes> 
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login/>} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register/>} />
        <Route path="/product/:id" element={<Product/>}/>
        <Route path="/products/:category" element={<ProductList/>}/>

        <Route path="/success" element={<Success />} />
        <Route path="/products" element={<ProductList/>}/>
      
        <Route path="/" element={<Home/>} exact />
      </Routes>
    </Router>
    
    
  );
  }

export default App;