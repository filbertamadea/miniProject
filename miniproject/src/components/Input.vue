<template>
    <v-container>
      <v-form @submit.prevent="saveRecipe">
        <v-text-field v-model="recipe.name" label="Recipe Name"></v-text-field>
        <v-textarea v-model="recipe.description" label="Description"></v-textarea>
        <v-btn type="submit" color="primary">Save Recipe</v-btn>
  
        <!-- Button to add new to-do items -->
        <v-btn @click="addTodoItem" color="success">Add To-Do Item</v-btn>
  
        <!-- Display the to-do list with input boxes -->
        <v-list>
          <v-list-item-group v-if="recipe.todoList.length > 0">
            <v-list-item v-for="(item, index) in recipe.todoList" :key="index">
              <v-list-item-content>
                <v-text-field v-model="recipe.todoList[index]" label="To-Do Item"></v-text-field>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-form>
    </v-container>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { openDB } from 'idb';
  
  const recipe = ref({ name: '', description: '', todoList: [] });
  
  const saveRecipe = async () => {
    try {
      const db = await openDB('MyRecipesDB', 1, {
        upgrade(db) {
          if (!db.objectStoreNames.contains('recipes')) {
            db.createObjectStore('recipes', { keyPath: 'id', autoIncrement: true });
          }
        },
      });
  
      const transaction = db.transaction('recipes', 'readwrite');
      const store = transaction.objectStore('recipes');
  
      await store.add(recipe.value);
  
      // Optionally, you can redirect the user or perform other actions after saving.
      console.log('Recipe saved successfully!');
    } catch (error) {
      console.error('Error saving recipe:', error);
    }
  };
  
  const addTodoItem = () => {
    recipe.value.todoList.push('');
  };
  </script>
  