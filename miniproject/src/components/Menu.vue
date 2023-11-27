<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col>
          <v-card>
            <v-card-title>{{ recipeName }}</v-card-title>

            <v-card-text :style="{ marginTop: '16px', marginBottom: '-16px' }">
              INGREDIENTS
            </v-card-text>

            <v-card-text>
              <v-expansion-panels>
                <v-expansion-panel
                  v-for="itemg in ingredients"
                  :key="itemg.createdAt"
                  :title="itemg.name"
                  :text="itemg.description"
                >
                </v-expansion-panel>
              </v-expansion-panels>
            </v-card-text>

            <v-card-text :style="{ marginTop: '16px', marginBottom: '-16px' }">
              INSTRUCTIONS
            </v-card-text>

            <v-card-text>
              <v-expansion-panels>
                <v-expansion-panel
                  v-for="item in recipeSteps"
                  :key="item.createdAt"
                  :title="item.todo"
                  :text="item.description"
                >
                </v-expansion-panel>
              </v-expansion-panels>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script setup>
import { ref, onMounted } from "vue";
let recipeSteps = ref([]);
let ingredients = ref([]);
let recipeName = ref("");

// Define a function to fetch data
const fetchData = async () => {
  try {
    const responseIngredients = await fetch( "https://6564bb89ceac41c0761eba72.mockapi.io/api/miniproject/ingredients" );
    const responseInstructions = await fetch( "https://6564bb89ceac41c0761eba72.mockapi.io/api/miniproject/instruction" );

    if (responseIngredients.ok) {
      const responseIngredientsTemp = await responseIngredients.json();
      recipeName.value = "Resep Nasi Goreng Spesial";
      ingredients.value = responseIngredientsTemp;

      if (responseInstructions.ok) {
        const responseInstructionsTemp = await responseInstructions.json();
        recipeSteps.value = responseInstructionsTemp;
      } else {
        console.error("Failed to fetch data");
      }

    } else {
      console.error("Failed to fetch data");
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

onMounted(fetchData);
</script>

<style>
/* Add any custom styles here */
</style>
