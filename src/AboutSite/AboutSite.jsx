import './AboutSite.css';
import careerImage from '../images/career.svg';
import manCareerImage from '../images/mancareer.svg';

export default function AboutSite() {
    return (
        <>
        <div className='about-site__container'>
            <div className='about-site__section'>
                <div className='about-site__left'>
                    <h2 className='about-site__title'>
                        Быстрая раскрутка и продвижение в <span className='about-site__title--blue'>социальных сетях</span>
                    </h2>
                    <p className='about-site__text'>
                        Профессиональная и безопасная SMM-накрутка лайков и подписчиков в популярных социальных сетях.
                        В наше время активность корпоративного или личного аккаунта в соцсетях может принести не только радость за свою популярность, 
                        но и вполне реальные деньги и славу. С использованием качественных и полностью безопасных услуг нашего сервиса 
                        вы сможете накрутить показатели в профилях, повысить количество подписчиков, добиться большого числа лайков и просмотров.
                    </p>
                    <div className='about-site__button-container'>
                        <button className='about-site__button about-site__button--primary'>Авторизация</button>
                        <button className='about-site__button about-site__button--secondary'>Зарегистрироваться</button>
                    </div>
                </div>
                <div className='about-site__right'>
                    <img className='about-site__image' src={careerImage} alt='Карьерный рост' />
                </div>
            </div>
        </div>
        <div className='about-site__container'>
            <div className='about-site__section about-site__section--reverse'>
                <div className='about-site__right'>
                    <h2 className='about-site__title'>Добро пожаловать в $companyName</h2>
                    <p className='about-site__text'>
                        Наш автоматический сервис по раскрутке социальных сетей позволит вам быстро добиться нужного результата, значительно повысив активность на нужном аккаунте
                        или в сообществе. Нередки случаи, когда подобная профессиональная накрутка вызывает своеобразный эффект снежного кома, привлекая реальных
                        пользователей социальных сетей, которые, заметив активность на вашем профиле, начинают приходить сами, повышая популярность вашей личной или
                        корпоративной страницы и принося продажи и деньги из ВК, Ютуб и Инстаграм.
                    </p>
                    <div className='about-site__button-container'>
                        <button className='about-site__button about-site__button--primary'>Попробовать бесплатно</button>
                        <button className='about-site__button about-site__button--secondary'>Задать вопрос</button>
                    </div>
                </div>
                <div className='about-site__left'>
                    <img className='about-site__image' src={manCareerImage} alt='Карьерный рост' />
                </div>
            </div>
        </div>
        </>
    );
}
