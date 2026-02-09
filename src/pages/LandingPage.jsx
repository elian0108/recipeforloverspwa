import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Heart, ChefHat, WifiOff, Video, Download, Star, Coffee, Gift, HelpCircle, ChevronRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import './LandingPage.css';

const LandingPage = () => {
    const navigate = useNavigate();
    const { t } = useLanguage();
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [isIOS, setIsIOS] = useState(false);

    useEffect(() => {
        // Check for iOS
        const isIosDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        setIsIOS(isIosDevice);

        const handler = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
        };
        window.addEventListener('beforeinstallprompt', handler);
        return () => window.removeEventListener('beforeinstallprompt', handler);
    }, []);

    const handleInstallClick = () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choiceResult) => {
                setDeferredPrompt(null);
            });
        }
    };

    const handleEnterApp = () => {
        navigate('/recipes');
    };

    return (
        <div className="landing-page">

            <div className="hero-section">
                <div className="floating-shapes">
                    <div className="shape shape-1"></div>
                    <div className="shape shape-2"></div>
                </div>

                <div className="hero-content">
                    <div className="logo-container">
                        <Heart size={80} className="hero-logo" />
                    </div>

                    <h1 className="hero-title">
                        {t('app_name')}
                    </h1>

                    <p className="hero-subtitle">
                        {t('landing_subtitle')}
                    </p>

                    <div className="hero-actions">
                        {deferredPrompt ? (
                            <button className="cta-button primary shimmer" onClick={handleInstallClick}>
                                <Download size={20} />
                                <span>{t('install_app')}</span>
                            </button>
                        ) : (
                            <button className="cta-button primary" onClick={handleEnterApp}>
                                <span>{t('enter_app')}</span>
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <div className="features-section container">
                <h2 className="section-title">Por que escolher o nosso App?</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">
                            <WifiOff size={24} />
                        </div>
                        <h3>Offline First</h3>
                        <p>Acesse suas receitas favoritas em qualquer lugar, seja num chalé na montanha ou numa praia deserta, sem depender de internet.</p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">
                            <Video size={24} />
                        </div>
                        <h3>Memórias Vivas</h3>
                        <p>Não guarde apenas os ingredientes. Salve vídeos e fotos dos momentos divertidos durante o preparo. Aquele brinde especial merece ser lembrado.</p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">
                            <ChefHat size={24} />
                        </div>
                        <h3>Feito para Casais</h3>
                        <p>Dicas especiais para transformar um jantar comum em um encontro romântico. Sugestões de presentes e harmonização de vinhos.</p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">
                            <Gift size={24} />
                        </div>
                        <h3>Presentes no Prato</h3>
                        <p>Aprenda a criar presentes comestíveis incríveis. Porque nada diz "eu te amo" como algo feito com as próprias mãos.</p>
                    </div>
                </div>
            </div>

            <div className="sample-section container">
                <h2 className="section-title">Receitas que Inspiram o Amor</h2>
                <p className="section-subtitle">Confira algumas das ideias que você pode criar e salvar no app.</p>

                <div className="sample-grid">
                    <div className="sample-card">
                        <div className="sample-icon"><Coffee size={40} color="#E91E63" /></div>
                        <h3>Café da Manhã na Cama</h3>
                        <p>Surpreenda quem você ama com panquecas de coração e frutas frescas. Uma receita clássica para começar o dia com romance.</p>
                    </div>
                    <div className="sample-card">
                        <div className="sample-icon"><Heart size={40} color="#E91E63" /></div>
                        <h3>Risoto de Morango</h3>
                        <p>Um prato sofisticado e inusitado. O agridoce do morango com o queijo brie cria uma experiência sensorial única para o jantar.</p>
                    </div>
                    <div className="sample-card">
                        <div className="sample-icon"><Star size={40} color="#E91E63" /></div>
                        <h3>Fondue de Chocolate</h3>
                        <p>O clássico dos apaixonados. Perfeito para noites frias, acompanhado de frutas, marshmallows e um bom vinho.</p>
                    </div>
                </div>
            </div>

            <div className="testimonials-section container">
                <h2 className="section-title">O que os Casais Dizem</h2>
                <div className="testimonials-grid">
                    <div className="testimonial-card">
                        <div className="stars">
                            <Star size={16} fill="#FFC107" stroke="none" /><Star size={16} fill="#FFC107" stroke="none" /><Star size={16} fill="#FFC107" stroke="none" /><Star size={16} fill="#FFC107" stroke="none" /><Star size={16} fill="#FFC107" stroke="none" />
                        </div>
                        <p>"Salvou nosso Dia dos Namorados! A receita de risoto ficou perfeita e ainda filmamos todo o processo."</p>
                        <p className="author">- Ana & Marcos</p>
                    </div>
                    <div className="testimonial-card">
                        <div className="stars">
                            <Star size={16} fill="#FFC107" stroke="none" /><Star size={16} fill="#FFC107" stroke="none" /><Star size={16} fill="#FFC107" stroke="none" /><Star size={16} fill="#FFC107" stroke="none" /><Star size={16} fill="#FFC107" stroke="none" />
                        </div>
                        <p>"Adoro poder guardar as fotos do jantar junto com a receita. Vira um álbum de recordações."</p>
                        <p className="author">- Beatriz & João</p>
                    </div>
                </div>
            </div>

            <div className="faq-section container">
                <h2 className="section-title">Perguntas Frequentes</h2>

                <div className="faq-item">
                    <div className="faq-question">
                        <HelpCircle size={20} color="#E91E63" />
                        <h3>O aplicativo funciona sem internet?</h3>
                    </div>
                    <p>Sim! O Receitas para Casal é um PWA (Progressive Web App) desenvolvido para funcionar totalmente offline após o primeiro acesso.</p>
                </div>

                <div className="faq-item">
                    <div className="faq-question">
                        <HelpCircle size={20} color="#E91E63" />
                        <h3>Posso salvar meus próprios vídeos?</h3>
                    </div>
                    <p>Com certeza. Você pode gravar vídeos diretamente do app ou fazer upload da sua galeria para ilustrar o passo a passo ou salvar momentos divertidos.</p>
                </div>

                <div className="faq-item">
                    <div className="faq-question">
                        <HelpCircle size={20} color="#E91E63" />
                        <h3>É gratuito?</h3>
                    </div>
                    <p>Sim, o aplicativo é gratuito para uso. Nossa missão é espalhar o amor através da culinária.</p>
                </div>
            </div>

            <div className="about-section container" style={{ textAlign: 'center', marginBottom: '40px' }}>
                <Link to="/about" className="cta-button secondary">
                    <span>Conheça Nossa História</span>
                    <ChevronRight size={20} />
                </Link>
            </div>

            {isIOS && (
                <div className="ios-instructions">
                    <p>Para instalar no iPhone:</p>
                    <p>Toque em <strong>Compartilhar</strong> e depois em <strong>Adicionar à Tela de Início</strong>.</p>
                </div>
            )}

            <footer className="site-footer">
                <div className="footer-links">
                    <Link to="/about">Sobre Nós</Link>
                    <Link to="/privacy">Política de Privacidade</Link>
                    <Link to="/terms">Termos de Uso</Link>
                </div>
                <p>&copy; {new Date().getFullYear()} Receitas para Casal. Feito com amor.</p>
            </footer>
        </div>
    );
};

export default LandingPage;
