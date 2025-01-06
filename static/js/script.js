var pausenow = false;

const basePath = "static/Audios/";
const imgpath = "static/images/";
const playlist = [
  "doublet.mp3",
  "fanfare (instrumental).mp3",
  "slumber.mp3",
  "どうしようもないくらい君が好き.mp3",
  "廻廻奇譚.mp3",
  "LEO.mp3",
  "キャラバン.mp3",
  "トーキョーゲットー.mp3",
  "ナンセンス文学.mp3",
  "蒼のワルツ.mp3",
  "アウトサイダー.mp3",
  "ドラマツルギー.mp3",
  "レーゾンデートル.mp3",
  "心海.mp3",
  "惑星ループ.mp3",
  "デーモンダンストーキョー.mp3",
  "ホームシック.mp3",
  "虚の記憶.mp3",
  "宵の明星.mp3",
  "迷い子.mp3",
  "あの娘シークレット.mp3",
  "いのちの食べ方.mp3",
  "やどりぎ.mp3",
  "浮遊感.mp3",
  "遊遊冥冥.mp3",
  "アンビバレント.mp3",
  "ショートアンブレラ.mp3",
  "闇夜.mp3",
  "会心劇.mp3",
  "約束.mp3",
  "ふりをした。.mp3",
  "ラビットグレイ.mp3",
  "朝が降る.mp3",
  "楓.mp3",
  "杪夏.mp3",
  "パーフェクト生命.mp3",
  "ラストダンス.mp3",
  "心予報.mp3",
  "羊を数えて.mp3",
  "お気に召すまま.mp3",
  "メルファクトリー (リアレンジver).mp3",
  "白銀.mp3",
  "僕らまだアンダーグラウンド.mp3",
  "paradigm (instrumental).mp3",
  "sister (リアレンジver).mp3",
  "バウムクーヘンエンド.mp3",
  "君に世界.mp3",
  "dawn.mp3",
  "mellow.mp3",
  "ognanje.mp3",
  "胡乱な食卓.mp3",
];

// labelimg配列をplaylistと同じ並びに設定
const labelimg = playlist.map((_, index) => `img${index + 1}.png`);

const myaudio = new Audio();
const seekbar = document.getElementById("seekbar");
const volu = document.getElementById("volume");

function shuffleBoth(playlist, labelimg) {
  for (let i = playlist.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    // playlistとlabelimgを同時に並び替える
    [playlist[i], playlist[j]] = [playlist[j], playlist[i]];
    [labelimg[i], labelimg[j]] = [labelimg[j], labelimg[i]];
  }
}

function pause() {
  if (pausenow == true) {
    pausenow = false;
    myaudio.play();
    document.getElementById("pause").src = "static/icons/pauseicon.png";
  } else {
    pausenow = true;
    myaudio.pause();
    document.getElementById("pause").src = "static/icons/playicon.png";
  }
}

function skipTrack() {}
// 音楽をランダムに再生
function randomplay() {
  const randomIndex = Math.floor(Math.random() * playlist.length);
  const selectedFile = basePath + playlist[randomIndex];
  const selectedImage = imgpath + labelimg[randomIndex]; // 対応する画像を取得

  myaudio.src = selectedFile;

  myaudio
    .play()
    .then(() => {
      const filename = decodeURIComponent(
        myaudio.src.match(/[^\/]+$/)[0]
      ).replace(".mp3", "");
      document.getElementById("playing").textContent =
        "【 再生中 】" + filename;

      // 選択された画像を表示（例えば、img要素のsrcを設定）
      document.getElementById("currentImage").src = selectedImage;

      updateSeekBar();
      volumechange();
    })
    .catch((error) => {
      console.error("Error playing audio:", error);
    });
}

// 音量調整
function volumechange() {
  volu.addEventListener("input", () => {
    myaudio.volume = volu.value; // シークバーの値に応じて音量を調整
  });
}

// 再生時間に基づいてシークバーを更新
function updateSeekBar() {
  // 音声ファイルの再生中にシークバーを更新
  myaudio.addEventListener("timeupdate", () => {
    if (myaudio.duration) {
      seekbar.max = myaudio.duration; // シークバーの最大値を音声の長さに設定
      seekbar.value = myaudio.currentTime; // 現在の再生時間に応じてシークバーを更新
    }

    // 残り時間の表示を更新
    const remainingTime = myaudio.duration - myaudio.currentTime;
    const minutes = Math.floor(remainingTime / 60);
    const seconds = Math.floor(remainingTime % 60)
      .toString()
      .padStart(2, "0");
    document.getElementById(
      "timeRemaining"
    ).textContent = `残り時間: ${minutes}:${seconds}`;
  });

  // シークバーを操作したときの処理
  seekbar.addEventListener("input", () => {
    myaudio.currentTime = seekbar.value; // シークバーの値に応じて再生位置を変更
  });
}

// 音声ファイルの再生が終了したときの処理
myaudio.addEventListener("ended", () => {
  console.log("Playback ended.");
  randomplay(); // 次の曲を再生
});

// 最初にランダムに並べ替える
shuffleBoth(playlist, labelimg);

// 最初の曲を再生
randomplay();
