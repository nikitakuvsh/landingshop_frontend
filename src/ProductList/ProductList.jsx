import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import './ProductList.css';

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://127.0.0.1:8000/product-list") // Укажи правильный адрес API
            .then((response) => response.json())
            .then((data) => setProducts(data.products))
            .catch((error) => console.error("Ошибка при загрузке продуктов:", error));
    }, []);

    return (
        <div className='product-list__container'>
            <div className='products__cards-inner'>
                {products.map((product) => (
                    <div className='product__card' key={product.id} onClick={() => navigate(`/product/${product.id}`)}>
                        <h3 className="product__card-name">{product.name}</h3>
                        <p className="product__card-price">Цена: {product.price} руб.</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
