<script setup>
import HelloWorld from './components/HelloWorld.vue'
import { onMounted, ref } from 'vue';
import WebFont from 'webfontloader';
const el = ref(false);
onMounted(() => {
      WebFont.load({
        google: {
          families: ['CustomFont']
        },
        active: () => {
          el.value = true;
        },
        inactive: () => {
          window.location.reload();
        }
      });
    });
</script>

<template>
  <div v-if="!el" style="width: 500px; margin-top: 20%; margin-left: 20%;">
    <el-progress :percentage="100" :format="format" :indeterminate="true" />
    少女祈祷中
  </div>
  <div v-if="el">
    <HelloWorld />
  </div>
</template>

<style>
body {
  font-family: 'CustomFont';
  font-size: 20px;
  overflow: hidden;
} 
</style>
