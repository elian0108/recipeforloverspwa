import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ChefHat, WifiOff, Video, Download } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import InterstitialAd from '../components/InterstitialAd';
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

    const [showAd, setShowAd] = useState(false);

    const handleEnterApp = () => {
        setShowAd(true);
    };

    const handleAdClose = () => {
        setShowAd(false);
        navigate('/recipes');
    };

    return (
        <div className="landing-page">
            {showAd && <InterstitialAd onClose={handleAdClose} />}

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

            <div className="features-section">
                <div className="feature-card">
                    <div className="feature-icon">
                        <WifiOff size={24} />
                    </div>
                    <h3>Offline First</h3>
                    <p>Acesse suas receitas em qualquer lugar, mesmo sem internet.</p>
                </div>

                <div className="feature-card">
                    <div className="feature-icon">
                        <Video size={24} />
                    </div>
                    <h3>Vídeos & Fotos</h3>
                    <p>Guarde os momentos do preparo com vídeos e fotos.</p>
                </div>

                <div className="feature-card">
                    <div className="feature-icon">
                        <ChefHat size={24} />
                    </div>
                    <h3>Para Casais</h3>
                    <p>Um espaço dedicado para construir suas memórias na cozinha.</p>
                </div>
            </div>

            {isIOS && (
                <div className="ios-instructions">
                    <p>Para instalar no iPhone:</p>
                    <p>Toque em <strong>Compartilhar</strong> e depois em <strong>Adicionar à Tela de Início</strong>.</p>
                </div>
            )}
        </div>
    );
};

export default LandingPage;
