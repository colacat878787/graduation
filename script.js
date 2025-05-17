document.addEventListener('DOMContentLoaded', function() {
    // --- 元素選擇 ---
    const initialScreen = document.getElementById('initial-screen');
    const teacherButtons = document.querySelectorAll('.teacher-btn');
    const secretCodeArea = document.getElementById('secret-code-area');
    const selectedTeacherNameSpan = document.getElementById('selected-teacher-name');
    const secretCodeInput = document.getElementById('secret-code-input');
    const submitCodeBtn = document.getElementById('submit-code-btn');
    const errorMessage = document.getElementById('error-message');

    const container = document.getElementById('container');
    const openingPanels = document.getElementById('opening-panels');
    const cardTeacherNameOpening = document.getElementById('card-teacher-name-opening');
    const cardContent = document.getElementById('cardContent');
    const cardGreeting = document.getElementById('card-greeting');
    const teacherPhoto = document.getElementById('teacher-photo');
    const cardMessage = document.getElementById('card-message');

    // 音樂播放器元素 (與原版相同)
    const backgroundMusic = document.getElementById('backgroundMusic');
    const musicPlayer = document.getElementById('musicPlayer');
    const playerPlayPauseBtn = musicPlayer ? musicPlayer.querySelector('#playerPlayPause') : null;
    const songTitleEl = musicPlayer ? musicPlayer.querySelector('.song-title') : null;
    const lyricDisplayContainer = musicPlayer ? musicPlayer.querySelector('.lyric-display-container') : null;
    const prevLyricEl = lyricDisplayContainer ? lyricDisplayContainer.querySelector('.lyric-line.prev-lyric') : null;
    const currentLyricEl = lyricDisplayContainer ? lyricDisplayContainer.querySelector('.lyric-line.current-lyric') : null;
    const nextLyricEl = lyricDisplayContainer ? lyricDisplayContainer.querySelector('.lyric-line.next-lyric') : null;
    const progressBar = musicPlayer ? musicPlayer.querySelector('#progressBar') : null;
    const currentTimeEl = musicPlayer ? musicPlayer.querySelector('.current-time') : null;
    const durationEl = musicPlayer ? musicPlayer.querySelector('.duration') : null;

    // --- 教師資料 ---
    const teacherData = {
        jieyi: {
            name: "潔宜老師",
            code: "6010",
            photo: "teacher_generic.png", // 替換成實際照片或通用照片
            message: `親愛的潔宜老師：<br><br>
            謝謝您這幾年來的照顧和教導！您上課總是很有趣，會用很多好玩的方法讓我們更容易記住東西，下課的時候也像我們的大朋友一樣，聽我們說好多好多話。<br><br>
            雖然有時候我可能會有點調皮，讓您傷腦筋，但您總是會提醒我。現在我們要畢業了，心裡真的好捨不得您喔！希望您每天都開開心心的，也要好好照顧身體！我們一定會常常回來看您的！<br><br>
            祝您 畢業快樂 (嗯？是我們畢業才對啦！)，總之，就是天天快樂！`
        },
        junxuan: {
            name: "均璇老師",
            code: "5200",
            photo: "teacher_generic.png",
            message: `親愛的均璇老師：<br><br>
            時間過得好快，一下子我們就要畢業了！好感謝有您這位老師陪著我們長大。您總是那麼溫柔，又那麼有耐心，不管我們問再笨的問題，您都會仔細地跟我們解釋。在我遇到困難的時候，您都會鼓勵我，給我好多信心去試試看。<br><br>
            我還記得有一次，那時候我們在練習舞蹈，老師您就算我不會，也會耐心教導我和同學，那時候真的覺得好溫暖。謝謝您不只教我們課本上的東西，還教我們很多做人做事的道理。<br><br>
            雖然要離開清溝國小了，但我永遠不會忘記您的！希望老師以後也一切順利，每天都充滿笑容！我們會想您的！`
        },
        yanan: {
            name: "雅蔓老師",
            code: "2024",
            photo: "teacher_generic.png",
            message: `最可愛的雅蔓老師：<br><br>
            五年級的生活因為有您，變得特別精彩！謝謝您總是那麼用心地準備每一堂課，讓我們在學習中找到樂趣。您就像陽光一樣，照亮了我們的教室，也溫暖了我們的心。每次看到您的笑容，就覺得心情好好！<br><br>
            您常常跟我們分享很多有趣的故事，也鼓勵我們多看書、多思考。在您的班上，我覺得很輕鬆自在，可以勇敢地問問題，也可以跟同學開心地討論。這一年雖然很快就過去了，但跟您還有同學們一起的回憶，我都會好好收在心裡。<br><br>
            畢業之後，我一定會努力，不辜負您的期望！也希望老師您每天都漂漂亮亮、開開心心，有空要多休息喔！我們愛您！`
        }
    };
    let selectedTeacherKey = null;

    // --- 初始狀態設定 ---
    if (musicPlayer) {
        musicPlayer.classList.add('player-initial');
        const controls = musicPlayer.querySelector('.player-controls');
        const info = musicPlayer.querySelector('.player-info');
        if (controls) controls.classList.remove('content-visible');
        if (info) info.classList.remove('content-visible');
    }
    if (songTitleEl) {
        songTitleEl.textContent = '知足-五月天'; // 修改歌名
        songTitleEl.style.opacity = 1;
    }
    if (prevLyricEl) { prevLyricEl.textContent = ''; prevLyricEl.style.opacity = 0; }
    if (currentLyricEl) { currentLyricEl.textContent = ''; currentLyricEl.style.opacity = 0; }
    if (nextLyricEl) { nextLyricEl.textContent = ''; nextLyricEl.style.opacity = 0; }


    // --- 輔助函式 (與原版相同) ---
    function formatTime(seconds) { /* ... 與原版相同 ... */ }
    async function loadAndParseLRC(lrcFilePath) { /* ... 與原版相同，但檔案路徑會是 "知足.lrc" ... */ }
    function parseLRC(lrcText) { /* ... 與原版相同 ... */ }
    function updateLyricDisplay(currentTime) { /* ... 與原版相同 ... */ }

    // 複製原版的 formatTime, parseLRC, updateLyricDisplay 函式到這裡
    // 確保 loadAndParseLRC 也複製過來

    function formatTime(seconds) {
        if (isNaN(seconds) || seconds < 0) return '0:00';
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        const formattedSeconds = remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds;
        return `${minutes}:${formattedSeconds}`;
    }

    let lyrics = [];
    let currentLyricIndex = -1;

    async function loadAndParseLRC(lrcFilePath) {
        try {
            console.log(`🎶 嘗試載入歌詞檔案: ${lrcFilePath}`);
            const response = await fetch(lrcFilePath);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status} when fetching ${lrcFilePath}`);
            }
            const lrcText = await response.text();
            console.log("🎶 歌詞檔案載入成功。");

            lyrics = parseLRC(lrcText);
            console.log("🎶 歌詞解析完成。行數:", lyrics.length, lyrics);

             if (!lyrics.length && currentLyricEl) {
                 currentLyricEl.textContent = "無歌詞數據";
                 currentLyricEl.style.opacity = 0.8;
                 currentLyricEl.style.color = '#bbb';
                 console.warn("❌ LRC 文件沒有解析到任何帶時間戳的歌詞行。");
             } else if (currentLyricEl) {
                 currentLyricEl.textContent = '';
                 currentLyricEl.style.opacity = 0;
                 currentLyricEl.style.color = 'white';
             }
             if (prevLyricEl) { prevLyricEl.textContent = ''; prevLyricEl.style.opacity = 0; }
             if (nextLyricEl) { nextLyricEl.textContent = ''; nextLyricEl.style.opacity = 0; }
        } catch (e) {
            console.error("❌ 載入或解析 LRC 檔案失敗:", e);
            lyrics = [];
            if (currentLyricEl) {
                 currentLyricEl.textContent = "無法載入歌詞";
                 currentLyricEl.style.opacity = 1;
                 currentLyricEl.style.color = 'red';
            }
            if (prevLyricEl) { prevLyricEl.textContent = ''; prevLyricEl.style.opacity = 0; }
            if (nextLyricEl) { nextLyricEl.textContent = ''; nextLyricEl.style.opacity = 0; }
        }
    }

    function parseLRC(lrcText) {
        const lines = lrcText.split('\n');
        const parsedLyrics = [];
        const timeRegex = /\[(\d{1,2}):(\d{2}(\.\d{1,3})?)\](.*)/;

        for (const line of lines) {
            const match = line.match(timeRegex);
            if (match) {
                const minutes = parseInt(match[1], 10);
                const seconds = parseFloat(match[2]);
                const time = minutes * 60 + seconds;
                const text = match[4].trim();
                if (text) { // 確保歌詞文本不為空
                    parsedLyrics.push({ time: time, text: text });
                }
            }
        }
        parsedLyrics.sort((a, b) => a.time - b.time);
        return parsedLyrics;
    }

    function updateLyricDisplay(currentTime) {
        if (!prevLyricEl || !currentLyricEl || !nextLyricEl || lyrics.length === 0) {
             if (currentLyricEl && (currentLyricEl.textContent === "無法載入歌詞" || currentLyricEl.textContent === "無歌詞數據")) {
                 currentLyricEl.style.opacity = 1;
                 currentLyricEl.style.color = currentLyricEl.textContent === "無法載入歌詞" ? 'red' : '#bbb';
            } else if (currentLyricEl) {
                 currentLyricEl.textContent = '';
                 currentLyricEl.style.opacity = 0;
            }
            if(prevLyricEl) { prevLyricEl.textContent = ''; prevLyricEl.style.opacity = 0; }
            if(nextLyricEl) { nextLyricEl.textContent = ''; nextLyricEl.style.opacity = 0; }
            return;
        }

        let foundIndex = -1; // 從頭開始找
        for (let i = 0; i < lyrics.length; i++) {
            if (currentTime >= lyrics[i].time) {
                 if (i + 1 < lyrics.length) {
                    if (currentTime < lyrics[i+1].time) {
                        foundIndex = i;
                        break;
                    }
                 } else { // 最後一句歌詞
                    foundIndex = i;
                    break;
                 }
            }
        }
        // 如果時間早於第一句歌詞
        if (currentTime < lyrics[0].time && lyrics.length > 0) {
            if (currentLyricIndex !== -1) { // 只有在之前有歌詞時才清空
                if (prevLyricEl) { prevLyricEl.textContent = ''; prevLyricEl.style.opacity = 0;}
                if (currentLyricEl) { currentLyricEl.textContent = ''; currentLyricEl.style.opacity = 0;}
                if (nextLyricEl) {
                    nextLyricEl.textContent = lyrics[0].text; // 預備顯示第一句
                    nextLyricEl.style.opacity = 0.7; nextLyricEl.style.color = '#bbb';
                }
                currentLyricIndex = -1;
            }
            return;
        }


        if (foundIndex !== currentLyricIndex && foundIndex !== -1) {
            currentLyricIndex = foundIndex;

            const prevIndex = currentLyricIndex - 1;
            if (prevLyricEl) {
                prevLyricEl.textContent = (prevIndex >= 0 && prevIndex < lyrics.length) ? lyrics[prevIndex].text : '';
                prevLyricEl.style.opacity = prevLyricEl.textContent ? 0.7 : 0;
                prevLyricEl.style.color = '#bbb';
            }

            if (currentLyricEl) {
                currentLyricEl.textContent = lyrics[currentLyricIndex].text;
                currentLyricEl.style.opacity = 0; // 先隱藏再淡入
                currentLyricEl.style.color = '#f1c40f'; // 當前歌詞顏色
                setTimeout(() => { currentLyricEl.style.opacity = 1; }, 50);
            }

            const nextIndex = currentLyricIndex + 1;
             if (nextLyricEl) {
                nextLyricEl.textContent = (nextIndex >= 0 && nextIndex < lyrics.length) ? lyrics[nextIndex].text : '';
                nextLyricEl.style.opacity = nextLyricEl.textContent ? 0.7 : 0;
                 nextLyricEl.style.color = '#bbb';
            }
        }

        // 根據播放狀態控制歌名和歌詞的顯示/隱藏
        if (songTitleEl && lyricDisplayContainer && musicPlayer && musicPlayer.classList.contains('content-visible')) {
             if (backgroundMusic.currentTime > 0 && !backgroundMusic.paused && lyrics.length > 0 && currentLyricEl && currentLyricEl.textContent) {
                  songTitleEl.style.opacity = 0; // 播放時且有歌詞則隱藏歌名
             } else {
                  songTitleEl.style.opacity = 1; // 其他情況顯示歌名
                  // 如果是因爲沒有歌詞而顯示歌名，則確保歌詞行是清空的或顯示提示
                  if (lyrics.length === 0 || !currentLyricEl || !currentLyricEl.textContent) {
                    if (prevLyricEl) prevLyricEl.style.opacity = 0;
                    if (nextLyricEl) nextLyricEl.style.opacity = 0;
                    if (currentLyricEl && (currentLyricEl.textContent === "無法載入歌詞" || currentLyricEl.textContent === "無歌詞數據")){
                        currentLyricEl.style.opacity = 1;
                    } else if (currentLyricEl) {
                         currentLyricEl.style.opacity = 0;
                    }
                  }
             }
        }
    }

    // --- 新增邏輯：老師選擇和密碼驗證 ---
    teacherButtons.forEach(button => {
        button.addEventListener('click', function() {
            teacherButtons.forEach(btn => btn.classList.remove('selected'));
            this.classList.add('selected');
            selectedTeacherKey = this.dataset.teacher;
            selectedTeacherNameSpan.textContent = teacherData[selectedTeacherKey].name;
            secretCodeArea.classList.remove('hidden');
            secretCodeInput.value = '';
            secretCodeInput.focus();
            errorMessage.classList.add('hidden');
        });
    });

    submitCodeBtn.addEventListener('click', function() {
        if (!selectedTeacherKey) {
            alert("請先選擇一位老師！");
            return;
        }
        const enteredCode = secretCodeInput.value;
        if (enteredCode === teacherData[selectedTeacherKey].code) {
            errorMessage.classList.add('hidden');
            initialScreen.classList.add('hidden'); // 隱藏初始畫面
            container.classList.remove('hidden');   // 顯示卡片容器

            // 填充卡片內容
            cardGreeting.textContent = `給 ${teacherData[selectedTeacherKey].name}，謝謝您！`;
            cardTeacherNameOpening.textContent = teacherData[selectedTeacherKey].name;
            teacherPhoto.src = teacherData[selectedTeacherKey].photo;
            teacherPhoto.alt = `感謝 ${teacherData[selectedTeacherKey].name}`;
            cardMessage.innerHTML = teacherData[selectedTeacherKey].message; // 使用 innerHTML 因為訊息包含 <br>

            // 卡片已準備好，等待 opening-panels 被點擊
        } else {
            errorMessage.classList.remove('hidden');
            secretCodeInput.value = '';
            secretCodeInput.focus();
        }
    });
     secretCodeInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            submitCodeBtn.click();
        }
    });


    // --- 音樂播放器邏輯 (與原版相似，但播放觸發點不同) ---
    let isPlaying = false;

    if (backgroundMusic && musicPlayer && playerPlayPauseBtn && songTitleEl && lyricDisplayContainer && prevLyricEl && currentLyricEl && nextLyricEl && progressBar && currentTimeEl && durationEl && openingPanels && cardContent) {
        console.log("✅ 所有音樂播放器和開卡所需元素均已找到。");

        loadAndParseLRC("知足.lrc"); // 修改歌詞檔案名稱

        backgroundMusic.onloadedmetadata = () => { /* ... 與原版相同 ... */ };
        backgroundMusic.ontimeupdate = () => { /* ... 與原版相同 ... */ };
        backgroundMusic.onended = () => { /* ... 與原版相同 ... */ };
        backgroundMusic.onerror = (e) => { /* ... 與原版相同 ... */ };
        backgroundMusic.onplay = () => { /* ... 與原版相同 ... */ };
        backgroundMusic.onpause = () => { /* ... 與原版相同 ... */ };

        // 複製 onloadedmetadata, ontimeupdate, onended, onerror, onplay, onpause 到這裡
        backgroundMusic.onloadedmetadata = () => {
            console.log("🎵 音訊 metadata 載入完成。總時長:", backgroundMusic.duration);
            if (progressBar) progressBar.max = backgroundMusic.duration;
            if (durationEl) durationEl.textContent = formatTime(backgroundMusic.duration);
        };

        backgroundMusic.ontimeupdate = () => {
            if (progressBar) progressBar.value = backgroundMusic.currentTime;
            if (currentTimeEl) currentTimeEl.textContent = formatTime(backgroundMusic.currentTime);
            updateLyricDisplay(backgroundMusic.currentTime);
        };

        backgroundMusic.onended = () => {
            console.log("🎵 音訊播放結束。");
            isPlaying = false;
            if (playerPlayPauseBtn) playerPlayPauseBtn.textContent = '▶️';
            if (progressBar) progressBar.value = 0;
            if (currentTimeEl) currentTimeEl.textContent = '0:00';
            currentLyricIndex = -1; // 重置歌詞索引
            if (prevLyricEl) { prevLyricEl.textContent = ''; prevLyricEl.style.opacity = 0; }
            if (currentLyricEl) { currentLyricEl.textContent = ''; currentLyricEl.style.opacity = 0;}
            if (nextLyricEl) { nextLyricEl.textContent = ''; nextLyricEl.style.opacity = 0; }
            if (songTitleEl) songTitleEl.style.opacity = 1;
        };
         backgroundMusic.onerror = (e) => {
             console.error("❌ 音訊播放錯誤:", e);
             isPlaying = false;
             if (playerPlayPauseBtn) playerPlayPauseBtn.textContent = '▶️';
             if (currentLyricEl) {
                  currentLyricEl.textContent = "播放錯誤";
                  currentLyricEl.style.opacity = 1;
                  currentLyricEl.style.color = 'red';
             }
             if (prevLyricEl) { prevLyricEl.textContent = ''; prevLyricEl.style.opacity = 0; }
             if (nextLyricEl) { nextLyricEl.textContent = ''; nextLyricEl.style.opacity = 0; }
             if (songTitleEl) songTitleEl.style.opacity = 0; // 錯誤時也隱藏歌名，讓錯誤訊息更明顯
        };

        backgroundMusic.onplay = () => {
            console.log("🎵 音訊狀態變為：播放中");
            isPlaying = true;
            if (playerPlayPauseBtn) playerPlayPauseBtn.textContent = '⏸️';
            if (songTitleEl && lyrics.length > 0 && currentLyricEl && currentLyricEl.textContent) {
                songTitleEl.style.opacity = 0; // 有歌詞且在播放時隱藏歌名
            } else {
                songTitleEl.style.opacity = 1; // 無歌詞或未播放時顯示歌名
            }
            if (currentLyricEl) { currentLyricEl.style.color = '#f1c40f'; } // 確保當前歌詞是高亮色
            if (prevLyricEl) { prevLyricEl.style.color = '#bbb'; }
            if (nextLyricEl) { nextLyricEl.style.color = '#bbb'; }

            // 檢查是否有錯誤/無歌詞提示，並在播放時嘗試更新
            if (currentLyricEl && (currentLyricEl.textContent === "無法載入歌詞" || currentLyricEl.textContent === "無歌詞數據")) {
                currentLyricEl.style.opacity = 1; // 保持提示可見
                if (prevLyricEl) prevLyricEl.style.opacity = 0;
                if (nextLyricEl) nextLyricEl.style.opacity = 0;
            } else if (currentLyricEl && lyrics.length > 0) { // 正常顯示三行歌詞
                if (prevLyricEl) prevLyricEl.style.opacity = 0.7;
                if (currentLyricEl) currentLyricEl.style.opacity = 1;
                if (nextLyricEl) nextLyricEl.style.opacity = 0.7;
            }
        };

         backgroundMusic.onpause = () => {
             console.log("🎵 音訊狀態變為：已暫停。");
             isPlaying = false;
             if (playerPlayPauseBtn) playerPlayPauseBtn.textContent = '▶️';
             if (songTitleEl) songTitleEl.style.opacity = 1; // 暫停時顯示歌名
              // 暫停時，歌詞可以稍微降低透明度
              if (currentLyricEl && currentLyricEl.textContent && currentLyricEl.textContent !== "無法載入歌詞" && currentLyricEl.textContent !== "無歌詞數據") {
                  if (prevLyricEl) prevLyricEl.style.opacity = 0.3;
                  if (currentLyricEl) currentLyricEl.style.opacity = 0.5;
                  if (nextLyricEl) nextLyricEl.style.opacity = 0.3;
              }
         };


        playerPlayPauseBtn.addEventListener('click', function() { /* ... 與原版相同 ... */ });
        if (progressBar && backgroundMusic) {
            progressBar.addEventListener('input', function() { /* ... 與原版相同 ... */ });
            progressBar.addEventListener('change', function() { /* ... 與原版相同 ... */ });
        }
        // 複製 playerPlayPauseBtn 和 progressBar 的事件監聽器到這裡
        playerPlayPauseBtn.addEventListener('click', function() {
            console.log("🖱️ 播放/暫停按鈕被點擊！");
            if (backgroundMusic.paused) {
                console.log("🎧 嘗試從暫停狀態播放...");
                 backgroundMusic.play().then(() => { console.log("🎵 play() Promise resolved (成功恢復播放)。"); }).catch(e => { console.log("❌ play() Promise rejected (恢復播放失敗)。", e); });
            } else {
                console.log("⏸️ 嘗試暫停音樂...");
                backgroundMusic.pause();
            }
        });

        if (progressBar && backgroundMusic) {
            progressBar.addEventListener('input', function() {
                console.log("🖱️ 進度條 'input' 事件觸發，值:", progressBar.value);
                backgroundMusic.currentTime = progressBar.value;
                updateLyricDisplay(backgroundMusic.currentTime); // 拖動時也更新歌詞
            });
             progressBar.addEventListener('change', function() { // 拖動結束
                   console.log("🖱️ 進度條 'change' 事件觸發，值:", progressBar.value);
                   // 如果之前是播放狀態，拖動結束後繼續播放
                   // 如果是暫停狀態，則保持暫停
                   if (isPlaying && backgroundMusic.paused) { // isPlaying 記錄的是拖動前的狀態
                       console.log("🖱️ 進度條拖動結束，恢復播放...");
                       backgroundMusic.play().catch(e => console.log("恢復播放失敗:", e));
                   }
             });
        }


        // === 開卡面板點擊監聽器 (核心：在這裡觸發音樂播放和播放器展開) ===
        openingPanels.addEventListener('click', function() {
            console.log("✅ 開場面板被點擊了！開始開卡和播放器動畫...");

            // 觸發播放器從初始狀態展開
            if (musicPlayer.classList.contains('player-initial')) {
                console.log("▶️ 觸發音樂播放器動畫：從初始狀態彈出。");
                musicPlayer.classList.remove('player-initial');
                const contentFadeDelay = 400; // 與原版一致或按需調整

                setTimeout(() => {
                    const controls = musicPlayer.querySelector('.player-controls');
                    const info = musicPlayer.querySelector('.player-info');
                    if (controls) { controls.classList.add('content-visible'); controls.style.pointerEvents = 'auto';}
                    if (info) { info.classList.add('content-visible'); info.style.pointerEvents = 'auto';}
                    if (playerPlayPauseBtn) playerPlayPauseBtn.style.pointerEvents = 'auto';
                    if (progressBar) progressBar.style.pointerEvents = 'auto';
                    console.log("▶️ 播放器內容設定為可見狀態。");

                    // 嘗試音樂自動播放
                    if (backgroundMusic.paused) {
                        console.log("🎵 開卡時嘗試自動播放音樂...");
                        backgroundMusic.play().then(() => { console.log("🎵 開卡時自動播放成功！"); }).catch(e => { console.log("🔇 開卡時自動播放失敗:", e); });
                    } else {
                        console.log("🎵 開卡時，音樂已在播放。");
                        if(songTitleEl && lyrics.length > 0) songTitleEl.style.opacity = 0;
                    }
                }, contentFadeDelay);
            }
            //  ... 以下面板動畫與原版相同 ...
            const openingText = openingPanels.querySelector('#opening-text');
            const textFadeOutDuration = 500;
            const panelAnimationDuration = 1000;
            if (openingText) { openingText.style.opacity = '0'; }
            setTimeout(function() {
                if (openingText) openingText.style.display = 'none';
                const leftPanel = openingPanels.querySelector('.left-panel');
                const rightPanel = openingPanels.querySelector('.right-panel');
                if (leftPanel) leftPanel.classList.add('open');
                if (rightPanel) rightPanel.classList.add('open');
                cardContent.classList.remove('hidden');
                setTimeout(function() { cardContent.classList.add('visible'); }, 50);
            }, textFadeOutDuration);
            setTimeout(function() {
                 if (openingPanels) {
                    openingPanels.style.display = 'none';
                    console.log("✅ 開場面板已隱藏。");
                 }
            }, textFadeOutDuration + panelAnimationDuration);
        });

    } else {
        console.error("❌ 無法找到一個或多個音樂播放器或開卡所需元素。音樂播放器和開卡功能可能無法運作。");
    }
});
