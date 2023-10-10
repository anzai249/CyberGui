<template>
  <n-layout>
    <n-layout-content content-style="padding: 30px; width: 80%" style="justify-content: center; display: flex;">
      <n-switch v-model:value="loading">
        <template #checked>
          Skel
        </template>
        <template #unchecked>
          Skel
        </template>
      </n-switch>
      <n-switch v-model:value="sensitive">
        <template #checked>
          Sens
        </template>
        <template #unchecked>
          Sens
        </template>
      </n-switch>
      UNDER DEVELOPMENT
      <n-grid v-if="loading" cols="s:1 m:2 l:2 xl:3 xxl:3" responsive="screen" x-gap="12" y-gap="12">
        <n-grid-item v-for="i in 6">
          <LoadingCard />
        </n-grid-item>
      </n-grid>
      <n-grid v-else="!loading" cols="s:1 m:2 l:2 xl:3 xxl:3" responsive="screen" x-gap="12" y-gap="12">
        <n-grid-item v-for="item in questionsData">
          <AnsweredCard v-if="item.answerid" :id="item.id" :title="item.title" :msg="item.content" :likes="item.like"
            :dislikes="item.dislike" :time="item.time" :sensitive="item.sensitive"
            :answer="(answersData.find(function (answerItem) { return answerItem.id === item.answerid; }) || []).answer" />
          <UnansweredCard v-else :id="item.id" :title="item.title" :msg="item.content" :likes="item.like" :dislikes="item.dislike"
            :time="item.time" :sensitive="item.sensitive" />
        </n-grid-item>
      </n-grid>
    </n-layout-content>
    <n-layout-footer class="innerFooter">

    </n-layout-footer>

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
    this.fetchQuestions()
    this.fetchAnswers()
    // this.loading = false
  },
  watch: {
    questionsData: {
      handler: 'arrayChange',
      deep: true
    }
  },
  methods: {
    fetchQuestions() {
      api.post('/getquestions')
        .then(response => {
          // this.questionsData = response.result;
          response.result.forEach(element => {
            this.questionsData.push(element)
          });
          console.log("fetch success", response.result);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    },
    fetchAnswers() {
      api.post('/getanswers')
        .then(response => {
          console.log("fetch success", response.result);
          response.result.forEach(element => {
            this.answersData.push(element)
          });
        })
        .catch(error => {
          console.log("fetch failed");
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