<template>
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
                    <v-btn color="blue" v-bind="props" text="Refresh" style="margin-right: 10px"
                      @click="fetchDataIngredients">
                    </v-btn>
                    <v-dialog width="500" v-model="dialogIng">
                      <template v-slot:activator="{ props }">
                        <v-btn color="blue" v-bind="props" text="ADD"> </v-btn>
                      </template>

                      <template v-slot:default="{ isActive }">
                        <v-card title="Add Ingredients">
                          <v-card-text>
                            <v-form @submit.prevent="submitFormIng">
                              <v-text-field v-model="ingredientsName" label="Ingredients Type"></v-text-field>
                              <v-textarea label="Description" v-model="ingredientsDescription">
                              </v-textarea>
                              <v-btn type="submit" block class="mt-2">Submit</v-btn>
                            </v-form>
                          </v-card-text>

                          <!-- <v-card-actions>
                            <v-spacer></v-spacer>

                            <v-btn text="Close Dialog" @click="isActive.value = false"></v-btn>
                          </v-card-actions> -->
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
                      <template v-slot:itemg.image="{ value }">
                        <v-img :width="100" :height="100" aspect-ratio="16/9" cover
                          :src="'data:image/png;base64,' + value"></v-img>
                      </template>
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
                    <v-btn color="blue" v-bind="props" text="Refresh" style="margin-right: 10px"
                      @click="fetchDataInstructions">
                    </v-btn>
                    <v-dialog v-model="dialogIns" width="500">
                      <template v-slot:activator="{ props }">
                        <v-btn color="blue" v-bind="props" text="ADD"> </v-btn>
                      </template>

                      <template v-slot:default="{ isActive }">
                        <v-card title="Add Instruction">
                          <v-card-text>
                            <v-form @submit.prevent="submitForm">
                              <v-text-field v-model="todo" label="To Do"></v-text-field>
                              <v-textarea label="Description" v-model="deskripsi">
                              </v-textarea>
                              <v-file-input v-model="filename" accept="image/*" clearable label="File input"
                                variant="solo-filled" @change="handleFileChange"></v-file-input>
                              <v-btn type="submit" block class="mt-2">Submit</v-btn>
                            </v-form>
                          </v-card-text>

                          <!-- <v-card-actions>
                            <v-spacer></v-spacer>

                            <v-btn text="Close Dialog" @click="isActive.value = false"></v-btn>
                          </v-card-actions> -->
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
                      <v-img :width="100" :height="100" aspect-ratio="16/9" cover :src="
                        'data:image/png;base64,' +
                        _arrayBufferToBase64(item.image)
                      "></v-img>
                      <!-- <v-btn @click="deleteInstruction(item.id)" color="red" text style="margin-top: 10px">Delete</v-btn> -->
                      <v-dialog width="500" v-model="dialogDelIns">
                        <template v-slot:activator="{ props }">
                          <v-btn v-bind="props" text="Delete" color="red" style="margin-top: 10px"> </v-btn>
                        </template>

                        <template v-slot:default="{ isActive }">
                          <v-card title="Confirmation">
                            <v-card-text>
                              Are you sure to delete this data?
                            </v-card-text>

                            <v-card-actions>
                              <v-spacer></v-spacer>

                              <v-btn text="Yes" @click="deleteInstruction(item.id)"></v-btn>
                              <v-btn text="No" @click="isActive.value = false"></v-btn>
                            </v-card-actions>
                          </v-card>
                        </template>
                      </v-dialog>
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
// CODINGAN NEW
import { ref, onMounted } from "vue";
let recipeSteps = ref([]);
let ingredients = ref([]);
let recipeName = ref("");
let loadingIngredients = ref(Boolean);
let loading = ref(Boolean);
let dialogIng = ref(Boolean);
let dialogIns = ref(Boolean);
let dialogDelIns = ref(Boolean);

let todo = ref("");
let deskripsi = ref("");
let ingredientsName = ref("");
let ingredientsDescription = ref("");
let image;

// Create Broadcast Channel and listen to messages sent to it
const broadcast = new BroadcastChannel("sw-update-channel");

broadcast.onmessage = (event) => {
  if (event.data && event.data.type === "CRITICAL_SW_UPDATE") {
    // Show "update to refresh" banner to the user.
    const payload = event.data.payload;

    // Log the payload to the console
    console.log(payload);
    //show()
  }
};

const handleFileChange = (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = (e) => {
    const imageUrl = URL.createObjectURL(file);
    // image = _arrayBufferToBase64(e.target.result);
    image = e.target.result;
    console.log(image);
  };

  reader.readAsArrayBuffer(file);
};

const _arrayBufferToBase64 = (buffer) => {
  var binary = "";
  var bytes = new Uint8Array(buffer);
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
};

const submitForm = async () => {
  console.log(image);
  const body = {
    todo: todo.value,
    description: deskripsi.value,
    image: image,
  };

  const settings = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };

  try {
    if (body.todo && body.description) {
      const kirimData = await fetch(
        "https://6564bb89ceac41c0761eba72.mockapi.io/api/miniproject/instruction",
        settings
      );
      // window.location.reload();
      fetchData();
      dialogIns.value = false
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

const submitFormIng = async () => {
  console.log(ingredientsName.value)
  const body = {
    name: ingredientsName.value,
    description: ingredientsDescription.value,
  };

  const settings = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };

  try {
    if (body.name && body.description) {
      const kirimData = await fetch(
        "https://6564bb89ceac41c0761eba72.mockapi.io/api/miniproject/ingredients",
        settings
      );
      // window.location.reload();
      fetchData();
      dialogIng.value = false
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

const deleteInstruction = async (instructionId) => {
  try {
    const response = await fetch(
      `https://6564bb89ceac41c0761eba72.mockapi.io/api/miniproject/instruction/${instructionId}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      // window.location.reload();
      fetchData();
      dialogIng.value = false
    } else {
      console.error("Failed to delete instruction");
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

// Define a function to fetch data
const fetchData = () => {
  fetchDataIngredients();
  fetchDataInstructions();
};

const fetchDataIngredients = async () => {
  try {
    const responseIngredients = await fetch(
      "https://6564bb89ceac41c0761eba72.mockapi.io/api/miniproject/ingredients"
    );

    if (responseIngredients.ok) {
      const responseIngredientsTemp = await responseIngredients.json();
      recipeName.value = "Resep Nasi Goreng Spesial";
      ingredients.value = responseIngredientsTemp;
      loadingIngredients.value = false;
    } else {
      console.error("Failed to fetch data");
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

const fetchDataInstructions = async () => {
  try {
    const responseInstructions = await fetch(
      "https://6564bb89ceac41c0761eba72.mockapi.io/api/miniproject/instruction"
    );

    if (responseInstructions.ok) {
      const responseInstructionsTemp = await responseInstructions.json();
      recipeSteps.value = responseInstructionsTemp;
      loading.value = false;
    } else {
      console.error("Failed to fetch data");
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

onMounted(fetchData);
loading.value = true;
dialogIng.value = false;
dialogIns.value = false;
dialogDelIns.value = false;
</script>
