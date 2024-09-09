import { ref } from 'vue';
import { Vector2 } from 'three';
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
const level_pos = 
[
    new Vector2(5,10),
    new Vector2(5,10),
    new Vector2(0,0),
    new Vector2(0,10),
    new Vector2(10,10),
    new Vector2(0,10),
    new Vector2(9,10),
    new Vector2(4,10),
    new Vector2(0,0),
    new Vector2(6,6),
    new Vector2(0,0),
    new Vector2(7,10),
    new Vector2(5,10),
    new Vector2(5,0),
    new Vector2(6,10),
];
const level_enemy = 
[
    [],
    [0,1,2],
    [0,1,2],
    [0,1,2],
    [0,1,2],
    [0,1,2],
    [0,1,2],
    [0,1,2],
    [0,1,2],
    [0,1,2],
    [0,1,2],
    [0,1,2],
    [0,1,2],
    [0,1,2],
    [0,1,2],
    [0,1,2],
];
export{sceneContainer,ThreeUIRef,ToneVueRef,player_data,keys_data,discos_data,enemy_data,enemy_mat_list,level_id,can_run,level_pos,level_enemy}