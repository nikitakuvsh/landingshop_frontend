import './main.css';
import Header from './Header/Header';
import ProductList from './ProductList/ProductList';
import Product from './Product/Product';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/products-list" element={<ProductList />} />
          <Route path="/product/:product_id" element={<Product />}></Route>
        </Routes>
      </div>
    </Router>
  );
}
