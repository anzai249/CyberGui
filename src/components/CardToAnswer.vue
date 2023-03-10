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
const colors = ['#00c6fb', '#ff9a9e', '#fecfef', '#fbc2eb', '#d4fc79', '#a1c4fd', '#c3cfe2', '#764ba2', '#f43b47']
const randomColor = Math.floor(Math.random() * colors.length + 1) - 1
</script>

<script>
import { defineComponent, ref } from 'vue'
import { Person, Heart, HeartDislike, Checkmark, CloseOutline } from '@vicons/ionicons5'

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
        Person, Heart, HeartDislike, Checkmark, CloseOutline
    },
    data() {
    },
    setup() {

    },
    methods: {
    }
})
</script>

<style>
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
                    </n-space>
                    <n-skeleton v-if="loading" text width="100%" height="75px" />
                    <n-input v-else round type="textarea" :placeholder="$t('terminal.answer')" show-count :maxlength="120" />
                </n-space>
                <n-space justify="space-between">
                    <n-skeleton v-if="loading" :width="75" :sharp="false" size="medium" />
                    <n-button v-else type="primary" ghost>
                        <template #icon>
                            <n-icon>
                                <Checkmark />
                            </n-icon>
                        </template>
                        {{ $t('addNew.submit') }}
                    </n-button>
                    <n-skeleton v-if="loading" :width="75" :sharp="false" size="medium" />
                    <n-button v-else type="error" ghost>
                        <template #icon>
                            <n-icon>
                                <CloseOutline />
                            </n-icon>
                        </template>
                        {{ $t('terminal.delete') }}
                    </n-button>
                </n-space>
            </n-space>
        </n-card>
    </div>
</template>