import React, { useEffect, useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import AdBanner from './AdBanner';
import './InterstitialAd.css';

const InterstitialAd = ({ onClose, onAdLoaded }) => {
    const [timeLeft, setTimeLeft] = useState(5);
    const [canClose, setCanClose] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setCanClose(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="interstitial-overlay">
            <div className="interstitial-content">
                <div className="interstitial-header">
                    {canClose ? (
                        <button className="close-btn" onClick={onClose}>
                            <X size={24} />
                        </button>
                    ) : (
                        <div className="countdown">
                            <Loader2 className="spinner" size={16} />
                            <span>Fechar em {timeLeft}s</span>
                        </div>
                    )}
                </div>

                <div className="ad-wrapper">
                    <p className="sponsored-text">Patrocinado</p>
                    {/* Using a Large Rectangle or similar big slot */}
                    <AdBanner dataAdFormat="rectangle" dataFullWidthResponsive="false" />
                </div>

                <div className="interstitial-footer">
                    <button className="continue-btn" onClick={onClose} disabled={!canClose}>
                        {canClose ? "Continuar para o App" : "Aguarde..."}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InterstitialAd;
