VAR output = ""
VAR act = 0
VAR def = 0
VAR y_key = 0
VAR b_key = 0
VAR r_key = 0
VAR kane = 0
VAR delete = true
VAR stop = true


-> STAR
=== STAR
只能购买一次
你需要点什么#other #莱卡恩.png
+ [获得10$]
~ kane += 10
获得10$
-> END
+ [黄钥匙免费*1]
获得黄钥匙*1
~ y_key++
-> END
+ [蓝钥匙10$]
{kane<10:
~ output = "$"
-> RE
- else:

获得蓝钥匙*1
~kane-=10
~ b_key++
-> END
}
+ [红钥匙20$]
{kane<20:
~ output = "$"
-> RE
- else:
获得红钥匙*1
~kane-=20
~ r_key++
-> END
}


=== RE
{output}不够 #player #苍角.png
-> STAR