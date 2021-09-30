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
const app = {
  songs: [
    {
      name: "Yêu Là Cưới",
      singer: "Phát Hồ",
      path: "./assets/music/song1.mp3",
      images: "./assets/images/song1.jpg",
    },
    {
      name: "Khuê Mộc Lang",
      singer: "Hương Ly, Jombie",
      path: "./assets/music/song2.mp3",
      images: "./assets/images/song2.jpg",
    },
    {
      name: "Lời Chia Tay Khó Nói",
      singer: "Chi Dân",
      path: "./assets/music/song3.mp3",
      images: "./assets/images/song3.jpg",
    },
    {
      name: "Cưới Thôi",
      singer: "Masew, Masiu",
      path: "./assets/music/song4.mp3",
      images: "./assets/images/song4.jpg",
    },
    {
      name: "Thê Lương",
      singer: "Phúc Chinh",
      path: "./assets/music/song5.mp3",
      images: "./assets/images/song5.jpg",
    },
    {
      name: "Độ Tộc 2",
      singer: "Masew",
      path: "./assets/music/song6.mp3",
      images: "./assets/images/song6.jpg",
    },
  ],
  render: function () {
    const htmls = this.songs.map((song, index) => {
      return `
             <div class="song">
                <div class="thumb"
                    style="background-image: url('${song.images}')">
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
  handleEvents: function () {
    const cd = $(".cd");
    const cdWidth = cd.offsetWidth;
    document.onscroll = function () {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const newCdWidth = cdWidth - scrollTop;
      cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
      cd.style.opacity = newCdWidth / cdWidth;
    };
  },
  start: function () {
    this.handleEvents();
    this.render();
  },
};
app.start();
