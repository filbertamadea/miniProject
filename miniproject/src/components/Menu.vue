<template>
  <!-- <v-card variant="outlined">
    <div>
      <div class="recipe-name">{{ Step[0].name }}</div>
      <v-expansion-panels>
        <v-expansion-panel v-for="(step, index) in Step[0].steps" :key="index" :title="`Step ${step.step}`"
          :text="step.description">
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
  </v-card> -->

  <!-- CODINGAN NEW -->
  <v-app>
    <v-container>
      <v-row>
        <v-col>
          <v-card>
            <v-card-title>{{ recipeName }}</v-card-title>

            <v-card-text :style="{ marginTop: '16px', marginBottom: '-32px' }">
              <v-container>
                <v-row class="d-flex align-center">
                  <v-col>
                    <strong>INGREDIENTS</strong>
                  </v-col>
                  <v-col :style="{ textAlign: 'right' }">
                    <v-dialog width="500">
                      <template v-slot:activator="{ props }">
                        <v-btn color="blue" v-bind="props" text="ADD"> </v-btn>
                      </template>

                      <template v-slot:default="{ isActive }">
                        <v-card title="Add Instruction">
                          <v-card-text>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore
                            magna aliqua.
                          </v-card-text>

                          <v-card-actions>
                            <v-spacer></v-spacer>

                            <v-btn text="Close Dialog" @click="isActive.value = false"></v-btn>
                          </v-card-actions>
                        </v-card>
                      </template>
                    </v-dialog>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-text>
              <v-skeleton-loader :loading="loadingIngredients" type="heading">
                <v-expansion-panels :style="{ display: 'block' }">
                  <v-expansion-panel v-for="itemg in ingredients" :key="itemg.createdAt" :title="itemg.name">
                    <v-expansion-panel-text>
                      <p class="text-left" v-html="itemg.description"></p>
                    </v-expansion-panel-text>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-skeleton-loader>
            </v-card-text>

            <v-card-text :style="{ marginTop: '16px', marginBottom: '-32px' }">
              <v-container>
                <v-row class="d-flex align-center">
                  <v-col>
                    <strong>INSTRUCTIONS</strong>
                  </v-col>
                  <v-col :style="{ textAlign: 'right' }">
                    <v-dialog width="500">
                      <template v-slot:activator="{ props }">
                        <v-btn color="blue" v-bind="props" text="ADD"> </v-btn>
                      </template>

                      <template v-slot:default="{ isActive }">
                        <v-card title="Add Instruction">
                          <v-card-text>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                            labore et dolore
                            magna aliqua.
                          </v-card-text>

                          <v-card-actions>
                            <v-spacer></v-spacer>

                            <v-btn text="Close Dialog" @click="isActive.value = false"></v-btn>
                          </v-card-actions>
                        </v-card>
                      </template>
                    </v-dialog>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-text>
              <v-skeleton-loader :loading="loading" type="heading">
                <v-expansion-panels :style="{ display: 'block' }">
                  <v-expansion-panel v-for="item in recipeSteps" :key="item.createdAt" :title="item.todo">
                    <v-expansion-panel-text>
                      <p class="text-left" v-html="item.description"></p>
                    </v-expansion-panel-text>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-skeleton-loader>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<style scoped>
.recipe-name {
  font-size: 2em;
  font-weight: bold;
  margin-bottom: 20px;
}
</style>

<script setup>
// const Step = [
//   {
//     name: 'Margherita Pizza',
//     steps: [
//       { step: 1, description: 'Roll out the pizza dough.' },
//       { step: 2, description: 'Spread tomato sauce evenly.' },
//       { step: 3, description: 'Add slices of fresh mozzarella.' },
//       { step: 4, description: 'Sprinkle with basil leaves.' },
//       { step: 5, description: 'Drizzle olive oil over the top.' },
//       { step: 6, description: 'Bake in a preheated oven until the crust is golden brown.' },
//     ],
//   },
// ];

// CODINGAN NEW
import { ref, onMounted } from "vue";
let recipeSteps = ref([]);
let ingredients = ref([]);
let recipeName = ref("");
let loadingIngredients = ref(Boolean);
let loading = ref(Boolean);

// Define a function to fetch data
const fetchData = async () => {
  try {
    const responseIngredients = await fetch("https://6564bb89ceac41c0761eba72.mockapi.io/api/miniproject/ingredients");
    const responseInstructions = await fetch("https://6564bb89ceac41c0761eba72.mockapi.io/api/miniproject/instruction");

    if (responseIngredients.ok) {
      const responseIngredientsTemp = await responseIngredients.json();
      recipeName.value = "Resep Nasi Goreng Spesial";
      ingredients.value = responseIngredientsTemp;
      loadingIngredients.value = false;

      if (responseInstructions.ok) {
        const responseInstructionsTemp = await responseInstructions.json();
        recipeSteps.value = responseInstructionsTemp;
        loading.value = false;
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
loading.value = true;

</script>
