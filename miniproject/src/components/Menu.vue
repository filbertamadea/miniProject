<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col>
          <v-card>
            <v-card-title class="headline">To-Do Recipe</v-card-title>
            <v-card-text>
              <v-expansion-panels>
                <v-expansion-panel v-for="(step, index) in recipeSteps" :key="index">
                  <v-expansion-panel-header>{{ step.title }}</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <p>{{ step.description }}</p>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      recipeSteps: [
        { title: 'Step 1', description: 'Description for Step 1 goes here.' },
        { title: 'Step 2', description: 'Description for Step 2 goes here.' },
        { title: 'Step 3', description: 'Description for Step 3 goes here.' },
        // Add more steps as needed
      ],
    };
  },
};
</script>

<style>
/* Add any custom styles here */
</style>
