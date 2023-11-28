<template>
  <v-card variant="outlined">
    <div>
      <div class="recipe-name">{{ Step[0].name }}</div>
      <v-expansion-panels>
        <v-expansion-panel v-for="(step, index) in Step[0].steps" :key="index" :title="`Step ${step.step}`"
          :text="step.description">
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
  </v-card>
</template>

<style scoped>
.recipe-name {
  font-size: 2em;
  font-weight: bold;
  margin-bottom: 20px;
}
</style>

<script setup>
const Step = [
  {
    name: 'Margherita Pizza',
    steps: [
      { step: 1, description: 'Roll out the pizza dough.' },
      { step: 2, description: 'Spread tomato sauce evenly.' },
      { step: 3, description: 'Add slices of fresh mozzarella.' },
      { step: 4, description: 'Sprinkle with basil leaves.' },
      { step: 5, description: 'Drizzle olive oil over the top.' },
      { step: 6, description: 'Bake in a preheated oven until the crust is golden brown.' },
    ],
  },
];
</script>
