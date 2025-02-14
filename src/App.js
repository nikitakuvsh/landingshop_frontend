import './main.css';
import Header from './Header/Header';
import ProductList from './ProductList/ProductList';
import Product from './Product/Product';
import AdminLogin from './AdminLogin/AdminLogin';
import AboutSite from './AboutSite/AboutSite';
import WhyThisCompany from './WhyThisCompany/WhyThisCompany';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path='/' element={<><AboutSite /><WhyThisCompany /></>}></Route>
          <Route path="/products-list" element={<ProductList />} />
          <Route path="/product/:product_id" element={<Product />}></Route>
          <Route path='/admin' element={<AdminLogin />}></Route>
        </Routes>
      </div>
    </Router>
  );
}
