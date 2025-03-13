import {useNavigate} from "react-router-dom";
import { useState } from "react";
import './Header.css';
import logo from '../images/logo.svg';

export default function Header(){
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return(
        <header className='header'>
            <div className='header__container'>
                <div className='header__content'>
                    <div className='header__logo-container'>
                        <img className='header__logo' alt='логотип' src={logo} onClick={() => navigate('/')}/>
                    </div>
                    <div className={`header__nav ${isMenuOpen ? "header__nav--open" : ""}`}>
                        <a className='header__nav-item' href='/'>О сайте</a>
                        <a className='header__nav-item' href='/news'>Главная</a>
                        <a className='header__nav-item' href='/vacancy'>Вакансии ДНР</a>
                        <a className="header__nav-item" href="/admin" style={{display: localStorage.getItem('isLoggedIn') ? 'block' : 'none'}}>Админ-панель</a>
                        <a className='header__nav-item' href='/products-list' style={{display: isMenuOpen ? 'block' : 'none'}}>Размещение</a>
                    </div>
                    <button className={`header__contact ${isMenuOpen ? "header__contact--show" : ''}`} onClick={() => navigate('/products-list')}>Размещение</button>
                    <button className="header__button--burger-menu" onClick={() => setIsMenuOpen(!isMenuOpen)}>☰</button>
                </div>
            </div>
        </header>
    );
}