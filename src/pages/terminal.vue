<template>
  <div class="adminLoginBack">
    <n-card class="adminLogin" :title="$t('terminal.login')">
      <n-space justify="space-around" size="large">
        <n-input type="password" v-model:value="terminalPass" :placeholder="$t('terminal.password')" :maxlength="50" />
        <n-button type="primary" @click="handleLogin(terminalPass)">{{ $t("terminal.confirm") }}</n-button>
      </n-space>
    </n-card>
    <div class="adminLoginShadow"></div>
  </div>
  <n-layout>
    <n-layout-content :content-style="getContentWidth()" style="justify-content: center; display: flex;">
      <n-grid v-if="loading" cols="s:1 m:2 l:2 xl:3 xxl:3" responsive="screen" x-gap="12" y-gap="12">
        <n-grid-item v-for="i in 6">
          <LoadingCard />
        </n-grid-item>
      </n-grid>
      <n-grid v-else="!loading" cols="s:1 m:2 l:2 xl:3 xxl:3" responsive="screen" x-gap="12" y-gap="12">
        <n-grid-item v-for="item in questionsData">
          <CardToEdit v-if="item.answerid" :id="item.id" :title="item.title" :msg="item.content" :likes="item.like"
            :dislikes="item.dislike" :time="item.time" :sensitive="!!item.sensitive"
            :answer="(answersData.find(function (answerItem) { return answerItem.id === item.answerid; }) || []).answer"
            :reviewed="!!item.reviewed" />
          <CardToAnswer v-else :id="item.id" :title="item.title" :msg="item.content" :likes="item.like"
            :dislikes="item.dislike" :time="item.time" :sensitive="!!item.sensitive" :reviewed="!!item.reviewed" />
        </n-grid-item>
      </n-grid>
    </n-layout-content>
    <n-layout-footer class="innerFooter">
    </n-layout-footer>
  </n-layout>
</template>

<script>
import { defineComponent } from 'vue'
import { useMessage } from 'naive-ui'
import { Person, Heart, HeartDislike } from '@vicons/ionicons5'
import { useI18n } from 'vue-i18n'
import md5 from "blueimp-md5"
import cookies from 'vue-cookies'
import CardToAnswer from '../components/CardToAnswer.vue'
import CardToEdit from '../components/CardToEdit.vue'
import LoadingCard from '../components/LoadingCard.vue'
import api from "../api.js"

export default defineComponent({
  components: {
    Person,
    Heart,
    HeartDislike,
    CardToAnswer,
    CardToEdit,
    LoadingCard
  },
  data() {
    return {
      questionsData: [],
      answersData: [],
      loading: true,
      terminalPass: '',
      isLoginShow: 'flex'
    }
  },
  setup() {
    const { t } = useI18n()
    const message = useMessage()
    return {
      emptyPass() {
        message.error(
          t('terminal.emptyPass')
        );
      },
      wrongPass(error) {
        message.error(
          t('terminal.wrongPass') + error
        );
      }
    }
  },
  mounted() {
    this.checkLogin()
  },
  watch: {
    questionsData: {
      handler: 'arrayChange',
      deep: true
    }
  },
  methods: {
    getContentWidth() {
      if (window.screen.width > 425) {
        return 'padding: 20px; width: 80%'
      } else {
        return 'padding: 10px; width: 95%'
      }
    },
    checkLogin() {
      api.post('/loginstate', { session: md5(cookies.get('SID')) })
        .then(response => {
          if (response.logined) {
            this.fetchAnswers()
            this.fetchQuestions()
            this.isLoginShow = 'none'
          } else {
            return
          }
        })
        .catch(error => {
          return
        });
    },
    handleLogin(terminalPass) {
      if (!terminalPass) {
        this.emptyPass()
      } else {
        api.post('/login', { password: md5(terminalPass) })
          .then(response => {
            cookies.set('SID', response.session)
            this.fetchAnswers()
            this.fetchQuestions()
            this.isLoginShow = 'none'
          })
          .catch(error => {
            this.wrongPass(error)
          });
      }
    },
    fetchQuestions() {
      api.post('/getquestionsterminal', { session: md5(cookies.get('SID')) })
        .then(response => {
          // this.questionsData = response.result;
          response.result.forEach(element => {
            this.questionsData.push(element)
          });
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    },
    fetchAnswers() {
      api.post('/getanswers')
        .then(response => {
          response.result.forEach(element => {
            this.answersData.push(element)
          });
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    },
    arrayChange() {
      this.loading = false
    }
  }
})
</script>

<style>
body {
  background-color: snow;
}

.adminLoginBack {
  position: absolute;
  display: v-bind(isLoginShow);
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
}

.adminLoginShadow {
  background-color: black;
  opacity: 0.25;
  width: 100%;
  height: 100%;
  z-index: 24;
}

.adminLogin {
  position: absolute;
  width: 25%;
  min-width: 150px;
  min-width: 100px;
  z-index: 25;
}

.innerFooter {
  background: rgba(128, 128, 128, 0.2);
  padding: 24px;
}

@media (max-width: 650px) {
  .cardContainer {
    width: 100%;
  }
}

@media (min-width: 650px) {
  .cardContainer {
    width: 80%;
  }
}
</style>