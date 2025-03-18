import { useState, useEffect } from 'react';
import './WhyThisCompany.css';
import whyReasons from './whyData';
import InformationModal from '../InformationModal/InformationModal';

export default function WhyThisCompany() {
    const [isEditing, setIsEditing] = useState(false);
    const [data, setData] = useState([]);
    const [showInformationModal, setShowInformationModal] = useState(false);
    const [errorModal, setErrorModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/why_this_company/why_this_company');
                if (response.ok) {
                    const result = await response.json();
                    if (result.blocks.length > 0) {
                        const updatedData = result.blocks.map((block, index) => ({
                            ...block,
                            image: block.image || whyReasons[index].image,
                            alt: block.alt || whyReasons[index].alt,
                        }));
                        setData(updatedData);
                    } else {
                        setData(whyReasons);
                    }
                } else {
                    setShowInformationModal(true);
                    setErrorModal(true);
                    setModalMessage('Ошибка при загрузке данных');
                    setData(whyReasons);
                }
            } catch (error) {
                console.error('Ошибка:', error);
                setData(whyReasons);
                setShowInformationModal(true);
                setErrorModal(true);
                setModalMessage('Ошибка при загрузке данных');
            }
        };

        fetchData();
    }, []);

    const handleChange = (index, field, value) => {
        const updatedData = [...data];
        updatedData[index][field] = value;
        setData(updatedData);
    };

    const saveData = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/why_this_company/why_this_company', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: "Почему нас выбирают?",
                    blocks: data.map(block => ({
                        ...block,
                        image: block.image || '/static/images/default-image.jpg',  // Устанавливаем дефолтное изображение, если нет
                    })),
                }),
            });
    
            if (response.ok) {
                setShowInformationModal(true);
                setErrorModal(false);
                setModalMessage('Данные успешно обновлены!');
                setIsEditing(false);
            } else {
                setShowInformationModal(true);
                setErrorModal(true);
                setModalMessage('Произошла ошибка при обновлении данных');
            }
        } catch (error) {
            console.error('Ошибка:', error);
            setShowInformationModal(true);
            setErrorModal(true);
            setModalMessage('Произошла ошибка при обновлении данных');
        }
    };

    return (
        <div className='why__container'>
            <h2 className='why__title'>Почему нас выбирают?</h2>

            {isLoggedIn && !isEditing && (
                <button className='why__edit-button' onClick={() => setIsEditing(true)}>✏️ Внести данные</button>
            )}

            <div className='why__blocks-wrapper'>
                {data.map((reason, index) => (
                    <div className='why__block' key={reason.id || index}>
                        <div className='why__image-content'>
                            <img className='why__image' src={reason.image} alt={reason.alt || 'Изображение'} />
                        </div>
                        <div className='why__text-content'>
                            {isEditing ? (
                                <>
                                    <textarea className='why__block-title-edit' value={reason.title_block} onChange={(e) => handleChange(index, 'title_block', e.target.value)}/>
                                    <textarea className='why__block-text-edit' value={reason.block_descr} onChange={(e) => handleChange(index, 'block_descr', e.target.value)}/>
                                </>
                            ) : (
                                <>
                                    <h4 className='why__block-title'>{reason.title_block}</h4>
                                    <p className='why__block-text'>{reason.block_descr}</p>
                                </>
                            )}
                        </div>
                        <div className='why__number-block'>{index + 1}</div>
                    </div>
                ))}
            </div>

            {isEditing && (<button className='why__save-button' onClick={saveData}>💾 Сохранить</button>)}
            {showInformationModal && (<InformationModal isError={errorModal} modalMessage={modalMessage} onClose={() => setShowInformationModal(false)}/>)}
        </div>
    );
}
