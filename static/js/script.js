var pausenow = false;

const basePath = "static/Audios/";
const imgpath = "static/images/";
const playlist = [
  "1.mp3",
  "2.mp3",
  "3.mp3",
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
