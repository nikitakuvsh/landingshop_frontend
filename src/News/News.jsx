import './News.css';
import Vacancy from '../Vacancy/Vacancy';
import { useState, useEffect } from 'react';
import InformationModal from '../InformationModal/InformationModal';
import axios from 'axios';

export default function News() {
    const [addNewsModalOpen, setAddNewsModalOpen] = useState(false);
    const [newsTitle, setNewsTitle] = useState('');
    const [newsContent, setNewsContent] = useState('');
    const [newsList, setNewsList] = useState([]);
    const [isError, setIsError] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [showInformationModal, setShowInformationModal] = useState(false);
    const [selectedNews, setSelectedNews] = useState(null);
    const [isModalRemoveNews, setIsModalRemoveNews] = useState(false);
    const [newsToShow, setNewsToShow] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/news')
            .then((response) => response.json())
            .then((data) => {
                setNewsList(data.reverse());
                if (window.innerWidth <= 799) {
                    setIsMobile(true);
                    setNewsToShow(data.slice(0, 5));
                } else {
                    setIsMobile(false);
                    setNewsToShow(data);
                }
            })
            .catch((error) => {
                console.error('Error fetching news:', error);
                setIsError(true);
                setModalMessage('Не удалось загрузить список новостей!');
                setShowInformationModal(true);
                setTimeout(() => setShowInformationModal(false), 5000);
            });
    }, []);

    const handleAddNews = () => {
        const newsData = {
            title: newsTitle,
            description: newsContent,
        };

        fetch('http://127.0.0.1:8000/news', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newsData),
        })
            .then((response) => response.json())
            .then((newNews) => {
                setNewsList([...newsList, newNews]);
                setAddNewsModalOpen(false);
                setNewsTitle('');
                setNewsContent('');
                setIsError(false);
                setModalMessage('Новость успешно добавлена!');
                setShowInformationModal(true);
                setTimeout(() => setShowInformationModal(false), 5000);
            })
            .catch((error) => {
                console.error('Error adding news:', error);
                setIsError(true);
                setModalMessage('Не удалось добавить новость');
                setShowInformationModal(true);
                setTimeout(() => setShowInformationModal(false), 5000);
            });
    };

    const handleRemoveNews = async () => {
        if (!selectedNews) return;

        try {
            await axios.delete(`http://127.0.0.1:8000/news/${selectedNews.id}`);
            setNewsList(newsList.filter(v => v.id !== selectedNews.id));
            setIsModalRemoveNews(false);
            setSelectedNews(null);
            setIsError(false);
            setModalMessage('Новость успешно удалена!');
            setShowInformationModal(true);
            setTimeout(() => setShowInformationModal(false), 5000);
        } catch (error) {
            console.error("Ошибка удаления новости:", error);
            setIsError(true);
            setModalMessage('Ошибка удаления новости!');
            setShowInformationModal(true);
            setTimeout(() => setShowInformationModal(false), 5000);
        }
    };

    const openRemoveModal = (news) => {
        setSelectedNews(news);
        setIsModalRemoveNews(true);
    };

    const loadMoreNews = () => {
        const nextPage = currentPage + 1;
        const nextNews = newsList.slice(nextPage * 5 - 5, nextPage * 5);
        setNewsToShow([...newsToShow, ...nextNews]);
        setCurrentPage(nextPage);
    }

    return (
        <div className='news__container'>
            <div className='news__wrapper'>
                <h2 className='container__title'>Новости</h2>
                <button className='news__block--add-news' style={{ display: localStorage.getItem('isLoggedIn', 'true') ? 'block' : 'none' }} onClick={() => setAddNewsModalOpen(true)}>Добавить новость</button>
                {newsToShow.length > 0 ? (
                    newsToShow.map((news) => (
                        <div className='news__block' key={news.id}>
                            <h2 className='news__title'>{news.title}</h2>
                            <div className='news__text'>
                                <p className='news__text-item'>{news.description}</p>
                                <div className='news__timeline'>
                                    <p className='news__timeline-item'>Опубликовано <span className='news__time'>{news.date_publish}</span></p>
                                </div>
                            </div>
                            <button className='news__block--remove' style={{ display: localStorage.getItem('isLoggedIn', 'true') ? 'block' : 'none' }} onClick={() => openRemoveModal(news)}>Удалить новость</button>
                        </div>
                    ))
                ) : (
                    <h2 className='no--news'>Пока новостей нет :(</h2>
                )}
            </div>
            <button className='news__button--adaptive' onClick={() => loadMoreNews()} style={{display: newsToShow.length > 0 && newsToShow.length != newsList.length ? 'block' : 'none'}}>Показать ещё</button>
            <Vacancy />

            {addNewsModalOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2>Добавить новость</h2>
                        <input type="text" placeholder="Заголовок новости" value={newsTitle} onChange={(e) => setNewsTitle(e.target.value)} />
                        <input type="text" placeholder="Описание новости" value={newsContent} onChange={(e) => setNewsContent(e.target.value)} />

                        <button className="modal-button add" onClick={() => handleAddNews()}>Добавить</button>
                        <button className="modal-button cancel" onClick={() => setAddNewsModalOpen(false)}>Отмена</button>
                    </div>
                </div>
            )}

            {showInformationModal && (
                <InformationModal isError={isError} modalMessage={modalMessage} onClose={() => setShowInformationModal(false)} />
            )}

            {isModalRemoveNews && selectedNews && (
                <div className='modal-overlay'>
                    <div className='modal'>
                        <h2>Вы уверены, что хотите удалить новость <br /> "{selectedNews.title}"?</h2>
                        <div className='modal-buttons'>
                            <button className='modal-button delete' onClick={handleRemoveNews} style={{ marginRight: '0' }}>Удалить</button>
                            <button className='modal-button cancel' onClick={() => setIsModalRemoveNews(false)}>Отмена</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}