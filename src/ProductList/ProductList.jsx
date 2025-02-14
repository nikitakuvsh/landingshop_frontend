import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import InformationModal from "../InformationModal/InformationModal";
import "./ProductList.css";

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [addProductModalOpen, setAddProductModalOpen] = useState(false);
    const [newProduct, setNewProduct] = useState({ name: "", price: "", image: null });
    const [showInformationModal, setShowInformationModal] = useState(false);
    const [modalMessage, setModalMessage] = useState(false);
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();

    const handleAddProduct = () => {
        const formData = new FormData();
        formData.append("name", newProduct.name);
        formData.append("price", newProduct.price);
        formData.append("image", newProduct.image);
        formData.append("description", newProduct.description);
    
        fetch("http://127.0.0.1:8000/create_product", {
            method: "POST",
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Ошибка HTTP: ${response.status}`);
            }
            return response.json().catch(() => { throw new Error("Ошибка парсинга JSON"); });
        })
        .then(data => {
            console.log("Ответ сервера:", data);
    
            if (data.id) {  // Проверяем наличие id продукта вместо success
                setProducts(prevProducts => [...prevProducts, data]); // Обновляем список
                setAddProductModalOpen(false);
                setNewProduct({ name: "", price: "", image: null });
    
                setModalMessage("Продукт успешно добавлен!");
                setIsError(false);
                setShowInformationModal(true);
    
                setTimeout(() => setShowInformationModal(false), 5000);
            } else {
                throw new Error("Ошибка при добавлении продукта: некорректный ответ сервера");
            }
        })
        .catch(error => {
            console.error("Ошибка при добавлении продукта:", error);
            setModalMessage((`Ошибка при добавлении продукта \n ${error.message}`) || "Ошибка при добавлении продукта");
            setIsError(true);
            setShowInformationModal(true);
            setTimeout(() => setShowInformationModal(false), 5000);
        });
    };
    
    

    useEffect(() => {
        fetch("http://127.0.0.1:8000/product-list")
            .then((response) => response.json())
            .then((data) => {
                setProducts(data.reverse());
            })
            .catch((error) => {
                console.error("Ошибка при загрузке продуктов:", error);
                setModalMessage((`Ошибка при загрузке продуктов ${error.message}`) || "Ошибка при загрузке продуктов");
                setIsError(true);
                setShowInformationModal(true);
                setTimeout(() => setShowInformationModal(false), 5000);
            });
    }, []);
    
    

    return (
        <div className="product-list__container">
            {localStorage.getItem('isLoggedIn') && (
                <div className="add-product__container">
                    <button className="add-product__button" onClick={() => setAddProductModalOpen(true)}>+ Добавить продукт</button>
                </div>
            )}

            {addProductModalOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2>Добавить продукт</h2>
                        <input type="text" placeholder="Название" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}/>
                        <input type="number" placeholder="Цена" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}/>
                        <input type="text" placeholder="Полное описание" value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}></input>
                        <input type="file" accept="image/*" onChange={(e) => setNewProduct({ ...newProduct, image: e.target.files[0] })}/>
                        <button className="modal-button add" onClick={handleAddProduct}>Добавить</button>
                        <button className="modal-button cancel" onClick={() => setAddProductModalOpen(false)}>Отмена</button>
                    </div>
                </div>
            )}

            {products.length === 0 ? (
                <div className="no-product__container">
                    <p className="no-products">Загруженных товаров не найдено :(</p>
                </div>
            ) : (
                <div className="products__cards-inner">
                    {products.map((product) => (
                        <div className="product__card" key={product.id} onClick={() => navigate(`/product/${product.id}`)}>
                            <img className="product__card-image" src={`http://127.0.0.1:8000${product.image_url}`} alt={product.name} />
                            <h3 className="product__card-name">{product.name}</h3>
                            <p className="product__card-price">Цена: {product.price} руб.</p>
                        </div>
                    ))}
                </div>
            )}

            {showInformationModal && (<InformationModal isError={isError} modalMessage={modalMessage} onClose={() => setShowInformationModal(false)} />)}
        </div>
    );
}
