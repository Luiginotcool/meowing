s = """home, askfloppa, home_askfloppa
askfloppa, bet36meow, askfloppa_bet36meow
askfloppa, milkroad, askfloppa_milkroad
askfloppa, meowtube, askfloppa_meowtube
bet36meow, betgolf, bet36_golf,
bet36meow, betflapjack, bet36_flapjack,
bet36meow, betbingo, bet36_bingo
milkroad, milkbuy, milkroad_buy
milkbuy, milkbuy2, milkbuy_2
milkbuy2, milkbuy3, milkbuy_3
milkroad, milksell, milkroad_sell
meowtube, meowvids1, meowtube_videos1
meowvids1, meowvids2, meowvids_2
meowvids1, meowclip1, meowclip_1
meowvids1, meowclip2, meowclip_2
meowvids1, meowclip3, meowclip_3
meowvids1, meowclip4, meowclip_4
meowvids1, meowclip5, meowclip_5
meowvids2, meowclip6, meowclip_1
meowvids2, meowclip7, meowclip_2
meowvids2, meowclip8, meowclip_3
meowvids2, meowclip9, meowclip_4
meowvids2, meowclip10, meowclip_5
meowclip1, meowtube, meowclip_meowtube
meowclip2, meowtube, meowclip_meowtube
meowclip3, meowtube, meowclip_meowtube
meowclip4, meowtube, meowclip_meowtube
meowclip5, meowtube, meowclip_meowtube
meowclip6, meowtube, meowclip_meowtube
meowclip7, meowtube, meowclip_meowtube
meowclip8, meowtube, meowclip_meowtube
meowclip9, meowtube, meowclip_meowtube
meowclip10, meowtube, meowclip_meowtube
milkbuy, milkroad, milk_milkroad
milkbuy2, milkroad, milk_milkroad
milkbuy3, milkroad, milk_milkroad
milksell, milkroad, milk_milkroad"""

l = s.split("\n")

clickBoxes = []
for line in l:
    data = line.split(", ")
    for da in data:
        if (not (da in clickBoxes)) and "_" in da:
            clickBoxes.append(da)


for cb in clickBoxes:
    print(f"\"{cb}\",")
    
