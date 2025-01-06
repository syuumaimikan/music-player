import os

# ファイルが存在するディレクトリのパスを指定
path = "D:/projects/html/music player/static/images"

# ディレクトリ内のファイルをリストアップ
files = os.listdir(path)

# ここからファイルのリネーム処理などを行う
# 例：連番にリネームする場合のコード
counter = 1
for filename in files:
    os.rename(os.path.join(path, filename), os.path.join(path, f"img{counter}.png"))
    counter += 1