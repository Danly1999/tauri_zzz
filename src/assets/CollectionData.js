import { ref } from 'vue';
import { EnemyDatas } from './EnemyClass';
import { player_data } from './GlobalValue.js';

class CollData {
    constructor(id, state, tip, url_gif, url) {
        this.id = id;
        this.state = state;
        this.tip = tip;
        this.url_gif = url_gif;
        this.url = url;
    }

    SetState(target) {
        this.state = target;
        if (this.state === '已装备') {
            const data = this.GetData();
            player_data.value.攻击力 += data.攻击力;
            player_data.value.防御力 += data.防御力;
        }
    }

    Unlock(target) {
        if (this.state !== '未解锁') {
            if (this.state === '已装备') {
                const data = this.GetData();
                player_data.value.攻击力 -= data.攻击力;
                player_data.value.防御力 -= data.防御力;
            }
            this.state = target;
        }
    }

    GetData() {
        return {
            攻击力: EnemyDatas[this.id].攻击力,
            防御力: EnemyDatas[this.id].防御力
        };
    }
}

var collection_list = ref([
    {
        data: new CollData('狡兔屋', '已解锁', '', 'zy/狡兔屋.png', 'zy/狡兔屋.png'),
        equipment: [
            new CollData('41', '未解锁', '', 'gif/仿制星辉.gif', 'collnor/仿制星辉.jpg'),
            new CollData('42', '未解锁', '', 'gif/电池.gif', 'collnor/电池.jpg'),
            new CollData('43', '未解锁', '', 'gif/聚宝箱.gif', 'collnor/聚宝箱.jpg')
        ]
    },
    {
        data: new CollData('维多利亚家政', '已解锁', '', 'zy/维多利亚家政.png', 'zy/维多利亚家政.png'),
        equipment: [
            new CollData('44', '未解锁', '', 'gif/家政.gif', 'collnor/家政.jpg'),
            new CollData('45', '未解锁', '', 'gif/鲨鱼.gif', 'collnor/鲨鱼.jpg')
        ]
    },
    {
        data: new CollData('白祈重工', '已解锁', '', 'zy/白祇重工.png', 'zy/白祇重工.png'),
        equipment: [
            new CollData('46', '未解锁', '', 'gif/比格.gif', 'collnor/比格.jpg'),
            new CollData('47', '未解锁', '', 'gif/钻机.gif', 'collnor/钻机.jpg')
        ]
    }
]);

export { collection_list };