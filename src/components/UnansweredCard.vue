<script setup lang="ts">
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
    }
})
</script>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Person, Heart, HeartDislike } from '@vicons/ionicons5'

export default defineComponent({
    components: {
        Person, Heart, HeartDislike
    }
})
</script>

<template>
    <n-space vertical>
        <n-card>
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
            <n-skeleton v-if="loading" text :repeat="4" />
            <template v-else>
                <div class="test_div" style="word-wrap:break-word;">
                    {{ msg }}
                </div>
            </template>
            <n-space vertical>
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
        </n-card>
    </n-space>
</template>