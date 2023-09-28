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
    }
})
const colors = ['#c3cfe2']
const randomColor = Math.floor(Math.random() * colors.length + 1) - 1
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
            console.log('123')
            this.blurRate = '0px'
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
                    <n-divider v-if="loading" title-placement="left" style="top: -10px;">
                        <n-skeleton v-if="loading" height="34px" circle />
                    </n-divider>
                    <n-skeleton v-if="loading" text width="60%" height="20px" />
                    <template v-else>
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
                </template>
                <n-space vertical>
                    <n-skeleton v-if="loading" text :repeat="4" />
                    <template v-else>
                        <div class="test_div" style="word-wrap:break-word;">
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
                    </n-space>
                </n-space>
            </n-card>
        </n-space>
    </div>
</template>