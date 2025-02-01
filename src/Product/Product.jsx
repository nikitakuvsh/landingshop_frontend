import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Product.css';

export default function Product() {
    const { product_id } = useParams();  // Извлекаем product_id из URL
    const [product, setProduct] = useState(null);  // Состояние для хранения информации о продукте
    const [loading, setLoading] = useState(true);  // Состояние для индикатора загрузки
    const [error, setError] = useState(null);  // Состояние для хранения ошибок

    useEffect(() => {
        // Выполняем запрос для получения данных о продукте
        fetch(`http://127.0.0.1:8000/product/${product_id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Продукт не найден');
                }
                return response.json();
            })
            .then((data) => {
                setProduct(data.product);  // Устанавливаем данные продукта
                setLoading(false);  // Завершаем загрузку
            })
            .catch((error) => {
                setError(error.message);  // Устанавливаем ошибку
                setLoading(false);  // Завершаем загрузку
            });
    }, [product_id]);

    if (loading) {
        return <div>Загрузка...</div>;  // Отображаем сообщение о загрузке
    }

    if (error) {
        return <div>Ошибка: {error}</div>;  // Отображаем ошибку
    }

    return (
        <div className='product__container'>
            <h1>{product.name}</h1>
            <p>Цена: {product.price} руб.</p>
            <p>{product.description}</p>  {/* Дополнительно, если описание доступно */}
        </div>
    );
}
