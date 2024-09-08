<template>

</template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    setup() {
      const data = `
00000101110
00000000000
11100010110
00111211401
00111011101
00111311101
02111211101
05111011101
00111011101
00111211101
00111011106
`;

      // 去除两端的空行和空白字符，然后按行分割
      const rows = data.trim().split('\n').reverse();

      // row行（索引从0开始）
      // col列（索引从0开始）
      function GetMapValue(colIndex, rowIndex) {
      if (rowIndex >= 0 && rowIndex < rows.length) 
      {
        if(colIndex >= 0 && colIndex < rows[rowIndex].length)
        {
          return rows[rowIndex][colIndex];
        }
      }
      return null;
    }
        
      return {
        GetMapValue,
      };
  }
  };
  </script>
  
  <style scoped>
  /* 添加一些样式以改善视觉效果 */
  </style>
  