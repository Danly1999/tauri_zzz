import {Data} from './MapData.js'

    // 去除两端的空行和空白字符，然后按行分割
    const map = new Data();
    
    var rows0 = map.data0.trim().split('\n');
    var rows1 = map.data1.trim().split('\n');
    var rows2 = map.data2.trim().split('\n');
    var rows3 = map.data3.trim().split('\n');
    var rows4 = map.data4.trim().split('\n');
    var rows5 = map.data5.trim().split('\n');
    var rows6 = map.data6.trim().split('\n');
    var rows7 = map.data7.trim().split('\n');
    var rows8 = map.data8.trim().split('\n');
    var rows9 = map.data9.trim().split('\n');
    var rows10 = map.data10.trim().split('\n');
    var rows11 = map.data11.trim().split('\n');
    var rows12 = map.data12.trim().split('\n');
    var rows13 = map.data13.trim().split('\n');
    var rows14 = map.data14.trim().split('\n');
    var rows15 = map.data15.trim().split('\n');
    const row_list = [rows0,rows1,rows2,rows3,rows4,rows5,rows6,rows7,rows8,rows9,rows10,rows11,rows12,rows13,rows14,rows15];

    function MapLetterToNumber(letter) {
// 'a' - 'z'：97 - 122
// 'A' - 'Z'：65 - 90
// '0' - '9'：48 - 57
        const map_value = letter.charCodeAt(0);
        if(map_value<=57)
        {
            return 52-48+map_value;
        }
        if(map_value>=97)
        {
            return map_value - 65 -6;
        }
        return map_value - 65;
    }
    // row行（索引从0开始）
    // col列（索引从0开始）
    function GetMapValue(id, colIndex,rowIndex ) { // 对调参数顺序
        if (colIndex >= 0 && colIndex < row_list[id].length) // 对调rowIndex和colIndex
        {
            if(rowIndex >= 0 && rowIndex < row_list[id][colIndex].length) // 对调rowIndex和colIndex
            {
                return MapLetterToNumber(row_list[id][colIndex][rowIndex]); // 对调rowIndex和colIndex
            }
        }
    }
    function SetMapValue(id, Value,colIndex, rowIndex) { // 对调参数顺序
        let row = row_list[id][colIndex]; // 对调rowIndex和colIndex
        row = row.substring(0, rowIndex) + Value + row.substring(rowIndex + 1); // 对调rowIndex和colIndex
        row_list[id][colIndex] = row; // 对调rowIndex和colIndex
    }
export { GetMapValue,SetMapValue,MapLetterToNumber}