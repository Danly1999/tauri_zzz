import {Data} from './MapData.js'

    // 去除两端的空行和空白字符，然后按行分割
    const map = new Data();
    
    var rows0 = map.data0.trim().split('\n').reverse();
    var rows1 = map.data1.trim().split('\n').reverse();
    var rows2 = map.data2.trim().split('\n').reverse();
    var rows3 = map.data3.trim().split('\n').reverse();
    var rows4 = map.data4.trim().split('\n').reverse();
    var rows5 = map.data5.trim().split('\n').reverse();
    var rows6 = map.data6.trim().split('\n').reverse();
    var rows7 = map.data7.trim().split('\n').reverse();
    var rows8 = map.data8.trim().split('\n').reverse();
    var rows9 = map.data9.trim().split('\n').reverse();
    var rows10 = map.data10.trim().split('\n').reverse();
    var rows11 = map.data11.trim().split('\n').reverse();
    var rows12 = map.data12.trim().split('\n').reverse();
    var rows13 = map.data13.trim().split('\n').reverse();
    var rows14 = map.data14.trim().split('\n').reverse();
    var rows15 = map.data15.trim().split('\n').reverse();
    var rows16 = map.data16.trim().split('\n').reverse();
    var rows17 = map.data17.trim().split('\n').reverse();
    var rows18 = map.data18.trim().split('\n').reverse();
    const row_list = [rows0,rows1,rows2,rows3,rows4,rows5,rows6,rows7,rows8,rows9,rows10,rows11,rows12,rows13,rows14,rows15,rows16,rows17,rows18];

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
    function GetMapValue(id, colIndex, rowIndex) {
        if (rowIndex >= 0 && rowIndex < row_list[id].length) 
        {
            if(colIndex >= 0 && colIndex < row_list[id][rowIndex].length)
            {
                return MapLetterToNumber(row_list[id][rowIndex][colIndex]);
            }
        }
    }
    function SetMapValue(id, Value, colIndex, rowIndex) {
        let row = row_list[id][rowIndex];
        row = row.substring(0, colIndex) + Value + row.substring(colIndex + 1);
        row_list[id][rowIndex] = row;
    }
export { GetMapValue,SetMapValue}