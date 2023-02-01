<script setup>
defineProps({
    title: {
        type: String,
        required: true
    },
    msg: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        required: true
    },
    dislikes: {
        type: Number,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    loading: {
        type: Boolean,
        required: true
    },
    sensitive: {
        type: Boolean,
        required: true
    },
    answer: {
        type: String,
        required: true
    }
})
</script>

<script>
import { defineComponent, ref } from 'vue'
import { Person, Heart, HeartDislike } from '@vicons/ionicons5'

export default defineComponent({
    props: {
        pointerEve: {
            type: String
        },
        blurRate: {
            type: String
        }
    },
    components: {
        Person, Heart, HeartDislike
    },
    data() {
        if (this.sensitive) {
            return {
                blurRate: '5px',
                pointerEve: 'none',
                sensiSwitch: true
            }
        } else {
            return {
                blurRate: '0px',
                pointerEve: 'auto',
                sensiSwitch: false
            }
        }
    },
    setup() {

    },
    methods: {
        showSensi() {
            console.log('123')
            this.blurRate = '0px'
            this.pointerEve = 'suto'
            this.sensiSwitch = false
        }
    }
})
</script>

<style>
.mask {
    filter: blur(v-bind(blurRate));
    pointer-events: v-bind(pointerEve);
}

.cardAll {
    /* position: absolute; */
    /* display: flex; */
    width: 100%;
    /* height: 100%; */
    left: 0;
    top: 0;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
}
</style>

<template>
    <div class="cardAll">
        <n-space vertical>
            <n-card ref="card" class="mask">
                <template #header>
                    <n-divider v-if="loading" title-placement="left" style="top: -10px;">
                        <n-skeleton v-if="loading" height="34px" circle />
                    </n-divider>
                    <n-skeleton v-if="loading" text width="60%" height="20px" />
                    <template v-else>
                        <n-divider title-placement="left" style="top: -10px;">
                            <n-avatar round>
                                <n-icon>
                                    <person />
                                </n-icon>
                            </n-avatar>
                        </n-divider>
                        <div>
                            {{ title }}
                        </div>
                    </template>
                </template>
                <n-space vertical>
                    <n-skeleton v-if="loading" text :repeat="4" />
                    <template v-else>
                        <div class="question_div" style="word-wrap:break-word;">
                            {{ msg }}
                        </div>
                    </template>
                    <n-space vertical>
                        <n-space justify="space-between" size="large" style="height: 28px;">
                            <n-skeleton v-if="loading" :width="75" text style="top:15%; position: relative;" />
                            <div v-else style="color: rgba(204, 204, 204, 1); top:15%; position: relative;">
                                {{ time }}
                            </div>
                            <n-space justify="end">
                                <n-skeleton v-if="loading" :width="90" round size="small" />
                                <n-button v-else style="font-size: 20px; width:90px" round size="small">
                                    <n-icon>
                                        <heart />
                                    </n-icon>
                                    {{ likes }}
                                </n-button>
                                <n-skeleton v-if="loading" :width="90" round size="small" />
                                <n-button v-else style="font-size: 20px; width:90px" round size="small">
                                    <n-icon>
                                        <HeartDislike />
                                    </n-icon>
                                    {{ dislikes }}
                                </n-button>
                            </n-space>
                        </n-space>
                        <n-divider title-placement="left">
                            <n-skeleton v-if="loading" height="34px" circle />
                            <n-avatar v-else round src="./src/assets/Avatar.jpg" />
                        </n-divider>
                        <n-skeleton v-if="loading" text :repeat="3" />
                        <template v-else>
                            <div class="answer_div" style="word-wrap:break-word;">
                                {{ answer }}
                            </div>
                        </template>
                    </n-space>
                </n-space>
            </n-card>
        </n-space>
        <n-button v-if="sensiSwitch" strong secondary type="primary" @click="showSensi()">
            {{ $t('card.showSensitive') }}
        </n-button>
    </div>
</template>