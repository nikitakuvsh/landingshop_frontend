import { useEffect, useState } from 'react';
import './InformationModal.css';

export default function InformationModal({ isError, modalMessage, onClose }) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onClose, 300); // Убираем компонент через 300 мс после анимации
        }, 5000);

        return () => clearTimeout(timeout);
    }, [onClose]);

    return (
        <div className={`info-modal ${isVisible ? 'show' : 'hide'} ${isError ? 'error' : 'success'}`}>
            <p>{modalMessage}</p>
        </div>
    );
}
