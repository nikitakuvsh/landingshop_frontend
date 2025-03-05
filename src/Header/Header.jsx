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
                        <a className='header__nav-item' href='' onClick={() => navigate('/')}>О сайте</a>
                        <a className='header__nav-item' href='#'>Главная</a>
                        <a className='header__nav-item' href='#'>Вакансии ДНР</a>
                    </div>
                    <button className='header__contact' onClick={() => navigate('/products-list')}>Размещение</button>
                </div>
            </div>
        </header>
    );
}