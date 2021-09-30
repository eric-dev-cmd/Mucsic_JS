/**
    1. Render songs
    2. Scroll top
    3. Plays / pause / seek
    4. CD routate
    5. Next / Pre
    6. Random
    7. Next / Repeated when ended
    8. Active song
    9. Scroll active song into view
    10. Play song when click
 */
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const prevBtn = $(".btn-prev");
const nextBtn = $(".btn-next");
const cd = $(".cd");
const cdWidth = cd.offsetWidth;
const playBtn = $(".btn-toggle-play");
const player = $(".player");
const progress = $("#progress");
const randomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");
const app = {
  currentIndex: 0,
  isPlaying: false,
  isRandom: false,
  isRepeat: false,
  songs: [
    {
      name: "Yêu Là Cưới",
      singer: "Phát Hồ",
      path: "./assets/music/song1.mp3",
      image: "./assets/images/song1.jpg",
    },
    {
      name: "Khuê Mộc Lang",
      singer: "Hương Ly, Jombie",
      path: "./assets/music/song2.mp3",
      image: "./assets/images/song2.jpg",
    },
    {
      name: "Lời Chia Tay Khó Nói",
      singer: "Chi Dân",
      path: "./assets/music/song3.mp3",
      image: "./assets/images/song3.jpg",
    },
    {
      name: "Cưới Thôi",
      singer: "Masew, Masiu",
      path: "./assets/music/song4.mp3",
      image: "./assets/images/song4.jpg",
    },
    {
      name: "Thê Lương",
      singer: "Phúc Chinh",
      path: "./assets/music/song5.mp3",
      image: "./assets/images/song5.jpg",
    },
    {
      name: "Độ Tộc 2",
      singer: "Masew",
      path: "./assets/music/song6.mp3",
      image: "./assets/images/song6.jpg",
    },
  ],
  render: function () {
    const htmls = this.songs.map((song, index) => {
      return `
             <div class="song ${index === this.currentIndex ? "active" : ""}">
                <div class="thumb"
                    style="background-image: url('${song.image}')">
                </div>
                <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                </div>
                <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>
          `;
    });
    $(".playlist").innerHTML = htmls.join(" ");
  },
  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      },
    });
  },
  handleEvents: function () {
    let _this = this;

    // Xu ly CD quay / dung
    const cdThumbAnimate = cdThumb.animate(
      [
        {
          transform: "rotate(360deg)",
        },
      ],
      {
        duration: 10000,
        iterations: Infinity,
      }
    );
    cdThumbAnimate.pause();
    // Xử lý phóng to thu nhỏ CD
    document.onscroll = function () {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const newCdWidth = cdWidth - scrollTop;
      cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
      cd.style.opacity = newCdWidth / cdWidth;
    };
    // Xử lý khi click playing
    playBtn.onclick = function () {
      if (_this.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      // Khi song duoc PLAY
      audio.onplay = function () {
        _this.isPlaying = true;
        player.classList.add("playing");
        cdThumbAnimate.play();
      };
      // Khi song duoc PAUSE
      audio.onpause = function () {
        _this.isPlaying = false;
        player.classList.remove("playing");
        cdThumbAnimate.pause();
      };
      // Khi tiến độ bài hát thay đổi
      audio.ontimeupdate = function () {
        if (audio.duration) {
          const progressPercent = Math.floor(
            (audio.currentTime / audio.duration) * 100
          );
          progress.value = progressPercent;
        }
      };
      // Xu ly khi tua song
      progress.onchange = function (e) {
        const seekTime = (audio.duration / 100) * e.target.value;
        audio.currentTime = seekTime;
      };
    };
    nextBtn.onclick = function () {
      if (_this.isRandom) {
        _this.randomSong();
      } else {
        _this.nextSong();
      }
      audio.play();

      _this.render();
    };
    prevBtn.onclick = function () {
      if (_this.isRandom) {
        _this.randomSong();
      } else {
        _this.prevSong();
      }
      audio.play();
      _this.render();
    };
    // Random
    randomBtn.onclick = function () {
      _this.isRandom = !_this.isRandom;
      randomBtn.classList.toggle("active", _this.isRandom);
    };
    // Xu ly next song khi audio ended
    audio.onended = function () {
      if (_this.isRepeat) {
        audio.play();
      } else {
        nextBtn.click();
      }
    };
    // Xu ly lap lai 1 song
    repeatBtn.onclick = function () {
      _this.isRepeat = !_this.isRepeat;
      repeatBtn.classList.toggle("active", _this.isRepeat);
    };
  },
  loadCurrentSong: function () {
    heading.textContent = this.currentSong.name;
    cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
    audio.src = this.currentSong.path;
  },
  nextSong: function () {
    this.currentIndex++;
    if (this.currentIndex >= this.songs.length) {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
  },
  prevSong: function () {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
  },
  randomSong: function () {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.songs.length);
    } while (newIndex === this.currentIndex);
    this.currentIndex = newIndex;
    this.loadCurrentSong();
  },
  start: function () {
    // Định nghĩa các thuộc tính cho object
    this.defineProperties();
    // Lắng nghe / xử lý các sự kiện (DOM events)
    this.handleEvents();
    // Tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
    this.loadCurrentSong();
    //Render playlist
    this.render();
  },
};
app.start();
