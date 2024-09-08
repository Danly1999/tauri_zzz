<template>
    <div>
        <el-card>
            <template #header>
            <div class="card-header">
                <div style="display: flex;justify-content: space-between">
                    <span>Player</span>
                    <span>enemy</span>
                </div>
            </div>
            </template>
            <img src="/00.png" alt="" style="width: 200px;">
            <template #footer>
                <div style="display: flex;justify-content: space-between;align-items: center;">
                    <div>
                        <div v-for="(value,key) in player_data" :key="key" class="text item">
                            {{ key }} : {{ value }}
                        </div>
                    </div>
                    <div style="margin-left: 10px;margin-right: 10px;">
                        vs
                    </div>
                    <div>
                        <div v-for="(value,key) in enemy_data" :key="key" class="text item">
                            {{ key }} : {{ value }}
                        </div>
                    </div>
                </div>
            </template>
        </el-card>
    </div>
    <div v-if="datas!==null">
        <el-card style="max-width: 480px">
        <template #header>
            <div class="card-header">
                <span>{{ datas.name }}</span>
            </div>
        </template>
        <img :src="datas.url" alt="" style="width: 200px;">
        <template #footer>
            <div v-for="(value,key) in datas" :key="key" class="text item">
                <div v-if="key!=='url'&&key!=='name'">
                    {{ key }} : {{ value }}
                </div>
            </div>
        </template>
        </el-card>
    </div>
</template>

<script>
    import { ref } from 'vue';
export default {
    setup () {
        const datas = ref(null);
        const player_data = ref({生命值:100,攻击力:5,防御力:0});
        const enemy_data  = ref({生命值:20,攻击力:5,防御力:2});
        function SetData(inputdata) {
            datas.value = inputdata;
            console.log(datas.value);
        }
        return {
            datas,
            player_data,
            enemy_data,
            SetData
        }
    }
}
</script>

<style lang="scss" scoped>

</style>