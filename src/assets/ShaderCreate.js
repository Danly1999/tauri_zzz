import * as THREE from 'three';
import * as SHADER from "./ShaderData.js";
import {EnemyDatas} from './EnemyClass.js'
const globalUniforms = {
  time: { value: 0.0 },
  iResolution: { value: new THREE.Vector2(1024,1024) },
};
function CreateMaterial(uniforms,frag) {
  const mat = new THREE.ShaderMaterial({
    vertexShader: SHADER.vert,
    fragmentShader: frag,
    uniforms: uniforms,
    transparent: true
  });
  return mat;
}
function CreateShader(tex_name,frag) {
  const enemyTex = new THREE.TextureLoader().load(`${tex_name}`);
  enemyTex.wrapS = THREE.RepeatWrapping;
  enemyTex.wrapT = THREE.RepeatWrapping;
  enemyTex.minFilter = THREE.NearestFilter;
  enemyTex.magFilter = THREE.NearestFilter;
  const enemy_uniforms = Object.assign({}, globalUniforms, {
    _MainTex: { type: 't', value: enemyTex },
  });
  const mat = CreateMaterial(enemy_uniforms,frag);
  return mat;
}
function CreateShaderOnCanvas(canvas_tex,frag) {
  canvas_tex.minFilter = THREE.NearestFilter;
  canvas_tex.magFilter = THREE.NearestFilter;
  const enemy_uniforms = Object.assign({}, globalUniforms, {
    _MainTex: { type: 't', value: canvas_tex },
  });
  const mat = CreateMaterial(enemy_uniforms,frag);
  return mat;
}
function CreateFilpBookShader(data) {
  const enemyTex = new THREE.TextureLoader().load(`${data.surl}`);
  enemyTex.wrapS = THREE.RepeatWrapping;
  enemyTex.wrapT = THREE.RepeatWrapping;
  enemyTex.minFilter = THREE.NearestFilter;
  enemyTex.magFilter = THREE.NearestFilter;
  const enemy_uniforms = Object.assign({}, globalUniforms, {
    _MainTex: { type: 't', value: enemyTex },
    _Width: { value: data.width },
    _Height: { value: data.height },
  });
  const mat = CreateMaterial(enemy_uniforms,SHADER.frag_flipbook);
  return mat;
}

function GetParticle() {
  return CreateShader(`0${1}.png`,SHADER.frag_main);
}

function AwakeCreate() {
  var enemy_mat_list = [];
  for (let index = 0; index < EnemyDatas.length; index++) {
    if(EnemyDatas[index].surl)
      {
        const mat = CreateFilpBookShader(EnemyDatas[index]);
        enemy_mat_list.push(mat);
      }else
      {
        enemy_mat_list.push(CreateShader(EnemyDatas[index].url,SHADER.frag_main));
      }
  }
  return enemy_mat_list;
};
var time = new THREE.Clock();
time.start()

function TimeUpdate() {
  
  globalUniforms.time.value += time.getDelta()*20;
}
export{ CreateShader,GetParticle,AwakeCreate,CreateMaterial,TimeUpdate,CreateShaderOnCanvas,CreateFilpBookShader }