

graphExtraString = ""


for i in [1,2]:
    for source in [f"meowclip{(5*i-5)+j+1}" for j in range(5)]:
        graphExtraString+= f"{source}, meowtube, meowclip_meowtube\n"
    graphExtraString+= "meowvids1, meowtube, meowclip_meowtube\n"
    graphExtraString+= "meowvids2, meowtube, meowclip_meowtube\n"

for source in ["milkbuy","milkbuy2","milkbuy3","milksell"]:
        graphExtraString+= f"{source}, milkroad, milk_milkroad\n"


for source in ["betgolf", "betflapjack", "betbingo"]:
    graphExtraString += f"{source}, bet36meow, bet_bet36meow\n"


print(graphExtraString)
