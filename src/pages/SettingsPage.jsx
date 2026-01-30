import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Globe, Download, Upload, Printer, FileText } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { db } from '../db';
import 'dexie-export-import';
import './SettingsPage.css';

const SettingsPage = () => {
    const navigate = useNavigate();
    const { t, language, setLanguage } = useLanguage();
    const fileInputRef = useRef(null);

    const handleExport = async () => {
        try {
            const blob = await db.export();
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `backup-receitas-${new Date().toISOString().split('T')[0]}.json`;
            a.click();
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Export failed", error);
            alert("Export requires 'dexie-export-import'. Ensure it's installed or use simple backup.");
        }
    };

    const handleImportClick = () => {
        fileInputRef.current.click();
    };

    const handleImportFile = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                await db.import(file);
                alert(t('restore_success'));
                window.location.reload();
            } catch (error) {
                console.error("Import failed", error);
                alert("Erro ao importar: " + error.message);
            }
        }
    };

    return (
        <div className="settings-page">
            <header className="settings-header">
                <button className="icon-btn" onClick={() => navigate('/recipes')}>
                    <ArrowLeft size={24} />
                </button>
                <h1>{t('settings_title')}</h1>
            </header>

            <div className="settings-content">

                {/* Creating a Dexie export/import without the package if it fails */}
                <section className="settings-section">
                    <h2>{t('data_management_title')}</h2>
                    <button className="settings-item" onClick={handleExport}>
                        <Download size={20} />
                        <span>{t('create_backup')}</span>
                    </button>
                    <button className="settings-item" onClick={handleImportClick}>
                        <Upload size={20} />
                        <span>{t('restore_backup')}</span>
                    </button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImportFile}
                        style={{ display: 'none' }}
                        accept="application/json"
                    />
                </section>

                <section className="settings-section">
                    <h2>{t('select_language')}</h2>
                    <div className="language-toggle">
                        <button
                            className={`lang-btn ${language === 'pt' ? 'active' : ''}`}
                            onClick={() => setLanguage('pt')}
                        >
                            Português
                        </button>
                        <button
                            className={`lang-btn ${language === 'en' ? 'active' : ''}`}
                            onClick={() => setLanguage('en')}
                        >
                            English
                        </button>
                    </div>
                </section>

                <section className="settings-section">
                    <h2>{t('other_options_title')}</h2>
                    <button className="settings-item" onClick={() => window.print()}>
                        <Printer size={20} />
                        <span>{t('print_recipe_book')}</span>
                    </button>
                    <button className="settings-item" onClick={() => navigate('/privacy')}>
                        <FileText size={20} />
                        <span>{t('privacy_policy_title')}</span>
                    </button>
                </section>
            </div>
        </div>
    );
};

export default SettingsPage;
