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
                <n-grid-item>
                    <CardToAnswer title="石室诗士施氏"
                        msg="石室诗士施氏，嗜狮，誓食十狮。适施氏时时适市视狮。十时，适十狮适市。是时，适施氏适市。氏视是十狮，恃矢势，使是十狮逝世。氏拾是十狮尸，适石室。石室湿，氏使侍拭石室。石室拭，氏始试食是十狮尸。食时，始识是十狮尸，实十石狮尸。试释是事。"
                        time="2023-01-29" :loading="loading" :sensitive="false" />
                </n-grid-item>
                <n-grid-item>
                    <UnansweredCard title="石室诗士施氏"
                        msg="石室诗士施氏，嗜狮，誓食十狮。适施氏时时适市视狮。十时，适十狮适市。是时，适施氏适市。氏视是十狮，恃矢势，使是十狮逝世。氏拾是十狮尸，适石室。石室湿，氏使侍拭石室。石室拭，氏始试食是十狮尸。食时，始识是十狮尸，实十石狮尸。试释是事。"
                        :likes="666" :dislikes="994" time="2023-01-29" :loading="loading" :sensitive="false" />
                </n-grid-item>
            </n-grid>
        </n-layout-content>
        <n-layout-footer class="innerFooter">
        </n-layout-footer>
    </n-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Person, Heart, HeartDislike } from '@vicons/ionicons5'
import UnansweredCard from '../components/UnansweredCard.vue'
import AnsweredCard from '../components/AnsweredCard.vue'
import CardToAnswer from '../components/CardToAnswer.vue'

export default defineComponent({
    components: {
        Person,
        Heart,
        HeartDislike,
        UnansweredCard,
        AnsweredCard,
        CardToAnswer
    },
    setup() {

        return {

            loading: ref(true),
            sensitive: ref(true)
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