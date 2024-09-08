<script setup>
import * as DATA from "../assets/CustomReadCSV.js";
import { EnemyDatas } from "../assets/EnemyClass.js";
import {level_id} from "../assets/GlobalValue.js";
import { ref,onMounted } from "vue";
const sceneObj_list = ref([])
const select_value = ref('B')
const handleChange = () => {
  sceneObj_list.value = [];
  for (let i = 0; i < 11; i++) {
    for (let j = 0; j < 11; j++) {
      const value = DATA.GetMapValue(level_id.value,i,j);
      sceneObj_list.value.push(value);
    }
  }
}
function ChangeObj(id) {
  console.log(select_value.value)
  sceneObj_list.value[id] = DATA.MapLetterToNumber(select_value.value);
}
function GetValeu() {
  var list = "";
  sceneObj_list.value.forEach((item, index) => {
    list += EnemyDatas[item].id;
    if ((index + 1) % 11 === 0) {
      list += "\n"; // 每11次换行
    }
  });
  return list;
}

onMounted(() => {
  handleChange(); // 调用 handleChange 函数
});

</script>

<template>
  <input type="number" v-model="level_id" @change="handleChange()"/>
  <el-select
      v-model="select_value"
      placeholder="Select"
      size="large"
      style="width: 240px"
    >
      <el-option
        v-for="item in EnemyDatas"
        :key="item.id"
        :label="item.姓名"
        :value="item.id"
      />
    </el-select>
  <div class="grid-container" style="width: 600px;">
    <div v-for="(item, index) in sceneObj_list" :key="index" class="grid-item">
      <img :src="EnemyDatas[item]?.url" :alt="item" style="width: 50px;" @click="ChangeObj(index)"/>
    </div>
  </div>
  <textarea rows="11" cols="11">{{ GetValeu(sceneObj_list.value)}}</textarea>
</template>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(11, 1fr);
  grid-template-rows: repeat(11, 1fr);
  gap: 3px; /* 可根据需要调整间距 */
}
</style>
