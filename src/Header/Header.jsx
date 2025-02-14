import {useNavigate} from "react-router-dom";
import './Header.css';
import logo from '../images/logo.svg';
import telIcon from '../images/icons/tel.svg';

export default function Header(){

    const navigate = useNavigate();

    return(
        <header className='header'>
            <div className='header__container'>
                <div className='header__content'>
                    <div className='header__logo-container'>
                        <img className='header__logo' alt='логотип' src={logo} onClick={() => navigate('/')}/>
                    </div>
                    <div className='header__nav'>
                        <a className='header__nav-item' href='#'>ОБО МНЕ</a>
                        <a className='header__nav-item' onClick={(e) => {e.preventDefault(); navigate('/products-list')}}>Список товаров</a>
                        <a className='header__nav-item' href='#'>Опыт</a>
                        <a className='header__nav-item' href='#'>Услуги</a>
                        <a className='header__nav-item' href='#'>Наши работы</a>
                        <a className='header__nav-item' href='#'>Блог</a>
                        <a className='header__nav-item' href='#'>Оставить заявку</a>
                    </div>
                    <div className='header__contact'>
                        <img className='header__contact-icon' alt='телефон' src={telIcon}/>
                        <p className='header__tel'>+c(xxx)yyy-yy-yy</p>
                    </div>
                </div>
            </div>
        </header>
    );
}