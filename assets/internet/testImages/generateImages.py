from PIL import Image, ImageDraw, ImageFont

names = [
    "home",
    "wiki",
    "paint",
    "exit",
    "askfloppa",
    "bet36meow",
    "milkroad",
    "meowtube",
    "betgolf",
    "betflapjack",
    "betbingo",
    "milkbuy",
    "milkbuy2",
    "milkbuy3",
    "milksell",
    "meowvids1",
    "meowvids2",
    "meowclip1",
    "meowclip2",
    "meowclip3",
    "meowclip4",
    "meowclip5",
    "meowclip6",
    "meowclip7",
    "meowclip8",
    "meowclip9",
    "meowclip10",
]
width = 1234
height = 798
font = ImageFont.truetype("arial.ttf", size=50)

for name in names:
    img = Image.new("RGB", (width, height), color="blue")
    imgDraw = ImageDraw.Draw(img)
    imgDraw.text((10, 400), name, font=font, fill=(255,255,0))
    print(name)
    img.save(f"{name}.png")



for name in names:
    print(f"\"{name}.png\",")
    

