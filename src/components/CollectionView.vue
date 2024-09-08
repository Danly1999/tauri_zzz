<template>
    <div>
        <div v-for="(item,index) in collection_data" :key="index">
            <el-card>
                <div style="display: flex;align-items: center;height: 180px;">
                    <div style="display:grid; justify-content: center;justify-items: center;width: 150px;margin-right: 40px;">
                            <img :src="item.data.url" alt="">
                            <el-text style="margin-top: 20px; text-align: center;font-size: 20px;" :type="GetType()">
                                {{ item.data.id }}
                            </el-text>
                    </div>
                    <div style="display: flex;justify-content: space-around;width: 400px;">
                        <div v-for="(data) in item.equipment" :key="data">
                            <div style="display:grid; justify-content: start">
                                <img :class="`styled-image ${data.state==='未解锁'?'gray':''}`":style="data.state==='已装备'?'width: 100px;':''" :src="data.state==='已装备'?data.url_gif:data.url" alt="" @click="SetCollectionVicw(EnemyDatas[data.id])">
                                <el-button style="margin-top: 20px; " :disabled="data.state==='未解锁'" :plain="data.state==='未解锁'" @click="[AllLock(),data.SetState('已装备')]">
                                    <el-text :type="GetType(data.state)" style="font-size: 18px;font-family: 'CustomFont';">
                                        {{ data.state }}
                                    </el-text>
                                    
                                </el-button>
                            </div>
                        </div>
                    </div>
                </div>
            </el-card>

        </div>
    </div>
</template>

<script>
import { ref,computed } from 'vue';
import { EnemyDatas } from '../assets/EnemyClass.js';
export default {
    props: {
        collection_data: Array,
        SetEnemyData:Function,
    },
    setup (props) {
        const segmented = ref('未解锁')
        const segmented_options = ['未解锁','已解锁','已装备'];
        function GetType(value) {
            switch (value) {
                case '未解锁':
                    console.log('info');
                    return 'info';
                case '已解锁':
                    return 'default';
                case '已装备':
                    return 'warning';
            }
        }
        function AllLock() {
            props.collection_data.forEach(zy => {
                zy.equipment.forEach(zy => {
                    zy.Unlock('已解锁');
                })
            });
        }
        function SetCollectionVicw(data) {
            const c_data = {url:data.url,姓名:data.姓名,攻击力:data.攻击力,防御力:data.防御力};
            props.SetEnemyData(c_data);
        }
        return {
            segmented_options,
            segmented,
            GetType,
            AllLock,
            EnemyDatas,
            SetCollectionVicw,
        }
    }
}
</script>

<style scoped>
.gray {
    transition: all .3s ease;
    filter: grayscale(100%);
    opacity: .6;
}
.styled-image {
    width: 90px;
    border-radius: 50%; /* 圆角，使图片变成圆形 */
  
    border: 5px solid #606060; /* 描边，设置边框颜色和宽度 */
  
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.8); /* 投影，添加阴影效果 */
  
    object-fit: cover; /* 确保图片在容器内完全覆盖，适应圆形 */
}
</style>