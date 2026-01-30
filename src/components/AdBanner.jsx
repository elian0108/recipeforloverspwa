import React, { useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const AdBanner = ({ dataAdSlot = "XXXXXXX", dataAdFormat = 'auto', dataFullWidthResponsive = 'true' }) => {
    const { t } = useLanguage();

    useEffect(() => {
        try {
            if (process.env.NODE_ENV === 'production') {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            }
        } catch (e) {
            console.error("AdSense error", e);
        }
    }, []);

    if (process.env.NODE_ENV !== 'production') {
        return (
            <div style={{
                margin: '20px 0',
                padding: '20px',
                textAlign: 'center',
                background: '#eee',
                color: '#666',
                border: '1px dashed #999'
            }}>
                <p style={{ fontSize: '0.8rem', marginBottom: '8px' }}>{t('advertisement') || 'Advertisement'}</p>
                [AdSense Placeholder - Dev Mode]
            </div>
        );
    }

    return (
        <div style={{ margin: '20px 0', textAlign: 'center', overflow: 'hidden' }}>
            <p style={{ fontSize: '0.8rem', color: '#666', marginBottom: '8px' }}>{t('advertisement') || 'Advertisement'}</p>
            <ins className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
                data-ad-slot={dataAdSlot}
                data-ad-format={dataAdFormat}
                data-full-width-responsive={dataFullWidthResponsive}>
            </ins>
        </div>
    );
};

export default AdBanner;
