<template>
  <div class="map-wrap">
    <div class="map" ref="mapContainer"></div>
  </div>
</template>

<script setup>
import { Map, MapStyle, Marker, config } from "@maptiler/sdk";
import { shallowRef, onMounted, onUnmounted, markRaw } from "vue";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import { computed } from "vue";
import { useGeolocation } from "../composable/useGeoLocation";
import { watchEffect } from "vue";

const mapContainer = shallowRef(null);
const map = shallowRef(null);

const { kordinat } = useGeolocation();
const posisiUser = computed(() => ({
  lat: kordinat.value.latitude,
  lng: kordinat.value.longitude,
}));

onMounted(() => {
  config.apiKey = "pmK0SsO9tWbYnxSzS7kN";

  const initialState = { lng: 139.753, lat: 35.6844, zoom: 14 };

  map.value = markRaw(
    new Map({
      container: mapContainer.value,
      style: MapStyle.STREETS,
      center: [initialState.lng, initialState.lat],
      zoom: initialState.zoom,
    })
  );

  watchEffect(() => {
    console.log(posisiUser.value);
    new Marker({ color: "#FF0000" })
      .setLngLat([139.7525, 35.6846])
      .addTo(map.value);
  });
}),
  onUnmounted(() => {
    map.value?.remove();
  });
</script>

<style scoped>
.map-wrap {
  position: relative;
  width: 100%;
  height: calc(
    100vh - 77px
  ); /* calculate height of the screen minus the heading */
}

.map {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
