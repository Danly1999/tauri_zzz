  <template>
    <el-switch v-model="isBgmPlaying" @change="toggleBgm" active-text="禁音" style="position: absolute;z-index: 1000;right: 5%;"/>
    <el-switch v-model="isDeveloperMode" active-text="开发者模式" style="position: absolute;z-index: 1000;right: 5%;top: 5%;"/>
    <input type="number" v-model="level_id" @change="SceneCreate()" style="position: absolute;z-index: 1000;right: 5%;top: 10%;"/>
    <div v-show="isDeveloperMode">
      <CustomMap />
    </div>
    <div style="display: flex;" v-show="!isDeveloperMode">
      <div style="display: flex;">
        <div>
          <div ref="sceneContainer" ></div>
          <ToneVue ref="ToneVueRef"/>
          <audio ref="bgm" src="/bgm/19.mp3" loop autoplay></audio>
        </div>
        <ThreeUI ref="ThreeUIRef" :player_data="player_data" :enemy_data="enemy_data" :keys_data="keys_data" :can_run="can_run" :discos_data="discos_data" :ChangeRunState="ChangeRunState" :DeletObj="DeletObj" :SetEnemyData="SetEnemyData"/>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted, onUnmounted } from 'vue';
  import {} from '@element-plus/icons-vue';
  import * as THREE from 'three';
  import TWEEN from '@tweenjs/tween.js';
  import * as SHADER from "../assets/ShaderData.js";
  import * as INIT from "../assets/ShaderCreate.js";
  import * as DATA from "../assets/ReadCSV.js";
  import { Enemy,EnemyDatas } from '../assets/EnemyClass.js';
  import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
  import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
  import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
  import ThreeUI from "./ThreeUI.vue";
  import ToneVue from "./ToneVue.vue";
  import CustomMap from "./CustomMap.vue";
  import { sceneContainer,ThreeUIRef,player_data,keys_data,discos_data,enemy_data,enemy_mat_list,level_id,can_run,ToneVueRef } from "../assets/GlobalValue.js";
  export default {
    components:{
      ThreeUI,
      ToneVue,
      CustomMap
    },
    setup() {
      const bgm = ref(null);
      const isBgmPlaying = ref(false);
      const isDeveloperMode = ref(false);
      var scene, camera, renderer, player_obj, bg_obj;
      var main_geometry;
      var composer;
      var sceneObj_list = [];
      var uniforms_post;
      const lightdata = {surl:`obj/move.jpg`,width:3,height:5};
      const light_mat = INIT.CreateFilpBookShader(lightdata)
      const fightdata = {surl:`obj/fighting.jpg`,width:4,height:5};
      const fight_mat = INIT.CreateFilpBookShader(fightdata)
      const initThree = () => {
        // 场景相机渲染器初始化
        scene = new THREE.Scene();
        scene.background = new THREE.Color('#1E1E1E');
        const aspect = 1024 / 1024;
        const d = 6;
        camera = new THREE.OrthographicCamera(
          -aspect * d, aspect * d, d, -d, 0.1, 1000
        );
        camera.position.set(5,5,10);
        renderer = new THREE.WebGLRenderer();
        renderer.setSize(1024, 1024);
        composer = new EffectComposer(renderer);

        // RenderPass渲染场景内物体
        const renderPass = new RenderPass(scene, camera);
        composer.addPass(renderPass);
        sceneContainer.value.appendChild(renderer.domElement);

        // ShaderPass后处理
        // uniforms_post = {
        //   "tDiffuse": { value: null },
        //   "amount": { value: 1.0 }
        // };
        // const customPass = new ShaderPass(INIT.CreateMaterial(uniforms_post,SHADER.frag_post));
        // customPass.renderToScreen = true;
        // composer.addPass(customPass);

        // 前景的小电视遮罩
        const bg_objGeometry = new THREE.PlaneGeometry(11, 11);
        bg_obj = new THREE.Mesh(bg_objGeometry, INIT.CreateShader(`img/tv.png`,SHADER.frag_bg));
        bg_obj.position.set(5, 5, 5); // 设置墙的位置
        scene.add(bg_obj);
  
        // 创建玩家
        main_geometry = new THREE.PlaneGeometry(1,1);
        player_obj = new THREE.Mesh(main_geometry, INIT.CreateShader(`img/num11.png`,SHADER.frag_main));
        player_obj.position.set(0, 0, 1);
        scene.add(player_obj);
        // 动画循环
        const animate = () => {
          requestAnimationFrame(animate);
          INIT.TimeUpdate();// shader中全局变量的更新
          TWEEN.update(); // 更新 TWEEN 动画
          composer.render();//执行渲染
        };
        animate();
        
      };
      //生成场景中的各种元素,初始化和切换关卡时调用
      function SceneCreate() {
        for (let index = 0; index < sceneObj_list.length; index++) {
          const obj = sceneObj_list[index].mesh;
          scene.remove(obj);
        }
        sceneObj_list = [];
        for (let i = 0; i < 11; i++) {
          for (let j = 0; j < 11; j++) {
            const value = DATA.GetMapValue(level_id.value,i,j);
            if(value != 0)
            {
              
              const enemy = new THREE.Mesh(main_geometry, enemy_mat_list.value[value]);
              enemy.position.set(i, j, 0.0);
              const id = `${i}${j}`;
              let data;
              if(EnemyDatas[value].tital&&EnemyDatas[value].tital === '怪')
              {
                data = new Enemy(EnemyDatas[value].姓名,EnemyDatas[value].生命值,EnemyDatas[value].攻击力,EnemyDatas[value].防御力,EnemyDatas[value].url);
              }else
              {
                data = null;
              }
              sceneObj_list.push({id:id,mesh:enemy,data:data});
              scene.add(enemy);
            }
          }
        }
      }
      function DeletObj(x,y,level_id,target) {
          const nameToFind = `${x}${y}`;
          const foundObj = sceneObj_list.find(obj => obj.id === nameToFind);
          sceneObj_list = sceneObj_list.filter(obj => obj !== foundObj);
          DATA.SetMapValue(level_id,target,x,y)
          scene.remove(foundObj.mesh);
        }
      // 玩家移动的事件方法
      const onKeyDown = (event) => {
        if (!can_run.value) {
          return;
        }
        if (event.key === 'a'||event.key === 'A') { // 左键
          moveCube(-1, 0); // 向左移动
        } else if (event.key === 'd'||event.key === 'D') { // 右键
          moveCube(1, 0); // 向右移动
        } else if (event.key === 'w'||event.key === 'W') { // 上键
          moveCube(0, 1); // 向上移动
        } else if (event.key === 's'||event.key === 'S') { // 下键
          moveCube(0, -1); // 向下移动
        }
      };
      // 玩家移动的事件方法
      const moveCube = (h, v) => {
        // 计算新的位置
        const newPosition = new THREE.Vector3(Math.round(player_obj.position.x + h), Math.round(player_obj.position.y + v), Math.round(player_obj.position.z));
        
        // 检测碰撞
        const value = DATA.GetMapValue(level_id.value,Math.round(newPosition.x),Math.round(newPosition.y));
        const found_data = EnemyDatas[value];
        if (found_data == null) {
          return;
        }
        if (!CheckCollision(found_data,newPosition)) {
          if (found_data.tital==='怪'&&(player_data.value.生命值/ Math.max(found_data.攻击力-player_data.value.防御力,1))<(found_data.生命值/ Math.max(player_data.value.攻击力-found_data.防御力,1))) {
            ThreeUIRef.value.ShopInk({姓名:'tips',tital:'无'},newPosition);
            ToneVueRef.value.playBlockedSound()
              return;
          }
          ToneVueRef.value.playSound();
          const light = new THREE.Mesh(main_geometry, light_mat);
          light.position.set(Math.round(player_obj.position.x), Math.round(player_obj.position.y), 0.1); // 设置墙的位置
          scene.add(light);
          setTimeout(() => {
            scene.remove(light);
          }, 200);
          new TWEEN.Tween(player_obj.position)
            .to({ x: newPosition.x, y: newPosition.y }, 200) // 动画到达的新位置
            .easing(TWEEN.Easing.Quartic.Out) // 弹性缓动效果
            .start();
        }
        ThreeUIRef.value.ShopInk(EnemyDatas[value],newPosition);
        switch (found_data.tital) {
          case '上':
            level_id.value++
            SceneCreate();
            NextScene();
            break;
          case '下':
            level_id.value--
            SceneCreate();
            NextScene();
            break;
          case '飞':
            level_id.value = found_data.level_id
            SceneCreate();
            NextScene();
            break;
          case '怪':
            can_run.value = false;
            const nameToFind = `${newPosition.x}${newPosition.y}`;
            WaitFight(found_data,newPosition);
            break;
        
          default:
            break;
        }
      };
      //检查是否能移动
      function CheckCollision(found_data,newPosition){
        switch (found_data.tital) {
          case '门':
            if (found_data.姓名 === '黄门') {
              if(keys_data.value.黄钥匙<=0)
              {
                ToneVueRef.value.playBlockedSound();
                return true;
              }
            }
            if(found_data.姓名 === '蓝门')
            {
              if(keys_data.value.蓝钥匙<=0)
              {
                ToneVueRef.value.playBlockedSound();
                return true;
              }
            }
            if(found_data.姓名 === '红门')
            {
              if(keys_data.value.红钥匙<=0)
              {
                ToneVueRef.value.playBlockedSound();
                return true;
              }
            }
            break;
          case '墙':
            return true;

          default:
            return false;
        }

        return false;
      };
      //等待time秒
      function JustWait(time) {
        return new Promise((resolve)=>{
          setTimeout(() => {
            console.log(`wait ${time/1000}s`);
            resolve();
          }, time);
        })
      }
      async function NextScene(){
        can_run.value = false;
        await JustWait(200);
        can_run.value = true;
      }
      //触发战斗时执行的方法，每次受伤停顿0.4秒
      async function WaitFight(found_data,newPosition) {
        var i = 0;
        const nameToFind = `${newPosition.x}${newPosition.y}`;
        const foundObj = sceneObj_list.find(obj => obj.id === nameToFind);
        enemy_data.value = foundObj.data;
        enemy_data.value.url = enemy_data.value.url
        const fight_obj = new THREE.Mesh(main_geometry, fight_mat);
        fight_obj.position.set(newPosition.x, newPosition.y, 3);
        scene.add(fight_obj);
        let t = 200;
        while (enemy_data.value.生命值>0) {
          enemy_data.value.生命值 = foundObj.data.Damage(player_data.value.攻击力);
          player_data.value.生命值 = foundObj.data.Attack(player_data.value.生命值,player_data.value.防御力);
          t = Math.max(t-5,10);
          await JustWait(t);
        }
        if(player_data.value.生命值<=0)
        {
          window.location.reload();
        }
        enemy_data.value.生命值 = 1;
        enemy_data.value = {url:''};
        scene.remove(fight_obj);
        player_data.value.$+=found_data.kane;
        can_run.value = true;
      }
  
      // 创建射线投射器
      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2();

      // 鼠标点击获取obj信息
      const onMouseMove = (event) => {

        // 将鼠标位置转换为归一化设备坐标 (NDC)
        mouse.x = (event.clientX / 1024) * 2 - 1;
        mouse.y = -(event.clientY / 1024) * 2 + 1;

        // 通过相机和鼠标位置更新射线
        raycaster.setFromCamera(mouse, camera);

        // 计算射线和一个假想平面 (z = 0) 的交点
        const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
        const point = new THREE.Vector3();
        raycaster.ray.intersectPlane(plane, point);
        const pointx = Math.round(point.x);
        const pointy = Math.round(point.y);

        const value = DATA.GetMapValue(level_id.value,pointx,pointy);
        if(value === 0)
        {
          return;
        }
        const found_data = EnemyDatas[value];
        
        
        if (found_data== null) {
          return
        }
          if(found_data.tital === '怪')
          {
            enemy_data.value = {url:found_data.url,姓名:found_data.姓名,生命值:found_data.生命值,攻击力:found_data.攻击力,防御力:found_data.防御力};
          }else
          {
            enemy_data.value = {url:found_data.url,姓名:found_data.姓名};
          }
        
      };
      function SetEnemyData(data) {
        enemy_data.value = data;
      }
      function ChangeRunState(bool) {
        can_run.value = bool;
      }
      const toggleBgm = () => {
        if (!isBgmPlaying.value) {
          bgm.value.play();
        } else {
          bgm.value.pause();
        }
      };
      onMounted(() => {
        initThree();
        enemy_mat_list.value = INIT.AwakeCreate();
        SceneCreate();
        // 添加键盘事件监听器
        window.addEventListener('mousedown', onMouseMove, false);
        window.addEventListener('keydown', onKeyDown);
        // 播放背景音乐
        bgm.value.play();
        bgm.value.playbackRate = 0.9;
        bgm.value.volume = 0.4;
      });
  
      onUnmounted(() => {
        window.removeEventListener('keydown', onKeyDown);
        // 停止背景音乐
        bgm.value.pause();
      });
  
      return {
        sceneContainer,
        level_id,
        SceneCreate,
        ThreeUIRef,
        player_data,
        enemy_data,
        keys_data,
        can_run,
        discos_data,
        ChangeRunState,
        DeletObj,
        SetEnemyData,
        ToneVueRef,
        bgm,
        toggleBgm,
        isBgmPlaying,
        isDeveloperMode,
      };
    }
  };
  </script>
  