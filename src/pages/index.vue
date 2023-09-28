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
      <n-grid cols="s:1 m:2 l:2 xl:3 xxl:3" responsive="screen" x-gap="12" y-gap="12">
        <n-grid-item v-for="item in questionsData">
          <AnsweredCard v-if="item.answerid" :title="item.title" :msg="item.content" :likes="item.like"
            :dislikes="item.dislike" time="2023-01-29" :loading="loading" :sensitive="item.sensitive"
            answer="季姬寂，集鸡，鸡即棘鸡。棘鸡饥叽，季姬及箕稷济鸡。鸡既济，跻姬笈，季姬忌，急咭鸡，鸡急，继圾几，季姬急，即籍箕击鸡，箕疾击几伎，伎即齑，鸡叽集几基，季姬急极屐击鸡，鸡既殛，季姬激，即记《季姬击鸡记》。" />
          <UnansweredCard v-else :title="item.title" :msg="item.content" :likes="item.like" :dislikes="item.dislike"
            time="2023-01-29" :loading="loading" :sensitive="item.sensitive" />
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
import axios from 'axios'


export default defineComponent({
  components: {
    Person, Heart, HeartDislike, UnansweredCard, AnsweredCard
  },
  data() {
    return {
      questionsData: null
    };
  },
  setup() {

    return {

      loading: ref(true),
      sensitive: ref(true)
    }
  },
  mounted() {
    this.fetchQuestions()
  },
  methods: {
    fetchQuestions() {
      axios.post('http://localhost:1107/getquestions')
        .then(response => {
          this.questionsData = response.data.result;
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
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