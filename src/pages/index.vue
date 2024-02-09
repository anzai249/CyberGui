<template>
  <n-layout>
    <n-layout-content :content-style="getContentWidth()"
      style="justify-content: center; display: flex;">
      <n-grid v-if="loading" cols="s:1 m:2 l:2 xl:3 xxl:3" responsive="screen" x-gap="12" y-gap="12">
        <n-grid-item v-for="i in 6">
          <LoadingCard />
        </n-grid-item>
      </n-grid>
      <n-grid v-else="!loading" cols="s:1 m:2 l:2 xl:3 xxl:3" responsive="screen" x-gap="12" y-gap="12">
        <n-grid-item v-for="item in questionsData">
          <AnsweredCard v-if="item.answerid" :id="item.id" :title="item.title" :msg="item.content" :likes="item.like"
            :dislikes="item.dislike" :time="item.time" :sensitive="!!item.sensitive"
            :answer="(answersData.find(function (answerItem) { return answerItem.id === item.answerid; }) || []).answer" />
          <UnansweredCard v-else :id="item.id" :title="item.title" :msg="item.content" :likes="item.like"
            :dislikes="item.dislike" :time="item.time" :sensitive="!!item.sensitive" />
        </n-grid-item>
      </n-grid>
    </n-layout-content>
  </n-layout>
</template>
  
<script>
import { defineComponent, ref } from 'vue'
import { Person, Heart, HeartDislike } from '@vicons/ionicons5'
import UnansweredCard from '../components/UnansweredCard.vue'
import AnsweredCard from '../components/AnsweredCard.vue'
import LoadingCard from '../components/LoadingCard.vue'
import api from "../api.js"


export default defineComponent({
  components: {
    Person, Heart, HeartDislike, UnansweredCard, AnsweredCard, LoadingCard
  },
  data() {
    return {
      questionsData: [],
      answersData: [],
      loading: true
    };
  },
  // setup() {
  //   return {
  //     loading: ref(true)
  //   }
  // },
  mounted() {
    this.fetchAnswers()
    this.fetchQuestions()
    // this.loading = false
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
    fetchQuestions() {
      api.post('/getquestions')
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