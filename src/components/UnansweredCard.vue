<script setup>
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
    }
})
const colors = require('../settings.json').others.colors
const randomColor = Math.floor(Math.random() * colors.length + 1) - 1
</script>

<script>
import { defineComponent, ref } from 'vue'
import { Person, Heart, HeartDislike } from '@vicons/ionicons5'
import api from "../api.js"

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
                likesObj: {
                    "likes": this.likes,
                    "dislikes": this.dislikes
                }
            }
        } else {
            return {
                blurRate: '0px',
                likesObj: {
                    "likes": this.likes,
                    "dislikes": this.dislikes
                }
            }
        }
    },
    setup() {
    },
    methods: {
        showSensi() {
            this.blurRate = '0px'
        },
        handleLike() {
            api.post('/like', { id: this.id })
                .catch(error => {
                    console.error('Error:', error);
                });
            this.likesObj.likes++
        },
        handleDislike() {
            api.post('/dislike', { id: this.id })
                .catch(error => {
                    console.error('Error:', error);
                });
            this.likesObj.dislikes++
        }
    }
})
</script>

<style>
.maskUn {
    filter: blur(v-bind(blurRate));
    pointer-events: v-bind(pointerEve);
}

.cardAll {
    /* position: absolute; */
    /* display: flex; */
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
}
</style>

<template>
    <div class="cardAll">
        <n-space vertical class="maskUn" @click="showSensi()">
            <n-card ref="card">
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
                    <div class="test_div" style="word-wrap:break-word;">
                        {{ msg }}
                    </div>
                    <n-space vertical>
                        <n-space justify="space-between" size="large" style="height: 28px;">
                            <div style="color: rgba(204, 204, 204, 1); top:15%; position: relative;">
                                {{ time }}
                            </div>
                            <n-space justify="end">
                                <n-button style="font-size: 20px; width:90px" round size="small" @click="handleLike()">
                                    <n-icon>
                                        <heart />
                                    </n-icon>
                                    {{ likesObj.likes }}
                                </n-button>
                                <n-button style="font-size: 20px; width:90px" round size="small" @click="handleDislike()">
                                    <n-icon>
                                        <HeartDislike />
                                    </n-icon>
                                    {{ likesObj.dislikes }}
                                </n-button>
                            </n-space>
                        </n-space>
                    </n-space>
                </n-space>
            </n-card>
        </n-space>
    </div>
</template>