import { useState } from "react";
import { useNavigate } from "react-router";
import InformationModal from "../InformationModal/InformationModal";
import "./AdminLogin.css";

export default function AdminLogin() {
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [error, setError] = useState("");
    const [showInformationModal, setShowInformationModal] = useState(false);
    const [isError, setIsError] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch(`http://127.0.0.1:8000/admin/login?name=admin&password=${password}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            });

            if (!response.ok) {
                throw new Error("Неверный логин или пароль");
            }

            setIsLoggedIn(true);
            localStorage.setItem('isLoggedIn', 'true');
            showModal("Успешный вход!", false);
        } catch (err) {
            showModal(`Ошибка входа\n${err.message}`, true);
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch(`http://127.0.0.1:8000/admin/change_admin_password?name=admin&old_password=${password}&new_password=${newPassword}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            });

            if (!response.ok) {
                throw new Error("Ошибка смены пароля");
            }

            showModal("Успешная смена пароля!", false);
            setIsLoggedIn(false);
            localStorage.removeItem('isLoggedIn');
            setPassword("");
            setNewPassword("");
        } catch (err) {
            showModal(`Ошибка смены пароля`, true);
        }
    };

    const showModal = (message, isError) => {
        setModalMessage(message);
        setIsError(isError);
        setShowInformationModal(true);

        setTimeout(() => {
            setShowInformationModal(false);
        }, 5000);
    };

    return (
        <div className="login__container">
            <form onSubmit={isLoggedIn || localStorage.getItem('isLoggedIn') ? handleChangePassword : handleLogin} className="login__form">
                <h2>{isLoggedIn || localStorage.getItem('isLoggedIn') ? "Управление админкой" : "Вход для администратора"}</h2>
                <input type="text" placeholder="Логин" value='admin' required disabled={isLoggedIn}/>
                <input type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} required />

                {localStorage.getItem('isLoggedIn') && (
                    <input type="password" placeholder="Новый пароль" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required/>
                )}
                <div className="admin__buttons-container">
                    <button className="admin__button" type="submit">{isLoggedIn || localStorage.getItem('isLoggedIn') ? "Сменить пароль админа" : "Войти"}</button>
                    {isLoggedIn || localStorage.getItem('isLoggedIn') ? (
                        <>
                            <button className="admin__button" onClick={() => navigate('/products-list')}>Перейти к товарам</button>
                            <button className="admin__button" onClick={() => navigate('/')}>Перейти на главную</button>
                            <button className="admin__button" onClick={() => navigate('/news')}>Перейти к новостям</button>
                            <button className="admin__button" onClick={() => navigate('/vacancy')}>Перейти к вакансиям</button>
                            <button className="admin__button admin__button--red" onClick={() => { localStorage.removeItem('isLoggedIn'); navigate('/'); }}>Выйти</button>
                        </>
                    ) : null}
                </div>
            </form>

            {showInformationModal && (
                <InformationModal isError={isError} modalMessage={modalMessage} onClose={() => setShowInformationModal(false)} />
            )}
        </div>
    );
}
