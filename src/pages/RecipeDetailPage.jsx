import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLiveQuery } from 'dexie-react-hooks';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { db } from '../db';
import VideoPlayer from '../components/VideoPlayer';
import './RecipeDetailPage.css';

const RecipeDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { t } = useLanguage();
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const recipe = useLiveQuery(() => db.recipes.get(Number(id)), [id]);
    const mediaList = useLiveQuery(() => db.media.where({ recipeId: Number(id) }).toArray(), [id]);

    const handleDelete = async () => {
        await db.recipes.delete(Number(id));
        await db.media.where({ recipeId: Number(id) }).delete();
        navigate('/recipes');
    };

    if (!recipe) return <div className="loading">Carregando...</div>;

    return (
        <div className="detail-page">
            <header className="detail-header">
                <button className="icon-btn" onClick={() => navigate('/recipes')}>
                    <ArrowLeft size={24} />
                </button>
                <div className="actions">
                    <button className="icon-btn" onClick={() => navigate(`/recipes/${id}/edit`)}>
                        <Edit size={24} />
                    </button>
                    <button className="icon-btn delete-btn" onClick={() => setShowDeleteConfirm(true)}>
                        <Trash2 size={24} />
                    </button>
                </div>
            </header>

            {showDeleteConfirm && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>{t('delete_recipe_title')}</h3>
                        <p>{t('delete_recipe_message')}</p>
                        <div className="modal-actions">
                            <button onClick={() => setShowDeleteConfirm(false)}>{t('cancel')}</button>
                            <button className="danger" onClick={handleDelete}>{t('delete_button')}</button>
                        </div>
                    </div>
                </div>
            )}

            <div className="detail-content">
                <h1 className="recipe-title">{recipe.name}</h1>

                {mediaList && mediaList.length > 0 && (
                    <div className="media-carousel">
                        {mediaList.map(media => (
                            <div key={media.id} className="media-item">
                                {media.type === 'video' ? (
                                    <VideoPlayer src={URL.createObjectURL(media.blob)} />
                                ) : (
                                    <img src={URL.createObjectURL(media.blob)} alt="recipe media" />
                                )}
                            </div>
                        ))}
                    </div>
                )}

                <div className="section">
                    <h2>{t('ingredients')}</h2>
                    <div className="card">
                        <p>{recipe.ingredients}</p>
                    </div>
                </div>

                <div className="section">
                    <h2>{t('instructions')}</h2>
                    <div className="card">
                        <p>{recipe.instructions}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecipeDetailPage;
