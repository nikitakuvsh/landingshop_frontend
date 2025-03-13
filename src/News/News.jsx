import './News.css';
import Vacancy from '../Vacancy/Vacancy';

export default function News(){
    return (
        <div className='news__container'>
            <div className='news__wrapper'>
                <h2 className='container__title'>Новости</h2>
                <button className='news__block--add-news' style={{display: localStorage.getItem('isLoggedIn', 'true') ? 'block' : 'none'}}>Добавить новость</button>
                <div className='news__block'>
                    <h2 className='news__title'>Ищем специалистов на склад</h2>
                    <div className='news__text'>
                        <p className='news__text-item'>lorem impsum aboba lala asd askldjkl askldj qwe asd kljasd kljasd </p>
                        <div className='news__timeline'>
                            <p className='news__timeline-item'>Опубликовано <span className='news__time'>06.03.2025</span></p>
                        </div>
                    </div>
                    <button className='news__block--remove' style={{display: localStorage.getItem('isLoggedIn', 'true') ? 'block' : 'none'}}>Удалить новость</button>
                </div>
            </div>
            <button className='news__button--adaptive'>Показать ещё</button>
            <Vacancy />
        </div>
    );
}