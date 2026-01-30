import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import './PrivacyPolicyPage.css';

const PrivacyPolicyPage = () => {
    const navigate = useNavigate();
    const { t } = useLanguage();

    return (
        <div className="privacy-page">
            <header className="privacy-header">
                <button className="icon-btn" onClick={() => navigate(-1)}>
                    <ArrowLeft size={24} />
                </button>
                <h1>{t('privacy_policy_title')}</h1>
            </header>

            <div className="privacy-content">
                <h2>{t('privacy_header')}</h2>
                <p className="last-update">{t('privacy_last_update')}</p>

                <p>{t('privacy_intro')}</p>

                <section>
                    <h3>{t('privacy_personal_info_title')}</h3>
                    <p>{t('privacy_personal_info_body')}</p>
                </section>

                <section>
                    <h3>{t('privacy_device_title')}</h3>
                    <p>{t('privacy_device_body')}</p>
                </section>

                <section>
                    <h3>{t('privacy_camera_title')}</h3>
                    <p>{t('privacy_camera_body')}</p>
                </section>

                <section>
                    <h3>{t('privacy_backup_title')}</h3>
                    <p>{t('privacy_backup_body')}</p>
                </section>

                <section>
                    <h3>{t('privacy_ads_title')}</h3>
                    <p>{t('privacy_ads_body')}</p>
                </section>

                <section>
                    <h3>{t('privacy_permissions_title')}</h3>
                    <p>{t('privacy_permissions_body')}</p>
                </section>
            </div>
        </div>
    );
};

export default PrivacyPolicyPage;
