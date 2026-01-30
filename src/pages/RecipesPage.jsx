import React, { useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, ChevronRight, Search, Settings, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { db } from '../db';
import AdBanner from '../components/AdBanner';
import './RecipesPage.css';

const RecipesPage = () => {
    const navigate = useNavigate();
    const { t } = useLanguage();
    const recipes = useLiveQuery(() => db.recipes.orderBy('updatedAt').reverse().toArray());
    const [showAd, setShowAd] = useState(true);

    return (
        <div className={`page-container ${showAd ? 'has-ad' : ''}`}>
            <header className="app-header">
                <h1>{t('recipes_title')}</h1>
                <Link to="/settings" className="settings-link">
                    <Settings size={24} color="#E91E63" />
                </Link>
            </header>

            <div className="search-bar">
                <Search size={20} className="search-icon" />
                <input type="text" placeholder={t('search_hint')} />
            </div>

            <div className="recipe-list">
                {!recipes ? (
                    <div className="loading">Carregando...</div>
                ) : recipes.length === 0 ? (
                    <div className="empty-state">
                        <p>{t('no_recipes')}</p>
                    </div>
                ) : (
                    recipes.map(recipe => (
                        <Link key={recipe.id} to={`/recipes/${recipe.id}`} className="recipe-item">
                            <div className="recipe-info">
                                <h3>{recipe.name}</h3>
                                <span className="recipe-date">
                                    {new Date(recipe.updatedAt).toLocaleDateString()}
                                </span>
                            </div>
                            <ChevronRight size={20} color="#666" />
                        </Link>
                    ))
                )}
            </div>

            {showAd && (
                <div className="footer-ad-container">
                    <button className="close-ad-btn" onClick={() => setShowAd(false)}>
                        <X size={16} />
                    </button>
                    <AdBanner dataAdSlot="footer-slot" />
                </div>
            )}

            <button
                className={`fab ${showAd ? 'fab-with-ad' : ''}`}
                onClick={() => navigate('/recipes/new')}
                aria-label={t('add_recipe')}
            >
                <Plus size={24} />
            </button>
        </div>
    );
};

export default RecipesPage;
