<template>
  <v-app>
    <v-app-bar app color="primary">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>My Recipe</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app>
      <v-list>
        <v-list-item v-for="item in menuItems" :key="item.text" @click="selectMenuItem(item)">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container>
        <v-row>
          <v-col>
            <div v-if="selectedMenuItem === 'Dashboard'">
              <!-- Content for Dashboard -->
              <Menu />
            </div>
            <div v-else-if="selectedMenuItem === 'Profile'">
              <!-- Content for Profile -->
              <h2>Profile Content Goes Here</h2>
            </div>
            <!-- Add more div elements with v-else-if for other menu items as needed -->
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  import Menu from '@/components/Menu.vue'
  data() {
    return {
      drawer: false,
      menuItems: [
        { text: 'Dashboard', icon: 'mdi-view-dashboard' },
        { text: 'Profile', icon: 'mdi-account' },
        // Add more menu items as needed
      ],
      selectedMenuItem: 'Dashboard', // Default selected menu item
    };
  },
  methods: {
    selectMenuItem(item) {
      this.selectedMenuItem = item.text;
      this.drawer = false; // Close the drawer after selecting an item
    },
  },
};
</script>
