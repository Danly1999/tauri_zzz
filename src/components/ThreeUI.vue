<template>
    <div>
        <div ref="sceneUIRef" >
            <div v-if="!can_run" id="info" style="z-index:101;margin-left: 330px;margin-top: 90px;font-size: 20px;color:brown">
                <img src="/img/Fight.png" alt="" style="width: 80px;image-rendering: pixelated;">
            </div>
            <div id="info">
                <div style="display: flex;font-size: 18px; margin-top: 140px;margin-left: 100px;">
                    <div style="display: flex;flex-direction: column">
                        <div v-for="(value,key) in enemy_data" :key="key" >
                            <div v-if="key!=='url'" style="width: 100px;">
                                {{ key }} : {{ value }}
                            </div>
                        </div>

                    </div>
                    <div style="margin-left: 30px;">
                        <img :src=enemy_data.url alt="" style="width: 100px;image-rendering: pixelated;">
                    </div>
                </div>
            </div>
            <div id="info" style="display: flex;font-size: 20px; margin-top: 265px;margin-left: 100px;">
                <div>
                    LV:
                </div>
                <div style="display: flex;margin-left: 40px;">
                    {{ player_data.等级 }}
                </div>
            </div>
            <div id="info" style="display: flex;font-size: 20px; margin-top: 265px;margin-left: 250px;">
                <div>
                    经验:
                </div>
                <div style="display: flex;margin-left: 40px;">
                    {{ `${player_data.经验}/${player_data.等级*2}` }}
                </div>
            </div>
            <div id="info" style="display: flex;font-size: 20px; margin-top: 378px;margin-left: 100px;color: #ff8c00;">
                    $ : {{ player_data.$ }}
            </div>
            <div id="info" class="circle-container" style="width: 500px;height: 500px;margin-left: 310px;margin-top: 5px;">
                    <div class="circle-item" v-for="(item,index) in discos_data" :key="index" >
                        <img :src="item.url" alt="" style="width: 70px;image-rendering: pixelated;" @click="ViewDisco(index)">
                    </div>
            </div>
            <div id="info" style="	margin-top: 296px;margin-left: 90px;font-size: 18px;">
                <div style="display: flex;justify-content: space-between;">
                    <div>
                        <div v-for="(value,key) in player_data" :key="key" style="margin-top: 6px;">
                            <div v-if="key!=='等级'&&key!=='$'&&key!=='经验'">
                                {{ key }} : {{ value }}
                            </div>
                        </div>
                    </div>
                    <div style="margin-left: 50px;">
                        <div v-for="(value,key) in keys_data" :key="key" style="margin-top: 6px;">
                            <div>
                                {{ key }} : {{ value }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="info" class="custom-style" style="margin-top: 460px;margin-left: 43px;">
                <el-card style="width: 700px">
                    <template #header>
                    <div class="card-header">
                        <el-segmented v-model="segmented" :options="segmented_options" block style="font-size: 30px;"/>
                    </div>
                    </template>
                    <el-text style="position: absolute;z-index: 1000;right: 5%;bottom: 2%;font-size: 80px;color:grey; opacity: 0.1;">
                        第{{level_id}}层
                    </el-text>
                    <div v-if="segmented==='任务'" style="height: 300px;overflow:auto">
                        <div v-for="(item,index) in test" :key="index">
                            <el-text v-if="item.state!=='未开'" style="font-size: 20px;" :tag="item.state==='完成'?'del':'p'" :type="item.state==='完成'?'info':''">
                                {{ item.tips }} {{ item.state==='完成'?'(完成)':'' }}
                            </el-text>
                            <el-text style="font-size: 30px;color: #ff8c00;">
                            {{ item.state==='完成'?` + ${item.kane}$`:'' }}
                            </el-text>
                        </div>
                    </div>
                    <div v-if="segmented==='简介'">
                        <br>使用vue+three开发的同人游戏,玩的开心 ^ ^.<br><br>
                    </div>
                    <div v-if="segmented==='商店'"style="height: 230px;">
                        <ShopView :discos_data="discos_data" :player_data="player_data"/>
                    </div>
                    <div v-show="segmented==='对话'"style="height: 300px;overflow:auto">
                        <InkView ref="InkViewRef" :AfterShopping="AfterShopping" :player_data="player_data" :keys_data="keys_data" :DeletObj="DeletObj"/>
                    </div>
                    <div v-show="segmented==='收藏'"style="height: 300px;overflow:auto">
                        <CollectionView :collection_data="collection_data" :SetEnemyData="SetEnemyData"/>
                    </div>
                    <template #footer>
                        <div v-if="segmented==='简介'">
                            个人主页:
                            <a href="http://danly.club" target="_blank" rel="noopener noreferrer">
                                DANLY GAMES
                            </a>
                        </div>
                        <div v-if="segmented==='商店'" >
                            <el-text style="font-size: 15px;color: #ff8c00;">
                                *每花一块钱获得一点经验
                            </el-text><br>  
                        </div>
                        <div v-if="segmented==='对话'&&!can_run" >
                            <el-text style="font-size: 15px;color: #ff8c00;">
                                *需要完成对话或战斗才能移动
                            </el-text><br>  
                        </div>
                        
                    </template>
                </el-card>
            </div>
        </div>
    </div>
</template>

<script>
import { ref,onMounted } from 'vue';
import * as INIT from "../assets/ShaderCreate.js";
import * as SHADER from "../assets/ShaderData.js";
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { test } from '../assets/TaskEvent.js';
import InkView from "./InkView.vue";
import ShopView from "./ShopView.vue";
import CollectionView from "./CollectionView.vue";
import { collection_list } from '../assets/CollectionData'
import { player_data,keys_data,discos_data,enemy_data,can_run,level_id,ToneVueRef } from "../assets/GlobalValue.js";
export default {
    components:{
        InkView,
        ShopView,
        CollectionView,
    },
    props: {
        ChangeRunState: Function,
        DeletObj: Function,
        SetEnemyData: Function,
    },
    setup (props) {
        var scene, camera, renderer,composer;
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();
        const sceneUIRef = ref(null);
        const InkViewRef = ref(null);
        const segmented = ref('任务');
        const collection_data = ref(collection_list);
        const segmented_options = ['任务','对话','商店','收藏','简介']
        const initThree = () => {
        // 创建场景
        scene = new THREE.Scene();
        scene.background = new THREE.Color('#1E1E1E');
  
        // 创建正交相机
        const aspect = 786 / 1024;
        const d = 6;
        camera = new THREE.OrthographicCamera(
          -aspect * d, aspect * d, d, -d, 0.1, 1000
        );
        camera.position.set(5,5,10);
        //camera.position.z = 10;
        
        // 创建渲染器
        renderer = new THREE.WebGLRenderer();
        renderer.setSize(786, 1024);
        composer = new EffectComposer(renderer);
        // 创建一个RenderPass
        const renderPass = new RenderPass(scene, camera);
        composer.addPass(renderPass);
        sceneUIRef.value.appendChild(renderer.domElement);

        
        const bg_geometry = new THREE.PlaneGeometry(8,4);
        const mesh = new THREE.Mesh(bg_geometry, INIT.CreateShader('img/DanlyBG.jpg',SHADER.frag_danly_bg));
        mesh.position.set(5, 8, 5); 
        mesh.name = "PlayerData";
        scene.add(mesh);

        const player_data_geometry = new THREE.PlaneGeometry(4,4);
        const player_data_mesh = new THREE.Mesh(player_data_geometry, INIT.CreateShader(`img/PlayerData.png`,SHADER.frag_main));
        player_data_mesh.position.set(3.1, 8, 5); 
        scene.add(player_data_mesh);

        const group_geometry = new THREE.PlaneGeometry(4,4);
        const group_mesh = new THREE.Mesh(group_geometry, INIT.CreateShader(`img/ClipGroup.png`,SHADER.frag_main));
        group_mesh.position.set(7, 8, 5); 
        scene.add(group_mesh);
        document.fonts.load('40px "CustomFont"').then(() => {
            // 创建一个canvas并绘制文本
            const canvas = document.createElement('canvas');
            canvas.width = 150;
            canvas.height = 150;
            const context = canvas.getContext('2d');
            context.font = 'Bold 20px CustomFont';
            context.fillStyle = 'white';
            context.textAlign = 'center';  // 水平居中对齐
            context.textBaseline = 'middle';  // 垂直居中对齐
            context.fillText('DANLY GAMES!', canvas.width/2, canvas.height/2); 
    
            // 创建一个纹理并将canvas的内容应用到纹理上
            const texture = new THREE.CanvasTexture(canvas);
    
            // 使用该纹理创建一个材质
            const geometry = new THREE.PlaneGeometry(2,1);
            const mesh = new THREE.Mesh(geometry, INIT.CreateShaderOnCanvas(texture,SHADER.frag_clip_text));
            mesh.position.set(7, 8, 5); 

            scene.add(mesh);
        })
        // 动画循环
        const animate = () => {
            requestAnimationFrame(animate);
            composer.render();
            INIT.TimeUpdate();
        };
        animate();
        
    };
        function AfterShopping() {
            //segmented.value = '任务'
            props.ChangeRunState(true);
            
        }
        function ShopInk(id,newPosition) {
            InkViewRef.value.CreateStory(id.姓名).then(result => {
                if(result.have_ink)
                {
                    if(result.need_stop)
                    {
                        props.ChangeRunState(false);
                    }
                    if(result.need_dele)
                    {
                        props.DeletObj(newPosition.x,newPosition.y,level_id.value,"A");
                    }
                    if(id.tital === '货')
                    ToneVueRef.value.playItemPickupSound();

                    if(id.tital === '怪')
                    {
                        ToneVueRef.value.playBattleSound();
                    }
                    if(id.tital !== '怪')
                    {
                        segmented.value = '对话'
                    }
                }
            })
            

        }
      function ViewDisco(id) {
          var data = {url:''}
          data.url = discos_data.value[id].url
          data.姓名 = `${id+1}号音擎 (${discos_data.value[id].品级})`
          data.等级 = `LV.${discos_data.value[id].lv}`
          data.攻击力 = `+${discos_data.value[id].攻击力}`
          data.防御力 = `+${discos_data.value[id].防御力}`
          props.SetEnemyData(data)
      }
      onMounted(() => {
        initThree();

      });
        return {
            sceneUIRef,
            ViewDisco,
            segmented_options,
            segmented,
            test,
            InkViewRef,
            ShopInk,
            AfterShopping,
            collection_data,
            player_data,keys_data,discos_data,enemy_data,can_run ,level_id
        }
    }
}
</script>

<style>
#info {
	position: absolute;
    white-space: nowrap;
	z-index: 100;
    user-select: none; /* 禁用选择 */
    -webkit-user-drag: none; /* 禁用拖拽 (Webkit browsers) */
    -moz-user-select: none; /* 禁用选择 (Mozilla) */
    -webkit-touch-callout: none; /* 禁用长按 (iOS) */
}
.custom-style .el-segmented {
  --el-segmented-item-selected-bg-color: #ff8c00;
}
.circle-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.circle-item {
  position: absolute;

  display: flex;
  justify-content: center;
  align-items: center;
}

/* 布局圆环的元素 */
.circle-item:nth-child(5) { transform: translate(-5%, 0%)    rotate(0deg) translate(120px) rotate(0deg); }
.circle-item:nth-child(4) { transform: translate(15%, -10%)  rotate(60deg) translate(120px) rotate(-60deg); }
.circle-item:nth-child(3) { transform: translate(-10%, -10%) rotate(120deg) translate(120px) rotate(-120deg); }
.circle-item:nth-child(2) { transform: translate(13%, 0%)    rotate(180deg) translate(120px) rotate(-180deg); }
.circle-item:nth-child(1) { transform: translate(-10%, 12%) rotate(240deg) translate(120px) rotate(-240deg); }
.circle-item:nth-child(6) { transform: translate(17%, 12%) rotate(300deg) translate(120px) rotate(-300deg); }
</style>