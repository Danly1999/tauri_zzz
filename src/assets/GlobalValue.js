import { ref } from 'vue';
const sceneContainer = ref(null);
const ThreeUIRef = ref(null);
const ToneVueRef = ref(null);
const player_data = ref({生命值:1000,攻击力:10,防御力:10,等级:1,$:1,经验:0});
const keys_data = ref({黄钥匙:1,蓝钥匙:1,红钥匙:0});
const discos_data = ref([
{url:'',生命值:0,攻击力:0,防御力:0,品级:'B'},
{url:'',生命值:0,攻击力:0,防御力:0,品级:'B'},
{url:'',生命值:0,攻击力:0,防御力:0,品级:'B'},
{url:'',生命值:0,攻击力:0,防御力:0,品级:'B'},
{url:'',生命值:0,攻击力:0,防御力:0,品级:'B'},
{url:'',生命值:0,攻击力:0,防御力:0,品级:'B'}
]);
const enemy_data = ref({url:''});
const enemy_mat_list = ref([]);
const level_id = ref(0);
const can_run = ref(true);

export{sceneContainer,ThreeUIRef,ToneVueRef,player_data,keys_data,discos_data,enemy_data,enemy_mat_list,level_id,can_run}