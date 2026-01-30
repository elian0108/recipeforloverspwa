import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLiveQuery } from 'dexie-react-hooks';
import { ArrowLeft, Save, Plus, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { db } from '../db';
import './RecipeFormPage.css';

const RecipeFormPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { t } = useLanguage();
    const isEdit = !!id;

    const [name, setName] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [instructions, setInstructions] = useState('');
    const [newMediaFiles, setNewMediaFiles] = useState([]);
    const [existingMedia, setExistingMedia] = useState([]);

    // Load data if editing
    useEffect(() => {
        if (isEdit) {
            db.recipes.get(Number(id)).then(recipe => {
                if (recipe) {
                    setName(recipe.name);
                    setIngredients(recipe.ingredients);
                    setInstructions(recipe.instructions);
                }
            });
            db.media.where({ recipeId: Number(id) }).toArray().then(media => {
                setExistingMedia(media);
            });
        }
    }, [id, isEdit]);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setNewMediaFiles(prev => [...prev, ...Array.from(e.target.files)]);
        }
    };

    const handleRemoveNewFile = (index) => {
        setNewMediaFiles(prev => prev.filter((_, i) => i !== index));
    };

    const handleRemoveExistingMedia = async (mediaId) => {
        if (window.confirm("Remover esta mídia?")) {
            await db.media.delete(mediaId);
            setExistingMedia(prev => prev.filter(m => m.id !== mediaId));
        }
    };

    const handleSave = async () => {
        if (!name.trim()) {
            alert("Por favor, dê um nome à receita.");
            return;
        }

        try {
            const recipeData = {
                name,
                ingredients,
                instructions,
                updatedAt: new Date()
            };

            let recipeId = Number(id);

            if (isEdit) {
                await db.recipes.update(recipeId, recipeData);
            } else {
                recipeData.createdAt = new Date();
                recipeId = await db.recipes.add(recipeData);
            }

            // Save new media
            const mediaPromises = newMediaFiles.map(file => {
                return db.media.add({
                    recipeId,
                    type: file.type.startsWith('video') ? 'video' : 'photo',
                    blob: file,
                    fileName: file.name
                });
            });

            await Promise.all(mediaPromises);

            navigate('/recipes');
        } catch (error) {
            console.error("Failed to save recipe", error);
            alert(t('save_error') + " " + error.message);
        }
    };

    return (
        <div className="form-page">
            <header className="form-header">
                <button className="icon-btn" onClick={() => navigate(-1)}>
                    <ArrowLeft size={24} />
                </button>
                <h1>{isEdit ? t('edit_recipe_title') : t('new_recipe_title')}</h1>
                <button className="icon-btn save-btn" onClick={handleSave}>
                    <Save size={24} />
                </button>
            </header>

            <div className="form-content">
                <div className="form-group">
                    <label>{t('name_label')}</label>
                    <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Ex: Bolo de Chocolate"
                    />
                </div>

                <div className="form-group">
                    <label>{t('ingredients')}</label>
                    <textarea
                        value={ingredients}
                        onChange={e => setIngredients(e.target.value)}
                        placeholder="..."
                        rows={5}
                    />
                </div>

                <div className="form-group">
                    <label>{t('instructions')}</label>
                    <textarea
                        value={instructions}
                        onChange={e => setInstructions(e.target.value)}
                        placeholder="..."
                        rows={8}
                    />
                </div>

                <div className="media-section">
                    <label>{t('media_label')}</label>

                    <div className="media-grid">
                        {/* Existing Media */}
                        {existingMedia.map(media => (
                            <div key={media.id} className="media-preview">
                                {media.type === 'video' ? (
                                    <div className="video-placeholder">VIDEO</div>
                                ) : (
                                    <img src={URL.createObjectURL(media.blob)} alt="preview" />
                                )}
                                <button className="remove-btn" onClick={() => handleRemoveExistingMedia(media.id)}>
                                    <X size={16} />
                                </button>
                            </div>
                        ))}

                        {/* New Media */}
                        {newMediaFiles.map((file, idx) => (
                            <div key={`new-${idx}`} className="media-preview">
                                {file.type.startsWith('video') ? (
                                    <div className="video-placeholder">VIDEO</div>
                                ) : (
                                    <img src={URL.createObjectURL(file)} alt="preview" />
                                )}
                                <button className="remove-btn" onClick={() => handleRemoveNewFile(idx)}>
                                    <X size={16} />
                                </button>
                            </div>
                        ))}

                        {/* Add Button */}
                        <label className="add-media-btn">
                            <input
                                type="file"
                                accept="image/*,video/*"
                                multiple
                                onChange={handleFileChange}
                                className="hidden-input"
                            />
                            <Plus size={32} />
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecipeFormPage;
