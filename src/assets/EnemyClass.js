import { level_id } from "./GlobalValue";

class Enemy{
    constructor(name,hp,act,def,url){
        this.姓名 = name;
        this.生命值 = hp;
        this.攻击力 = act;
        this.防御力 = def;
        this.url = url;
    }

    // 定义一些方法来处理敌人的行为
    Damage(player_act) {
        const value = Math.max(player_act-this.防御力,1);
        this.生命值 = Math.max(this.生命值-value,0);
        return this.生命值;
    };
    Attack(player_hp,player_def) {
        const value = Math.max(this.攻击力-player_def,1);
        return player_hp-value;
    }
}
const EnemyDatas =
[
    {index: 0, id:'A', kane:0, 姓名: "0", url: '/img/tv.png', tital:'路'},
    {index: 1, id:'B', kane:0, 姓名: "墙", url: '/obj/墙.jpg', tital:'墙'},
    {index: 2, id:'C', kane:1, 姓名: "黄钥匙", url: '/obj/黄钥匙.jpg', tital:'货'},
    {index: 3, id:'D', kane:1, 姓名: "蓝钥匙", url: '/obj/蓝钥匙.jpg', tital:'货'},
    {index: 4, id:'E', kane:1, 姓名: "红钥匙", url: '/obj/红钥匙.jpg', tital:'货'},
    {index: 5, id:'F', kane:1, 姓名: "黄门", url: '/obj/黄门.jpg', tital:'门'},
    {index: 6, id:'G', kane:1, 姓名: "蓝门", url: '/obj/小蓝门.jpg', surl:'/obj/蓝门.jpg', width:3, height:4, tital:'门'},
    {index: 7, id:'H', kane:1, 姓名: "红门", url: '/gif/红门.gif', surl:'/obj/红门.jpg', width:5, height:5, tital:'门'},
    {index: 8, id:'I', kane:0, 姓名: "上楼", url: '/gif/上楼.gif', surl:'/obj/上楼.jpg', width:5, height:5, tital:'上'},
    {index: 9, id:'J', kane:0, 姓名: "下楼", url: '/gif/下楼.gif', surl:'/obj/下楼.jpg', width:4, height:5, tital:'下'},
    {index: 10, id:'K', kane:1, 姓名: "血瓶", url:'/obj/血瓶.png', tital:'货'},
    {index: 11, id:'L', kane:1, 姓名: "大血瓶", url:'/obj/大血瓶.png', tital:'货'},
    {index: 12, id:'M', kane:1, 姓名: "蓝宝石", url:'/obj/蓝宝石.png', tital:'货'},
    {index: 13, id:'N', kane:1, 姓名: "红宝石", url:'/obj/红宝石.png', tital:'货'},
    {index: 14, id:'O', kane:1, 姓名: "钱包", url:'/obj/小钱.jpg', surl:'/obj/钱.jpg', width:4, height:4, tital:'货'},
    {index: 15, id:'P', kane:1, 姓名: "盗猎客", 生命值:50, 攻击力:20, 防御力:1, url:'/enemy/盗猎客.jpg', tital:'怪'},
    {index: 16, id:'Q', kane:1, 姓名: "纵火犯", 生命值:50, 攻击力:20, 防御力:1, url:'/enemy/纵火犯.jpg', tital:'怪'},
    {index: 17, id:'R', kane:1, 姓名: "袭击者", 生命值:70, 攻击力:15, 防御力:2, url:'/enemy/袭击者.jpg', tital:'怪'},
    {index: 18, id:'S', kane:1, 姓名: "掠夺者", 生命值:100, 攻击力:20, 防御力:5, url:'/enemy/掠夺者.jpg', tital:'怪'},
    {index: 19, id:'T', kane:1, 姓名: "戍卫猎兵", 生命值:110, 攻击力:30, 防御力:5, url:'/enemy/戍卫猎兵.jpg', tital:'怪'},
    {index: 20, id:'U', kane:2, 姓名: "魁梧打手", 生命值:200, 攻击力:70, 防御力:0, url:'/enemy/魁梧打手.jpg', tital:'怪'},
    {index: 21, id:'V', kane:2, 姓名: "阿劳恩", 生命值:150, 攻击力:40, 防御力:40, url:'/enemy/阿劳恩.jpg', tital:'怪'},
    {index: 22, id:'W', kane:3, 姓名: "法布提", 生命值:125, 攻击力:70, 防御力:30, url:'/enemy/法布提.jpg', tital:'怪'},
    {index: 23, id:'X', kane:3, 姓名: "哈提", 生命值:150, 攻击力:100, 防御力:30, url:'/enemy/哈提.jpg', tital:'怪'},
    {index: 24, id:'Y', kane:3, 姓名: "泰拉斯奎祸车", 生命值:300, 攻击力:90, 防御力:45, url:'/enemy/泰拉斯奎祸车.jpg', tital:'怪'},
    {index: 25, id:'Z', kane:3, 姓名: "装甲哈提", 生命值:500, 攻击力:115, 防御力:120, url:'/enemy/装甲哈提.jpg', tital:'怪'},
    {index: 26, id:'a', kane:3, 姓名: "冥宁芙黑沙", 生命值:2000, 攻击力:700, 防御力:450, url:'/enemy/冥宁芙黑纱.jpg', tital:'怪'},
    {index: 27, id:'b', kane:3, 姓名: "冥宁芙灰沙", 生命值:2000, 攻击力:650, 防御力:500, url:'/enemy/冥宁芙灰纱.jpg', tital:'怪'},
    {index: 28, id:'c', kane:0, 姓名: "雷蛛", 生命值:1, 攻击力:200, 防御力:0, url:'/enemy/雷蛛.jpg', tital:'怪'},
    {index: 29, id:'d', kane:2, 姓名: "狂乱暴徒", 生命值:400, 攻击力:100, 防御力:70, url:'/enemy/狂乱暴徒.jpg', tital:'怪'},
    {index: 30, id:'e', kane:2, 姓名: "杜拉罕", 生命值:450, 攻击力:150, 防御力:90, url:'/enemy/杜拉罕.jpg', tital:'怪'},
    {index: 31, id:'f', kane:0, 姓名: "雷蛛", 生命值:1, 攻击力:400, 防御力:0, url:'/enemy/强雷蛛.jpg', tital:'怪'},
    {index: 32, id:'g', kane:4, 姓名: "盛怒恶霸", 生命值:550, 攻击力:160, 防御力:90, url:'/enemy/盛怒恶霸.jpg', tital:'怪'},
    {index: 33, id:'h', kane:4, 姓名: "尼尼微", 生命值:20, 攻击力:4, 防御力:2, url:'/enemy/尼尼微.jpg', tital:'怪'},
    {index: 34, id:'i', kane:4, 姓名: "蛮横力士", 生命值:1300, 攻击力:300, 防御力:150, url:'/enemy/蛮横力士.jpg', tital:'怪'},
    {index: 35, id:'j', kane:20, 姓名: "死路屠夫", 生命值:1500, 攻击力:600, 防御力:400, url:'/enemy/死路屠夫.jpg', surl:'/obj/死路屠夫.jpg', width:5, height:5, tital:'怪'},
    {index: 36, id:'k', kane:4, 姓名: "塔纳托斯", 生命值:900, 攻击力:400, 防御力:200, url:'/enemy/塔纳托斯.jpg', tital:'怪'},
    {index: 37, id:'l', kane:4, 姓名: "卫士Ⅲ型", 生命值:700, 攻击力:250, 防御力:125, url:'/enemy/卫士Ⅲ型.jpg', tital:'怪'},
    {index: 38, id:'m', kane:20, 姓名: "未知复合侵蚀体", 生命值:2000, 攻击力:650, 防御力:450, url:'/enemy/未知复合侵蚀体.jpg', tital:'怪'},
    {index: 39, id:'n', kane:5, 姓名: "眼魔引擎", 生命值:700, 攻击力:350, 防御力:200, url:'/enemy/眼魔引擎.jpg', tital:'怪'},
    {index: 40, id:'o', kane:20, 姓名: "黄金邦布", 生命值:800, 攻击力:450, 防御力:300, url:'/enemy/黄金邦布.jpg', tital:'怪'},
    {index: 41, id:'p', kane:2, 姓名: "仿制星辉", 攻击力:0, 防御力:25, url:'/gif/仿制星辉.gif', tital:'货'},
    {index: 42, id:'q', kane:2, 姓名: "电池", 攻击力:20, 防御力:0, url:'/gif/电池.gif', tital:'货'},
    {index: 43, id:'r', kane:2, 姓名: "聚宝箱", 攻击力:25, 防御力:25, url:'/gif/聚宝箱.gif', tital:'货'},
    {index: 44, id:'s', kane:2, 姓名: "家政", 攻击力:50, 防御力:15, url:'/gif/家政.gif', tital:'无'},
    {index: 45, id:'t', kane:2, 姓名: "鲨鱼", 攻击力:50, 防御力:35, url:'/gif/鲨鱼.gif', tital:'货'},
    {index: 46, id:'u', kane:2, 姓名: "比格", 攻击力:50, 防御力:100, url:'/gif/比格.gif', tital:'货'},
    {index: 47, id:'v', kane:2, 姓名: "钻机", 攻击力:100, 防御力:50, url:'/gif/钻机.gif', tital:'货'},
    {index: 48, id:'w', kane:2, 姓名: "你过", url:'/obj/你过.png', tital:'无'},
    {index: 49, id:'x', kane:2, 姓名: "关!", url:'/obj/关!.png', tital:'无'},
    {index: 50, id:'y', kane:2, 姓名: "一次性商店", url:'/obj/幺次性商店.jpg', surl:'/obj/商店.jpg', width:4, height:5, tital:'货'},
    {index: 51, id:'z', kane:2, 姓名: "幺次性商店", url:'/obj/幺次性商店.jpg', surl:'/obj/商店.jpg', width:4, height:5, tital:'货'},
    {index: 52, id:'0', kane:2, 姓名: "传送门", url: '/obj/传送.jpg', surl:'/obj/传送门.jpg', width:3, height:4, level_id:15, tital:'飞'},
    {index: 53, id:'1', kane:2, 姓名: "传送门", url: '/obj/传送.jpg', surl:'/obj/传送门.jpg', width:3, height:4, level_id:10, tital:'飞'},
    {index: 54, id:'2', kane:2, 姓名: "初始提示", url: '/obj/提示.jpg', surl:'/obj/初始提示.jpg', width:3, height:4, tital:'货'},
    {index: 55, id:'3', kane:2, 姓名: "法厄同", url: '/obj/邦布.jpg', surl:'/obj/法厄同.jpg', width:4, height:4, tital:'货'},
    {index: 56, id:'4', kane:2, 姓名: "永久商店", url:'/obj/幺次性商店.jpg', surl:'/obj/商店.jpg', width:4, height:5, tital:'货'},
    {index: 57, id:'5', kane:2, 姓名: "传送装置", url:'/obj/提示.jpg', surl:'/obj/初始提示.jpg', width:3, height:4, tital:'货'},
    {index: 58, id:'6', kane:2, 姓名: "传送门", url: '/obj/传送.jpg', surl:'/obj/传送门.jpg', width:3, height:4, level_id:18, tital:'飞'},
    {index: 59, id:'7', kane:2, 姓名: "传送门", url: '/obj/传送.jpg', surl:'/obj/传送门.jpg', width:3, height:4, level_id:0, tital:'飞'},
    {index: 60, id:'8', kane:2, 姓名: "礼物", url: '/obj/提示.jpg', surl:'/obj/初始提示.jpg', width:3, height:4, tital:'货'},
    {index: 61, id:'9', kane:2, 姓名: "敌人信息", url:'/obj/提示.jpg', surl:'/obj/初始提示.jpg', width:3, height:4, tital:'货'},
];
export {Enemy,EnemyDatas};