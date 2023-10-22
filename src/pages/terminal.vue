<template>
    <n-layout>
        <n-layout-content content-style="padding: 30px; width: 80%" style="justify-content: center; display: flex;">
            <n-grid v-if="loading" cols="s:1 m:2 l:2 xl:3 xxl:3" responsive="screen" x-gap="12" y-gap="12">
                <n-grid-item v-for="i in 6">
                    <LoadingCard />
                </n-grid-item>
            </n-grid>
            <n-grid v-else="!loading" cols="s:1 m:2 l:2 xl:3 xxl:3" responsive="screen" x-gap="12" y-gap="12">
                <n-grid-item v-for="item in questionsData">
                    <CardToEdit v-if="item.answerid" :id="item.id" :title="item.title" :msg="item.content"
                        :likes="item.like" :dislikes="item.dislike" :time="item.time" :sensitive="item.sensitive"
                        :answer="(answersData.find(function (answerItem) { return answerItem.id === item.answerid; }) || []).answer" />
                    <CardToAnswer v-else :id="item.id" :title="item.title" :msg="item.content" :likes="item.like"
                        :dislikes="item.dislike" :time="item.time" :sensitive="item.sensitive" />
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
            loading: true
        }
    },
    setup() {
    },
    mounted() {
        this.fetchQuestions()
        this.fetchAnswers()
    },
  watch: {
    questionsData: {
      handler: 'arrayChange',
      deep: true
    }
  },methods: {
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