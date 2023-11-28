

<template>
  <v-app>
    <v-app-bar app color="primary">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>My Recipe</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app>
      <v-list>
        <v-list-item v-for="item in menuItems" :key="item.text" @click="selectMenuItem(item)">
          <v-list-item :prepend-icon="item.icon" :title="item.text"></v-list-item>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container>
        <v-row no-gutters>
          <v-col>
            <div v-if="selectedMenuItem === 'Resep Oma'">
              <!-- Content for Dashboard -->
              <Menu />
            </div>
            <div v-else-if="selectedMenuItem === 'Profile'">
              <!-- Content for Profile -->
              <Profile />
            </div>
            <!-- Add more div elements with v-else-if for other menu items as needed -->
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import Menu from "@/components/Menu.vue";
import Profile from "@/components/Profile.vue";
import { ref, onMounted } from "vue";

let drawer = ref(Boolean);
let menuItems = ref([]);
let selectedMenuItem = ref("");

const init = () => {
  drawer.value = false;
  menuItems.value = [
    { text: "Resep Oma", icon: "mdi-view-dashboard" },
    { text: "Profile", icon: "mdi-account" },
    // Add more menu items as needed
  ];
  selectedMenuItem.value = 'Resep Oma';
};

const selectMenuItem = (item) => {
  selectedMenuItem.value = item.text;
  drawer.value = false;
};

onMounted(init);
</script>
