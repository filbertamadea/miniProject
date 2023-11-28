<template>
  <v-card class="mx-auto">
    <v-img
      src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
      height="200px"
      cover
    ></v-img>

    <v-card-title> Filbert Amadea Shan Noel </v-card-title>

    <v-card-subtitle> Fullstack Developer </v-card-subtitle>

    <v-card-actions>
      <v-btn color="orange-lighten-2" variant="text"> Biodata </v-btn>

      <v-spacer></v-spacer>

      <v-btn
        :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
        @click="show = !show"
      ></v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-dialog width="500" v-model="dialogAdd">
          <template v-slot:activator="{ props }">
            <v-btn
              :style="{ margin: '16px' }"
              color="blue"
              v-bind="props"
              text="ADD CATEGORY"
            >
            </v-btn>
          </template>

          <template v-slot:default="{ isActive }">
            <v-card title="Add Category">
              <v-card-text>
                <v-form @submit.prevent="addData">
                  <v-text-field
                    v-model="categoryName"
                    label="Name"
                  ></v-text-field>
                  <v-text-field
                    v-model="categoryValue"
                    label="Value"
                  ></v-text-field>
                  <v-btn type="submit" block class="mt-2">Submit</v-btn>
                </v-form>
              </v-card-text>

              <!-- <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                  text="Close Dialog"
                  @click="isActive.value = false"
                ></v-btn>
              </v-card-actions> -->
            </v-card>
          </template>
        </v-dialog>

        <v-card-text>
          <v-table>
            <tbody>
              <tr v-for="item in category" :key="item.categoryName">
                <td>{{ item.categoryName }}</td>
                <td>{{ item.categoryValue }}</td>
              </tr>
            </tbody>
          </v-table>
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script setup>
import { ref, onMounted } from "vue";

const show = ref(Boolean);
const categoryName = ref("");
const categoryValue = ref("");
const isActive = ref(Boolean);
const dialogAdd = ref(Boolean);
let category = ref([]);

const dbName = "profile_db";

const init = () => {
  show.value = false;
  dialogAdd.value = false;
  readData();
};

const addData = () => {
  const request = indexedDB.open(dbName, 2);

  request.onerror = (event) => {
    console.error("Error opening database:", event.target.error);
  };

  request.onupgradeneeded = (event) => {
    const db = event.target.result;

    const objectStore = db.createObjectStore("category", {
      keyPath: "id",
      autoIncrement: true,
    });
    objectStore.createIndex("categoryName", "categoryName", { unique: false });
    objectStore.createIndex("categoryValue", "categoryValue", { unique: true });
  };

  request.onsuccess = (event) => {
    const db = event.target.result;

    const addTransaction = db.transaction("category", "readwrite");
    const categoryObjectStore = addTransaction.objectStore("category");

    console.log(categoryName.value, categoryValue.value)
    const addRequest = categoryObjectStore.add({
      categoryName: categoryName.value,
      categoryValue: categoryValue.value,
    });

    addRequest.onsuccess = (event) => {
      console.log("Data added successfully");
    };

    addRequest.onerror = (event) => {
      console.error("Error adding data", event.target.error);
    };

    addTransaction.oncomplete = () => {
      console.log("Add transaction completed");
      readData();
      db.close();
      isActive.value = false;
      dialogAdd.value = false;
    };
  };
};

const readData = () => {
  const request = indexedDB.open(dbName, 2);

  request.onerror = (event) => {
    console.error("Error opening database:", event.target.error);
  };

  request.onupgradeneeded = (event) => {
    const db = event.target.result;

    const objectStore = db.createObjectStore("category", {
      keyPath: "id",
      autoIncrement: true,
    });
    objectStore.createIndex("categoryName", "categoryName", { unique: false });
    objectStore.createIndex("categoryValue", "categoryValue", { unique: true });
  };

  request.onsuccess = (event) => {
    const db = event.target.result;
    category.value = [];

    const readTransaction = db.transaction("category", "readonly");
    const categoryObjectStore = readTransaction.objectStore("category");

    const categoryCursor = categoryObjectStore.openCursor();

    categoryCursor.onsuccess = (event) => {
      const cursor = event.target.result;

      if (cursor) {
        category.value.push(cursor.value);
        console.log(category)
        cursor.continue();
      } else {
        console.log("Data read successfully");
        db.close();
      }
    };

    categoryCursor.onerror = (event) => {
      console.error("Error reading data", event.target.error);
      db.close();
    };
  };
};

onMounted(init);
</script>
