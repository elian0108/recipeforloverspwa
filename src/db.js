import Dexie from 'dexie';

export const db = new Dexie('RecipeForLoversDB');

db.version(2).stores({
    recipes: '++id, name, ingredients, instructions, createdAt, updatedAt',
    media: '++id, recipeId, type', // 'blob' is not indexed so it doesn't need to be in the valid keys list
});

export const resetDatabase = async () => {
    await db.delete();
    await db.open();
};
