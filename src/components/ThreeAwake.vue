<template>
    <div>
        
    </div>
</template>

<script>
import * as THREE from 'three';
import { ref, onMounted } from 'vue';
import * as SHADER from "../assets/ShaderData.js";
export default {
    setup() {
        const enemy_mat_list = ref([]);
        function AwakeCreate() {
            for (let index = 0; index < 7; index++) {
                const enemyTex = new THREE.TextureLoader().load(`0${index}.png`);
                enemyTex.wrapS = THREE.RepeatWrapping;
                enemyTex.wrapT = THREE.RepeatWrapping;
                enemyTex.minFilter = THREE.NearestFilter;
                enemyTex.magFilter = THREE.NearestFilter;
                const enemy_uniforms = {
                    time: { value: 0.0 },
                    iResolution: { value: new THREE.Vector2(1024,1024) },
                    _MainTex: { type: 't', value: enemyTex },
                };
                const constenemy_material = new THREE.ShaderMaterial({
                vertexShader: SHADER.vert,
                fragmentShader: SHADER.frag_main,
                uniforms: enemy_uniforms,
                transparent: true
                });
                enemy_mat_list.value.push(constenemy_material);
            }
        };
        return{
            enemy_mat_list,
            AwakeCreate
        }
    }
}
</script>