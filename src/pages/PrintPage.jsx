import React, { useEffect, useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { ArrowLeft, Printer } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { db } from '../db';
import { useLanguage } from '../contexts/LanguageContext';
import './PrintPage.css';

const PrintPage = () => {
    const navigate = useNavigate();
    const { t } = useLanguage();
    const recipes = useLiveQuery(() => db.recipes.orderBy('name').toArray());
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        if (recipes && recipes.length > 0) {
            // Give images and layout a moment to settle
            const timer = setTimeout(() => {
                setIsReady(true);
                window.print();
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [recipes]);

    if (!recipes) return <div className="loading">Carregando receitas...</div>;

    return (
        <div className="print-page">
            <div className="no-print print-controls">
                <button className="icon-btn" onClick={() => navigate('/settings')}>
                    <ArrowLeft size={24} />
                    <span>Voltar</span>
                </button>
                <div className="print-instructions">
                    <p><strong>Dica:</strong> Para salvar como PDF, selecione "Salvar como PDF" nas opções da impressora.</p>
                    <button className="cta-button" onClick={() => window.print()}>
                        <Printer size={20} />
                        Imprimir / Salvar PDF
                    </button>
                </div>
            </div>

            <div className="print-content">
                <header className="print-header">
                    <h1>{t('app_name')}</h1>
                    <p>Livro de Receitas da Família</p>
                </header>

                {recipes.length === 0 ? (
                    <p className="empty-state">Nenhuma receita encontrada para imprimir.</p>
                ) : (
                    <div className="recipes-grid">
                        {recipes.map(recipe => (
                            <div key={recipe.id} className="recipe-card">
                                <h2>{recipe.name}</h2>
                                <div className="recipe-meta">
                                    Adicionado em: {new Date(recipe.createdAt || Date.now()).toLocaleDateString()}
                                </div>

                                <div className="recipe-section">
                                    <h3>{t('ingredients')}</h3>
                                    <p>{recipe.ingredients}</p>
                                </div>

                                <div className="recipe-section">
                                    <h3>{t('instructions')}</h3>
                                    <p>{recipe.instructions}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <footer className="print-footer">
                    <p>Gerado por {t('app_name')}</p>
                </footer>
            </div>
        </div>
    );
};

export default PrintPage;
