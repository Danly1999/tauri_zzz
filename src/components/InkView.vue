<template>
    <div>
      <div v-show="storyContent.length">
        <div v-for="(line, index) in storyContent" :key="index" :style="`${!line.id?'':'text-align: end;'}`">
          <img v-if="line.img" :src="`${line.img}`" alt="" style="width: 64px;;">
          <el-text style="font-size: 20px;" :type="line.id?'info':''">
              {{ line.text }}
          </el-text>
        </div>
        <div v-show="typing">{{ displayedText }}</div>
        <div style="display: flex;flex-wrap: wrap; max-width: 600px;">
          <div v-show="!typing" v-for="(choice, index) in choices" :key="index" style="margin-right: 10px;margin-top:20px;">
            <el-button @click="makeChoice(index)">
              <el-text style="font-size: 20px;color: #ff8c00;font-family: 'CustomFont';">
                {{ choice.text }} 
              </el-text>
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { Story } from 'inkjs';
  import axios from 'axios';
  import * as DATA from "../assets/ReadCSV.js";
  import { test } from '../assets/TaskEvent';
  import { collection_list } from '../assets/CollectionData.js';
  import { player_data,keys_data,can_run } from "../assets/GlobalValue.js";
  export default {
    props: {
      AfterShopping: Function,
      DeletObj: Function,
    },
    setup(props) {
      const story = ref(null);
      const storyContent = ref([]);
      const displayedText = ref('');
      const choices = ref([]);
      const typing = ref(false);
      const typingSpeed = 40; // 每个字符的显示速度，毫秒
      var kane = ref(100);
      var ink_bools = {have_ink:false,need_dele:false,need_stop:false};
      const continueStory = async () => {
        storyContent.value = [];
        while (story.value.canContinue) {
          const text = story.value.Continue();
          
          const is_player = story.value.currentTags[0] === 'player';
          const img = `/bqb/${story.value.currentTags[1]}`;
          if(is_player||!story.value.variablesState['stop'])
          {
            storyContent.value.push({text:text,id:is_player,img:img});
          }else
          {
            await typeText(text);
            storyContent.value.push({text:displayedText.value,id:is_player,img:img});
            displayedText.value = '';
          }

        }
        choices.value = story.value.currentChoices.map(choice => ({
          text: choice.text,
          index: choice.index
        }));
        story.value.variablesState['stop']?ink_bools.need_stop = true:ink_bools.need_stop = false;
        story.value.variablesState['delete']?ink_bools.need_dele = true:ink_bools.need_dele = false;
        
        if(story.value.variablesState['test_id']!=null){(test.value[story.value.variablesState['test_id']].state = story.value.variablesState['test_state'])};
        if(story.value.variablesState['weapon_camp']!=null){(collection_list.value[story.value.variablesState['weapon_camp']].equipment[story.value.variablesState['weapon_id']].state = story.value.variablesState['weapon_state'])};

        if(story.value.variablesState['kane']!=null){(player_data.value.$ = story.value.variablesState['kane'])};

        if(story.value.variablesState['y_key']!=null){(keys_data.value.黄钥匙 = story.value.variablesState['y_key'])};
        if(story.value.variablesState['b_key']!=null)(keys_data.value.蓝钥匙 = story.value.variablesState['b_key']);
        if(story.value.variablesState['r_key']!=null)(keys_data.value.红钥匙 = story.value.variablesState['r_key']);

        if(story.value.variablesState['hp']!=null)(player_data.value.生命值 = story.value.variablesState['hp']);
        console.log(player_data.value.攻击力);
        if(story.value.variablesState['act']!=null)(player_data.value.攻击力 = story.value.variablesState['act']);
        if(story.value.variablesState['def']!=null)(player_data.value.防御力 = story.value.variablesState['def']);

        if(story.value.currentChoices.length === 0 && story.value.variablesState['stop'])
        {
          props.AfterShopping();
        }
      };
      const typeText = (text) => {
        displayedText.value = '';
        typing.value = true;
        let index = 0;
  
        return new Promise((resolve) => {
          const type = () => {
            if (index < text.length) {
              displayedText.value += text[index];
              index++;
              setTimeout(type, typingSpeed);
            } else {
              typing.value = false;
              resolve();
            }
          };
          type();
        });
      };
  
      const makeChoice = (choiceIndex) => {
        story.value.ChooseChoiceIndex(choiceIndex);
        continueStory();
      };
      async function CreateStory(id) {
        try {
          const response = await axios.get(`/json/${id}.json`);
          story.value = new Story(response.data);
          story.value.variablesState['stop']?ink_bools.need_stop = true:ink_bools.need_stop = false;
          story.value.variablesState['delete']?ink_bools.need_dele = true:ink_bools.need_dele = false;

          if(story.value.variablesState['target']!=null)
          {
            DATA.SetMapValue(story.value.variablesState['lid'],story.value.variablesState['target'],story.value.variablesState['xpos'],story.value.variablesState['ypos'])
          }

          if(story.value.variablesState['kane']!=null) story.value.variablesState['kane'] = player_data.value.$;
          
          if(story.value.variablesState['y_key']!=null) story.value.variablesState['y_key'] = keys_data.value.黄钥匙;
          if(story.value.variablesState['b_key']!=null) story.value.variablesState['b_key'] = keys_data.value.蓝钥匙;
          if(story.value.variablesState['r_key']!=null) story.value.variablesState['r_key'] = keys_data.value.红钥匙;
          
          if(story.value.variablesState['hp']!=null) story.value.variablesState['hp']=player_data.value.生命值;
          
          
          if(story.value.variablesState['act']!=null) story.value.variablesState['act']=player_data.value.攻击力;
          if(story.value.variablesState['def']!=null) story.value.variablesState['def']=player_data.value.防御力;

          if(story.value.variablesState['test_id']!=null)
          {
            story.value.variablesState['test_state'] &&= test.value[story.value.variablesState['test_id']].state;
          }
          if(story.value.variablesState['weapon_camp']!=null)
          {
            story.value.variablesState['weapon_state'] &&= collection_list.value[story.value.variablesState['weapon_camp']].equipment[story.value.variablesState['weapon_id']].state;
          }
          continueStory();
        } catch (error) {
          
          ink_bools.have_ink = false;
          return ink_bools;
        }
        ink_bools.have_ink = true;
        return ink_bools;

        }
      onMounted(() => {

      });
  
      return {
        storyContent,
        displayedText,
        choices,
        makeChoice,
        typing,
        kane,
        CreateStory,
        player_data,keys_data,can_run
      };
    }
  };
  </script>
  
  <style>

  </style>
  