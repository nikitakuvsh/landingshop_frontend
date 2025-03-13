import './Vacancy.css';

export default function Vacancy(){
    return (
        <div className='vacancy__container'>
            <h2 className='container__title'>Вакансии</h2>
            <button className='button__add--vacancy' style={{display: localStorage.getItem('isLoggedIn') ? 'block' : 'none'}}>Добавить вакансию</button>
            <div className='vacancy__block'>
                <h2 className='vacancy__title'>Стажёр-разработчик</h2>
                <p className='vacancy__salary'>50.000 - 80.000₽</p>
                <div className='vacancy__text'>
                    <p className='vacancy__text-item'>Требуется стажёр-разработчик фывофлд ыовлдфы олдво лдфыфыодва фолдывра олдфрыва рфыолда ролдфырва олдрфыв олдарфолывр оларфыволд ар</p>
                </div>
                <div className='vacancy__buttons-container'>
                    <button className='button--remove-vacancy' style={{display: localStorage.getItem('isLoggedIn') ? 'block' : 'none'}}>Удалить вакансию</button>
                    <button className='vacancy__button'>Откликнуться</button>
                </div>
            </div>
            <button className='vacancy__button--adaptive'>Показать ешё</button>
        </div>
    );
}