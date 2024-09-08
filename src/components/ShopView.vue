<template>
    <div style="height: 180px;">
        <div style="display: flex;justify-content: space-around">
            <div v-for="(item,index) in video_list" :key="index"
            :class="GetClass(item)?'normal':'up'">
                <div v-for="(value,key) in item" :key="key" >
                        <div v-if="key!=='url'&&value!==0">
                            {{ key }}.{{ value }}
                        </div>
                        <img v-if="key=='url'" :src=value alt="">
                    </div>
                    <div v-if="GetClass(item)">
                        无提升
                    </div>
                <el-button v-if="!GetClass(item)" @click="ChangeVidio(item)" size="small" type="warning" plain :icon="Pointer" style="margin-top: 5px;"/>
            </div>
            <div v-if="video_list.length===0">
                <img src="/bqb/安比.png" style="width: 150px;image-rendering: pixelated;">
            </div>
        </div>
    </div>
    <div >
        <el-button @click="One()" :disabled="player_data.$<=0">
            <el-text :type="player_data.$<=0?'':'warning'" style="font-family: 'CustomFont';">
                {{player_data.$<=0?'缺钱 ':''}}单抽 1$
            </el-text>
        </el-button>
        <el-button v-if="player_data.等级>1" :disabled="player_data.$<4" @click="Ten(5,1)">
            <el-text :type="player_data.$<4?'':'warning'" style="font-family: 'CustomFont';">
                {{player_data.$<4?'缺钱 ':''}}五连 4$
            </el-text>
        </el-button>
        <el-button v-if="player_data.等级>7" :disabled="player_data.$<7" @click="Ten(10,3)">
            <el-text :type="player_data.$<7?'':'warning'" style="font-family: 'CustomFont';">
                {{player_data.$<7?'缺钱 ':''}}十连! 7$
            </el-text>
        </el-button>
        <div style="margin-top: 10px;">
            {{ probability }}
        </div>
    </div>
</template>

<script>
import { ref,computed } from 'vue';
import {Pointer} from '@element-plus/icons-vue'
import { player_data } from '../assets/GlobalValue';
export default {
    props: {
        discos_data: Array,
        player_data: Object,
    },
    setup (props) {
        const video_list = ref([]);
        const probability = computed(() => {
            const value = Math.min(props.player_data.等级,75)
            const output = `概率: B:${(100-value-Math.log(value)).toFixed(2)}%; A:${value.toFixed(2)}%; S:${Math.log(value).toFixed(2)}%;`
            return output;
        })
        function GetClass(item) {
            const source = props.discos_data[item.NO-1].攻击力+props.discos_data[item.NO-1].防御力;
            const target = item.攻击力+item.防御力;
            return  source>=target;

        }
        function ChangeVidio(item) {
            if(props.discos_data[item.NO-1])
            {
                props.player_data.攻击力-=props.discos_data[item.NO-1].攻击力;
                props.player_data.防御力-=props.discos_data[item.NO-1].防御力;
            }
            props.discos_data[item.NO-1] = item;
            props.player_data.攻击力+=item.攻击力;
            props.player_data.防御力+=item.防御力;
            //video_list.value = video_list.value.filter(obj => obj !== item);
        }
        function SingoGet(level) {
            const value = Math.min(level,75)
            const s = Math.log(value);
            const a = Math.log(value)+value;

            const range = Math.random()*100;
            return range<s?'S':range<a?'A':'B';
        }
        function Ten(nub,add) {
            video_list.value = [];
            props.player_data.$ += add;
            for (let index = 0; index < nub; index++) {
                Singo();
            }
        }
        function One() {
            video_list.value = [];
            Singo();
        }
        function Singo() {
            if(props.player_data.$>0)
            {
                props.player_data.$--;
            }else
            {
                return;
            }
            props.player_data.经验++
            if(props.player_data.经验>=props.player_data.等级*2)
            {
                props.player_data.经验 = 0;
                props.player_data.等级++;
            }
            
            const level = SingoGet(props.player_data.等级);
            const player_level = props.player_data.等级;
            const range = Math.floor(Math.random()*(1-7)+7);
            const isact = range<4;
            switch (level) {
                case 'S':
                    video_list.value.push({NO:range,url:'/img/disco_yellow.png',lv:props.player_data.等级,   攻击力:isact?Math.round(player_level+player_level/2):0,防御力:isact?0:Math.round(player_level+player_level/2),品级:level})
                    break;
                case 'A':
                    video_list.value.push({NO:range,url:'/img/disco_red.png',lv:props.player_data.等级,攻击力:isact?Math.round(player_level+player_level/4):0,防御力:isact?0:Math.round(player_level+player_level/4),品级:level})
                    break;
                case 'B':
                    video_list.value.push({NO:range,url:'/img/disco_blur.png',lv:props.player_data.等级,  攻击力:isact?player_level:0,防御力:isact?0:player_level,品级:level})
                    break;
            }
        }

        return {
            video_list,
            One,
            Ten,
            probability,
            GetClass,
            ChangeVidio,
            Pointer,
        }
    }
}
</script>

<style scoped>

.up{
    display: flex;flex-direction: column;align-items: center;font-size: 17px;
    color: greenyellow;
}
.up:hover{
    text-shadow:
    -1px -1px 0 #000, /* 左上 */
    1px -1px 0 #000,  /* 右上 */
    -1px 1px 0 #000,  /* 左下 */
    1px 1px 0 #000;   /* 右下 */
    font-size: 18px;
}
.normal{
    display: flex;flex-direction: column;align-items: center;font-size: 15px;
}
</style>