<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col>
          <v-card>
            <v-card-title>{{ recipeName }}</v-card-title>
            <v-card-text>
              <v-expansion-panels>
                <v-expansion-panel
                  v-for="item in recipeSteps"
                  :key="item.title"
                  :title="item.title"
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
let recipeName = ref('');

const init = () => {
  recipeName.value = "CUKURUKUK"
  recipeSteps.value = [
    { title: "Step 1", description: "Description for Step 1 goes here." },
    { title: "Step 2", description: "Description for Step 2 goes here." },
    { title: "Step 3", description: "Description for Step 3 goes here." },
    // Add more steps as needed
  ];
};

onMounted(init);
</script>

<style>
/* Add any custom styles here */
</style>
