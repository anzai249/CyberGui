<template>
    <n-switch v-model:value="loading" />
  <div style="width: 50%; left: 25%; position: fixed;">
    <UnansweredCard title="石室诗士施氏"
      msg="石室诗士施氏，嗜狮，誓食十狮。适施氏时时适市视狮。十时，适十狮适市。是时，适施氏适市。氏视是十狮，恃矢势，使是十狮逝世。氏拾是十狮尸，适石室。石室湿，氏使侍拭石室。石室拭，氏始试食是十狮尸。食时，始识是十狮尸，实十石狮尸。试释是事。"
      :likes="666" :dislikes="994" time="48461616" :loading="loading" />
  </div>

</template>
  
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Person, Heart, HeartDislike } from '@vicons/ionicons5'
import UnansweredCard from '../components/UnansweredCard.vue'

export default defineComponent({
  components: {
    Person, Heart, HeartDislike, UnansweredCard
  },
  setup() {

    return {

      loading: ref(true)
    }
  }
})
</script>

<style>
body {
  background-color: snow;
}
</style>