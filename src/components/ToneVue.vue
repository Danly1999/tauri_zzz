<!-- src/components/AdvancedToneSynth.vue -->
<template>


</template>

<script>
import { ref } from 'vue';
import * as Tone from 'tone';
import { throttle } from 'lodash';

export default {
  name: 'AdvancedToneSynth',
  setup() {
    const waveform = ref('triangle');
    const frequency = ref(220);
    const attack = ref(0.1);
    const release = ref(0.5);
    const synthVolume = ref(-28); // 合成器音量，单位为分贝
    const noiseVolume = ref(-22); // 噪声音量，单位为分贝
    const noiseType = ref('pink'); // 噪声类型
    const noiseAttack = ref(0.1); // 噪声进入延迟
    const noiseRelease = ref(0.5); // 噪声结束延迟
    const synthVolumeNode = new Tone.Volume(synthVolume.value).toDestination(); // 创建合成器音量控制节点
    const noiseVolumeNode = new Tone.Volume(noiseVolume.value).toDestination(); // 创建噪声音量控制节点
    const reverb = new Tone.Reverb({
      decay: 3,
      preDelay: 0.01,
    }).toDestination();
    reverb.wet.value = 0.5;
    synthVolumeNode.connect(reverb); // 将合成器音量控制节点连接到混响效果器
    noiseVolumeNode.connect(reverb); // 将噪声音量控制节点连接到混响效果器
    let synth;
    let noise;
    let noiseEnvelope;

    const playSound = throttle(() => {
      if (synth) {
        synth.triggerRelease(Tone.now() + 0.1); // 使用淡出效果释放之前的音效
      }
      if (noise) {
        noise.stop(); // 停止之前的噪声
      }

      synth = new Tone.Synth({
        oscillator: {
          type: waveform.value,
        },
        envelope: {
          attack: attack.value,
          release: release.value,
        },
      }).connect(synthVolumeNode); // 将合成器连接到合成器音量控制节点

      noise = new Tone.Noise(noiseType.value).start(); // 创建并启动指定类型的噪声
      noiseEnvelope = new Tone.AmplitudeEnvelope({
        attack: noiseAttack.value,
        release: noiseRelease.value,
      }).connect(noiseVolumeNode); // 将噪声包络连接到噪声音量控制节点
      noise.connect(noiseEnvelope); // 将噪声连接到噪声包络

      synth.triggerAttackRelease(frequency.value, '16n');
      noiseEnvelope.triggerAttackRelease('16n'); // 触发噪声包络
    }, 200); // 限制每500毫秒触发一次音效

    const playItemPickupSound = () => {
      const itemPickupSynth = new Tone.Synth({
        oscillator: {
          type: 'triangle',
        },
        envelope: {
          attack: 0.05,
          decay: 0.1,
          sustain: 0.3,
          release: 0.2,
        },
      });

      const itemPickupVolume = new Tone.Volume(-12).toDestination(); // 设置音量为-12分贝

      itemPickupSynth.connect(itemPickupVolume); // 将合成器连接到音量控制节点

      itemPickupSynth.triggerAttackRelease('C5', '8n');
      itemPickupSynth.triggerAttackRelease('E5', '8n', '+0.1');
      //itemPickupSynth.triggerAttackRelease('G5', '8n', '+0.2');
    };

    const playBlockedSound = () => {
      const blockedSynth = new Tone.Synth({
        oscillator: {
          type: 'sawtooth',
        },
        envelope: {
          attack: 0.01,
          decay: 0.2,
          sustain: 0.1,
          release: 0.3,
        },
      });

      const blockedVolume = new Tone.Volume(-5).toDestination(); // 设置音量为-10分贝

      blockedSynth.connect(blockedVolume); // 将合成器连接到音量控制节点

      blockedSynth.triggerAttackRelease('C3', '8n');
      blockedSynth.triggerAttackRelease('C2', '8n', '+0.1');
    };

    const playBattleSound = () => {
      const battleSynth = new Tone.Synth({
        oscillator: {
          type: 'square',
        },
        envelope: {
          attack: 0.01,
          decay: 0.1,
          sustain: 0.5,
          release: 0.3,
        },
      });

      const battleVolume = new Tone.Volume(-25).toDestination(); // 设置音量为-8分贝

      battleSynth.connect(battleVolume); // 将合成器连接到音量控制节点

      battleSynth.triggerAttackRelease('G2', '16n');
      battleSynth.triggerAttackRelease('C3', '16n', '+0.1');
    };

    return {
      waveform,
      frequency,
      attack,
      release,
      synthVolume,
      noiseVolume,
      noiseType,
      noiseAttack,
      noiseRelease,
      playSound,
      playItemPickupSound,
      playBlockedSound,
      playBattleSound,
    };
  },
};
</script>

<style scoped>
label {
  margin-right: 10px;
}
input, select {
  margin-bottom: 10px;
}
button {
  padding: 10px 20px;
  font-size: 16px;
}
</style>