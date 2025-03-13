import './main.css';
import Header from './Header/Header';
import ProductList from './ProductList/ProductList';
import Product from './Product/Product';
import AdminLogin from './AdminLogin/AdminLogin';
import AboutSite from './AboutSite/AboutSite';
import WhyThisCompany from './WhyThisCompany/WhyThisCompany';
import Footer from './Footer/Footer';
import News from './News/News';
import Vacancy from './Vacancy/Vacancy';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import useSmoothScroll from './smoothScroll';

export default function App() {
  useSmoothScroll();

  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path='/' element={<><AboutSite /><WhyThisCompany /></>}></Route>
          <Route path="/products-list" element={<ProductList />} />
          <Route path="/product/:product_id" element={<Product />}></Route>
          <Route path='/news' element={<News />}></Route>
          <Route path='/vacancy' element={<Vacancy />}></Route>
          <Route path='/admin' element={<AdminLogin />}></Route>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
