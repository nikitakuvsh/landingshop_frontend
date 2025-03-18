import './Vacancy.css';
import { useState, useEffect } from 'react';
import InformationModal from '../InformationModal/InformationModal';
import axios from 'axios';

export default function Vacancy() {
    const [addVacancyModalOpen, setAddVacancyModalOpen] = useState(false);
    const [vacancyTitle, setVacancyTitle] = useState('');
    const [vacancySalary, setVacancySalary] = useState('');
    const [vacancyDescription, setVacancyDescription] = useState('');
    const [vacancyLocation, setVacancyLocation] = useState('ДНР');
    const [isError, setIsError] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [showInformationModal, setShowInformationModal] = useState(false);
    const [vacancies, setVacancies] = useState([]);
    const [selectedVacancy, setSelectedVacancy] = useState(null);
    const [isModalRemoveVacancy, setIsModalRemoveVacancy] = useState(false);
    const [vacanciesToShow, setVacanciesToShow] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8000/vacancies/dnr')
            .then(response => {
                setVacancies(response.data.reverse());
                if (window.innerWidth <= 799) {
                    setIsMobile(true);
                    setVacanciesToShow(response.data.slice(0,5));
                } else {
                    setIsMobile(false);
                    setVacanciesToShow(response.data);
                }
            })
            .catch(error => {
                console.error('Ошибка загрузки вакансий:', error);
                setIsError(true);
                setModalMessage('Ошибка загрузки вакансий!');
                setShowInformationModal(true);
                setTimeout(() => setShowInformationModal(false), 5000);
            });
    }, []);

    const handleAddVacancy = async () => {
        const newVacancy = {
            title: vacancyTitle,
            salary: vacancySalary,
            description: vacancyDescription,
            location: vacancyLocation
        };

        try {
            const response = await fetch('http://127.0.0.1:8000/vacancies', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newVacancy),
            });

            if (!response.ok) throw new Error('Ошибка при добавлении вакансии');

            setAddVacancyModalOpen(false);
            setIsError(false);
            setModalMessage('Вакансия добавлена успешно!');
            setShowInformationModal(true);
            setTimeout(() => setShowInformationModal(false), 5000);
        } catch (error) {
            console.error(error);
            setIsError(true);
            setModalMessage('Не удалось добавить вакансию');
            setShowInformationModal(true);
            setTimeout(() => setShowInformationModal(false), 5000);
        }
    };

    const openRemoveModal = (vacancy) => {
        setSelectedVacancy(vacancy);
        setIsModalRemoveVacancy(true);
    };

    const handleRemoveVacancy = async () => {
        if (!selectedVacancy) return;

        try {
            await axios.delete(`http://localhost:8000/vacancies/${selectedVacancy.id}`);
            setVacancies(vacancies.filter(v => v.id !== selectedVacancy.id));
            setIsModalRemoveVacancy(false);
            setSelectedVacancy(null);
            setIsError(false);
            setModalMessage('Вакансия успешно удалена!');
            setShowInformationModal(true);
            setTimeout(() => setShowInformationModal(false), 5000);
        } catch (error) {
            console.error("Ошибка удаления вакансии:", error);
            setIsError(true);
            setModalMessage('Ошибка при удалении вакансии!');
            setShowInformationModal(true);
            setTimeout(() => setShowInformationModal(false), 5000);
        }
    };

    const loadMoreVacancies = () => {
        const nextPage = currentPage + 1;
        const nextVacancies = vacancies.slice(nextPage * 5 - 5, nextPage * 5);
        setVacanciesToShow([...vacanciesToShow, ...nextVacancies]);
        setCurrentPage(nextPage);
    }


    return (
        <div className='vacancy__container'>
            <h2 className='container__title'>Вакансии ДНР</h2>
            <button className='button__add--vacancy' style={{ display: localStorage.getItem('isLoggedIn') ? 'block' : 'none' }} onClick={() => setAddVacancyModalOpen(true)}>Добавить вакансию</button>

            {vacanciesToShow.length > 0 ? (
                vacanciesToShow.map(vacancy => (
                    <div key={vacancy.id} className='vacancy__block'>
                        <h2 className='vacancy__title'>{vacancy.title}</h2>
                        <p className='vacancy__salary'>{vacancy.salary}₽</p>
                        <div className='vacancy__text'>
                            <p className='vacancy__text-item'>{vacancy.description}</p>
                        </div>
                        <div className='vacancy__buttons-container'>
                            {localStorage.getItem('isLoggedIn') && (
                                <button className='button--remove-vacancy' onClick={() => openRemoveModal(vacancy)}>Удалить вакансию</button>
                            )}
                            <button className='vacancy__button'>Откликнуться</button>
                        </div>
                    </div>
                ))
            ) : (
                <h2 className='no--vacancy'>Пока вакансий нет :(</h2>
            )}

            <button className='vacancy__button--adaptive' onClick={loadMoreVacancies} style={{display: vacanciesToShow.length > 0 && vacanciesToShow.length != vacancies.length ? 'block' : 'none'}}>Показать ещё</button>

            {addVacancyModalOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2>Добавить вакансию</h2>
                        <input type="text" placeholder="Название вакансии" value={vacancyTitle} onChange={(e) => setVacancyTitle(e.target.value)} />
                        <input type="text" placeholder="Зарплата (без руб)" value={vacancySalary} onChange={(e) => setVacancySalary(e.target.value)} />
                        <input type="text" placeholder="Полное описание" value={vacancyDescription} onChange={(e) => setVacancyDescription(e.target.value)} />

                        <div className="modal__radio-group">
                            <label>
                                <input type="radio" name="location" value="ДНР" checked={vacancyLocation === "ДНР"} onChange={(e) => setVacancyLocation(e.target.value)} />ДНР</label>
                            <label>
                                <input type="radio" name="location" value="ЛНР" checked={vacancyLocation === "ЛНР"} onChange={(e) => setVacancyLocation(e.target.value)} />ЛНР
                            </label>
                        </div>

                        <button className="modal-button add" onClick={handleAddVacancy}>Добавить</button>
                        <button className="modal-button cancel" onClick={() => setAddVacancyModalOpen(false)}>Отмена</button>
                    </div>
                </div>
            )}

            {showInformationModal && (
                <InformationModal isError={isError} modalMessage={modalMessage} onClose={() => setShowInformationModal(false)} />
            )}

            {isModalRemoveVacancy && selectedVacancy && (
                <div className='modal-overlay'>
                    <div className='modal'>
                        <h2>Вы уверены, что хотите удалить вакансию <br /> "{selectedVacancy.title}"?</h2>
                        <div className='modal-buttons'>
                            <button className='modal-button delete' onClick={handleRemoveVacancy} style={{ marginRight: '0' }}>Удалить</button>
                            <button className='modal-button cancel' onClick={() => setIsModalRemoveVacancy(false)}>Отмена</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
