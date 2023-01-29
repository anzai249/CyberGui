<template>
  <n-space vertical>
    <n-card>
      <template #header>
        <n-divider v-if="loading" title-placement="left">
          <n-skeleton v-if="loading" height="34px" circle />
        </n-divider>
        <n-skeleton v-if="loading" text width="60%" height="20px" />
        <template v-else>
          <n-divider title-placement="left">
            <n-avatar round>
              <n-icon>
                <person />
              </n-icon>
            </n-avatar>
          </n-divider>
          <div>
            石室诗士施氏
          </div>
        </template>
      </template>
      <n-skeleton v-if="loading" text :repeat="4" />
      <template v-else>
        <div class="test_div" style="word-wrap:break-word;">
          石室诗士施氏，嗜狮，誓食十狮。适施氏时时适市视狮。十时，适十狮适市。是时，适施氏适市。氏视是十狮，恃矢势，使是十狮逝世。氏拾是十狮尸，适石室。石室湿，氏使侍拭石室。石室拭，氏始试食是十狮尸。食时，始识是十狮尸，实十石狮尸。试释是事。
        </div>
        <div class="test_div" style="word-wrap:break-word;">
          季姬寂，集鸡，鸡即棘鸡。棘鸡饥叽，季姬及箕稷济鸡。鸡既济，跻姬笈，季姬忌，急咭鸡，鸡急，继圾几，季姬急，即籍箕击鸡，箕疾击几伎，伎即齑，鸡叽集几基，季姬急极屐击鸡，鸡既殛，季姬激，即记《季姬击鸡记》。
        </div>
      </template>
      <n-space vertical>
        <n-space>
          <n-switch v-model:value="loading" />
        </n-space>
        <n-space>
          <n-skeleton v-if="loading" :width="90" round size="small" />
          <n-button v-else style="font-size: 20px; width:90px" round size="small">
            <n-icon>
              <heart />
            </n-icon>
            100
          </n-button>
          <n-skeleton v-if="loading" :width="90" round size="small" />
          <n-button v-else style="font-size: 20px; width:90px" round size="small">
            <n-icon>
              <HeartDislike />
            </n-icon>
            0
          </n-button>
        </n-space>
      </n-space>
    </n-card>
  </n-space>
</template>
  
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Person, Heart, HeartDislike } from '@vicons/ionicons5'
export default defineComponent({
  components: {
    Person, Heart, HeartDislike
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