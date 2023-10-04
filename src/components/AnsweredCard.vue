<script setup>
import { defineComponent, ref } from 'vue'
import { Person, Heart, HeartDislike } from '@vicons/ionicons5'
defineProps({
    id: {
        type: Number,
        required: true
    },
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
    sensitive: {
        type: Boolean,
        required: true
    },
    answer: {
        type: String,
        required: true
    }
})
const colors = ['#c3cfe2']
const randomColor = Math.floor(Math.random() * colors.length + 1) - 1
</script>

<script>

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
            }
        } else {
            return {
                blurRate: '0px',
            }
        }
    },

    setup() {
    },
    methods: {
        showSensi() {
            this.blurRate = '0px'
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
            <n-card ref="card" class="mask" @click="showSensi()">
                <template #header>
                    <n-divider title-placement="left" style="top: -10px;">
                        <n-avatar round :style="{
                            backgroundColor: colors[randomColor]
                        }">
                            <n-icon>
                                <person />
                            </n-icon>
                        </n-avatar>
                    </n-divider>
                    <div>
                        {{ title }}
                    </div>
                </template>
                <n-space vertical>
                    <div class="question_div" style="word-wrap:break-word;">
                        {{ msg }}
                    </div>
                    <n-space vertical>
                        <n-space justify="space-between" size="large" style="height: 28px;">
                            <div style="color: rgba(204, 204, 204, 1); top:15%; position: relative;">
                                {{ time }}
                            </div>
                            <n-space justify="end">
                                <n-button style="font-size: 20px; width:90px" round size="small">
                                    <n-icon>
                                        <heart />
                                    </n-icon>
                                    {{ likes }}
                                </n-button>
                                <n-button style="font-size: 20px; width:90px" round size="small">
                                    <n-icon>
                                        <HeartDislike />
                                    </n-icon>
                                    {{ dislikes }}
                                </n-button>
                            </n-space>
                        </n-space>
                        <n-divider title-placement="left">
                            <n-avatar round src="./src/assets/Avatar.jpg" />
                        </n-divider>
                        <div class="answer_div" style="word-wrap:break-word;">
                            {{ answer }}
                        </div>
                    </n-space>
                </n-space>
            </n-card>
        </n-space>
    </div>
</template>