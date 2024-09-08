VAR kane = 10
VAR y_key = 0
VAR b_key = 0
VAR r_key = 0
VAR hp = 0
VAR act = 0
VAR def = 0
VAR test_id = 2
VAR test_state = "未开"
VAR weapon_camp = 0 
VAR weapon_id = 1
VAR weapon_state = "未解锁"
VAR stop = false
VAR delete = false
VAR fight = false
-> start

=== start
你需要买些什么
+ [黄钥匙]
{ kane>0:
    ~ kane--
    ~ y_key++
    黄钥匙+1->next
- else:
    ->poor
}

+ [解锁任务 3]
{ test_state!="完成":
    ~test_state = "已开"
    已解锁任务3 -> next
}
+ [解锁武器 3]
{ weapon_state!="已装备":
    ~weapon_state = "已解锁"
    已解锁装备3 -> next
}
=== poor
钱不够
+ [买别的]-> start
+ [离开]-> END
=== next
+ [买别的]-> start
+ [离开] -> END
