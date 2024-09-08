<template>
    <div>
      <button @click="sendPostRequest">发送请求</button>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    name: 'PostRequestComponent',
    setup() {
      const sendPostRequest = async () => {
        const url = 'https://vrihy2iv.lc-cn-n1-shared.com/1.1/leaderboard/users/baiyan/statistics';
        const data = [
          {
            statisticName: "Godot",
            statisticValue: 2333
          }
        ];
  
        try {
          const response = await fetch(url, {
            method: 'POST',
            headers: {
              'X-LC-Id': 'VRihy2ivG8dzCHCvWfaxTGdB-gzGzoHsz',
              'X-LC-Key': 'PiMk8knbBduYBYGgTFTHU5E6,master',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          });
  
          const result = await response.json();
          console.log(result);
        } catch (error) {
          console.error('Error:', error);
        }
      };
  
      return {
        sendPostRequest
      };
    }
  };
  </script>
  
  <style scoped>
  button {
    padding: 10px 20px;
    font-size: 16px;
  }
  </style>