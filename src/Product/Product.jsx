import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import InformationModal from '../InformationModal/InformationModal';
import './Product.css';

export default function Product() {
    const { product_id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalDeleteProduct, setIsModalDeleteProduct] = useState(false);
    const [showInformationModal, setShowInformationModal] = useState(false);
    const [isError, setIsError] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/product/${product_id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Продукт не найден');
                }
                return response.json();
            })
            .then((data) => {
                setProduct(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, [product_id]);

    const handleDelete = () => {
        fetch(`http://127.0.0.1:8000/remove_product/${product_id}`, {
            method: 'DELETE',
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Ошибка при удалении');
            }
            setIsModalDeleteProduct(false);
            setShowInformationModal(true);
            setIsError(false);
            setModalMessage('Продукт успешно удалён!');

            setTimeout(() => {
                setShowInformationModal(false);
                navigate('/products-list');
            }, 3000);
        })
        .catch((error) => {
            setIsError(true);
            setModalMessage('Ошибка при удалении продукта');
            setShowInformationModal(true);

            setTimeout(() => {
                setShowInformationModal(false);
            }, 1000);
        });
    };

    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        return <div>Ошибка: {error}</div>;
    }

    if (!product) {
        return <div>Продукт не найден</div>;
    }

    return (
        <div className='product__wrapper'>
            <div className='product__container'>
                <h1>{product.name}</h1>
                <img className='product-image' src={`http://127.0.0.1:8000${product.image_url}`} alt={product.name} />
                <p>Цена: {product.price} руб.</p>
                <p>{product.description}</p>
                {localStorage.getItem('isLoggedIn') && (
                    <button className='delete-product' onClick={() => setIsModalDeleteProduct(true)}>Удалить продукт</button>
                )}

                {isModalDeleteProduct && (
                    <div className='modal-overlay'>
                        <div className='modal'>
                            <h2>Вы уверены, что хотите удалить продукт <br /> "{product.name}"?</h2>
                            <div className='modal-buttons'>
                                <button className='modal-button delete' onClick={handleDelete} style={{ marginRight: '0' }}>Удалить</button>
                                <button className='modal-button cancel' onClick={() => setIsModalDeleteProduct(false)}>Отмена</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {showInformationModal && (<InformationModal isError={isError} modalMessage={modalMessage} onClose={() => setShowInformationModal(false)} />)}
        </div>
    );
}
