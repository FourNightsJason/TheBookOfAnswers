<template>
  <div id="index" @click="onEnter">
    <div class="background" :style="{opacity}"></div>
    <header :style="headerStyle">
      <img src="@/assets/images/title.jpg" />
    </header>
    <mu-slide-bottom-transition>
      <article v-show="isEnter">
        <ol>
          <li>
            <p>闭上眼睛</p>
          </li>
          <li>
            <p>用5至10秒的时间集中思考你的问题。例如：“他喜欢我吗？”或“我需要换个工作吗？”</p>
          </li>
          <li>
            <p>在想象或说出你的问题的同时，点击卡片，答案开始跳动</p>
          </li>
          <li>
            <p>在你感觉时间正确的时候，再次点击卡片，你要寻找的答案就在那里</p>
          </li>
          <li>
            <p>遇到任何问题，你都可以点击它，点击卡片外退出</p>
          </li>
        </ol>
        <div class="center-button">
          <wired-button class="button" @click.stop="onBegin">开始</wired-button>
        </div>
      </article>
    </mu-slide-bottom-transition>
    <mu-scale-transition>
      <wired-card
        id="answers"
        fill="#b99746"
        v-show="isBegin"
        @click.stop="onGo"
        v-click-outside="onExit"
      >
        <div class="center-text">
          <p v-if="!isGo">点击让答案开始跳动</p>
          <div v-else>
            <p>{{answers[randomIndex].CN}}</p>
            <p>{{answers[randomIndex].EN}}</p>
          </div>
        </div>
      </wired-card>
    </mu-scale-transition>
  </div>
</template>

<script>
import { WiredButton, WiredCard } from "wired-elements";
export default {
  data() {
    return {
      opacity: "1",
      headerStyle: {
        top: "48vh",
        width: "50vmin"
      },
      randomIndex: 0,
      answersInterval: null,
      isEnter: false,
      isBegin: false,
      isGo: false,
      isStop: true
    };
  },
  computed: {
    answers: () => require("@/assets/data/answers")
  },
  methods: {
    init() {
      this.opacity = "1";
      this.headerStyle = {
        top: "48vh",
        width: "50vmin"
      };
      this.randomIndex = 0;
      this.answersInterval = null;
      this.isEnter = false;
      this.isBegin = false;
      this.isGo = false;
      this.isStop = true;
    },
    onEnter() {
      if (!this.isBegin) {
        this.isEnter = true;
        this.opacity = "0";
        this.headerStyle = { top: "50px", width: "80%" };
      }
    },
    onBegin() {
      this.isEnter = false;
      this.isBegin = true;
    },
    onGo() {
      this.isGo = true;
      if (this.isStop) {
        this.isStop = false;
        let totalIndex = this.answers.length;
        this.answersInterval = setInterval(() => {
          this.randomIndex = Math.floor(Math.random() * totalIndex);
        }, 5);
      } else {
        this.isStop = true;
        clearInterval(this.answersInterval);
        this.answersInterval = null;
      }
    },
    onExit() {
      if (this.isBegin) {
        if (this.answersInterval) {
          clearInterval(this.answersInterval);
        }
        this.init();
      }
    }
  },
  components: {
    WiredButton,
    WiredCard
  }
};
</script>

<style lang="less" scoped>
#index {
  height: 100%;
  overflow: hidden;
  .background {
    width: 100%;
    height: 100%;
    background: url("../assets/images/page.jpg") 50% 50% no-repeat;
    background-size: contain;
    transition: all 0.5s;
  }
  header {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    transition: all 0.5s;
    img {
      width: 100%;
    }
  }
  article {
    position: absolute;
    top: calc(~"4rem + 50px");
    font-size: 1rem;
    ol {
      margin: 0;
      padding: 0 15vw;
    }
  }
  #answers {
    position: absolute;
    top: calc(~"5rem + 50px");
    left: 50%;
    height: calc(~"100vh - 5rem - 100px");
    transform: translateX(-50%);
    width: 80%;
    font-size: 1.25rem /* 20/16 */;
    display: grid;
    // justify-items: center;
    align-items: center;
  }
}
</style>