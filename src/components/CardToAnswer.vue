<script>
import { defineComponent, ref } from 'vue'
import { Person, Heart, HeartDislike, Checkmark, CloseOutline } from '@vicons/ionicons5'
import { useMessage } from 'naive-ui'
import { useI18n } from 'vue-i18n'
import api from "../api.js"
import md5 from "blueimp-md5"
import cookies from 'vue-cookies'
const colors = require('../settings.json').others.colors
const randomColor = Math.floor(Math.random() * colors.length + 1) - 1

export default defineComponent({
    props: {
        title: {
            type: String,
            required: true
        },
        id: {
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
        sensitive: {
            type: Boolean,
            required: true
        }
    },
    components: {
        Person, Heart, HeartDislike, Checkmark, CloseOutline
    },
    data() {
        if (this.sensitive) {
            return {
                sensitiveObj: { sensitive: true },
                answer: '',
                colors,
                randomColor
            }
        } else {
            return {
                sensitiveObj: { sensitive: false },
                answer: '',
                colors,
                randomColor
            }
        }

    },
    setup() {
        const message = useMessage();
        const { t } = useI18n()
        return {
            answerSuccess() {
                message.success(
                    t('addNew.success')
                );
            },
            answerFailed(error) {
                message.error(
                    t('addNew.error') + error
                );
            },
            deleteMessage() {
                message.info(t('terminal.deleted'));
            }
        };
    },
    methods: {
        answerQuestion() {
            api.post('/answer', { id: this.id, sensitive: this.sensitiveObj.sensitive, reply: this.answer, session: md5(cookies.get('SID')) })
                .then(response => {
                    this.answerSuccess()
                    this.$router.go(0)
                })
                .catch(error => {
                    console.error(error)
                });
        },
        handleDelete() {
            api.post('/delete', { id: this.id, session: md5(cookies.get('SID')) })
                .then(response => {
                    this.deleteMessage()
                    this.$router.go(0)
                })
                .catch(error => {
                    console.error(error)
                });
        }
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
                            {{ new Date(time).toLocaleString() }}
                        </div>
                    </n-space>
                    <n-input round type="textarea" :placeholder="$t('terminal.answer')" show-count :maxlength="120"
                        v-model:value="answer" />
                </n-space>
                <n-space justify="space-between" align="center">
                    <n-button type="primary" secondary @click="answerQuestion()">
                        <template #icon>
                            <n-icon>
                                <Checkmark />
                            </n-icon>
                        </template>
                        {{ $t('addNew.submit') }}
                    </n-button>
                    <n-switch v-model:value="this.sensitiveObj.sensitive" size="large">
                        <template #checked>
                            {{ $t('terminal.sensitiveTrue') }}
                        </template>
                        <template #unchecked>
                            {{ $t('terminal.sensitiveFalse') }}
                        </template>
                    </n-switch>
                    <n-popconfirm @positive-click="handleDelete" :negative-text="$t('terminal.cancel')"
                        :positive-text="$t('terminal.confirm')">
                        <template #trigger>
                            <n-button type="error" secondary>
                                <template #icon>
                                    <n-icon>
                                        <CloseOutline />
                                    </n-icon>
                                </template>
                                {{ $t('terminal.delete') }}
                            </n-button>
                        </template>
                        {{ $t('terminal.deleteConfirm') }}
                    </n-popconfirm>
                </n-space>
            </n-space>
        </n-card>
    </div>
</template>