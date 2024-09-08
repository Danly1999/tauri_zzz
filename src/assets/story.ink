VAR kane = 50
VAR y_key = 1
VAR b_key = 1
VAR r_key = 1
VAR stop = true
-> STAR

=== STAR ===
- 还剩{kane}$ #other #丽娜.png
- 购买黄钥匙,需要10$
- 购买蓝钥匙,需要20$
- 购买红钥匙,需要40$
+ 购买黄钥匙 # player
{ kane>=10:
    ~ kane -= 10
    ~ y_key++
    ->next
- else:
    ->POOR
}
+ 购买蓝钥匙 # player
{ kane>=20:
    ~ kane -= 20
    ~ b_key++
    ->next
- else:
    ->POOR
}
+ 购买红钥匙 # player
{ kane>=40:
    ~ kane -= 40
    ~ r_key++
    ->next
- else:
    ->POOR
}

+ 不用了 # player
-> END

=== POOR ===
- 钱不够
+ 买别的 # player
-> STAR
+ 不用了 # player
-> END
=== next ===
- 还剩{kane}$
+ [再买] 
-> STAR
+ 不用了 # player
-> END
