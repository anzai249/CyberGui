<script>
import { defineComponent, ref } from 'vue'
import { Person, Heart, HeartDislike, Checkmark, CloseOutline, ArrowUp } from '@vicons/ionicons5'
import { useMessage } from 'naive-ui'
import { useI18n } from 'vue-i18n'
import api from "../api.js"
import md5 from "blueimp-md5"
import cookies from 'vue-cookies'
const settings = require('../settings.json')
const randomColor = Math.floor(Math.random() * settings.others.colors.length + 1) - 1

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
        },
        answer: {
            type: String,
            required: true,
        },
        reviewed: {
            type: Boolean,
            required: true
        }
    },
    components: {
        Person, Heart, HeartDislike, Checkmark, CloseOutline, ArrowUp
    },
    data() {
        if (this.sensitive) {
            return {
                sensitiveObj: { sensitive: true },
                answerObj: { answer: this.answer },
                settings,
                randomColor
            }
        } else {
            return {
                sensitiveObj: { sensitive: false },
                answerObj: { answer: this.answer },
                settings,
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
                    t('terminal.success')
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
            api.post('/answer', { id: this.id, sensitive: this.sensitiveObj.sensitive, reply: this.answerObj.answer, session: md5(cookies.get('SID')) })
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
        },
        reviewQuestion() {
            api.post('/review', { id: this.id, session: md5(cookies.get('SID')) })
                .then(response => {
                    this.answerSuccess()
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
                        backgroundColor: settings.others.colors[randomColor]
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
                        v-model:value="this.answerObj.answer" />
                </n-space>
                <n-space justify="space-between" align="center">
                    <n-button type="primary" secondary @click="answerQuestion()">
                        <template #icon>
                            <n-icon>
                                <Checkmark />
                            </n-icon>
                        </template>
                        {{ $t('terminal.answerquestion') }}
                    </n-button>
                    <n-button v-if="settings.others.review && !reviewed" type="info" secondary @click="reviewQuestion()">
                        <template #icon>
                            <n-icon>
                                <ArrowUp />
                            </n-icon>
                        </template>
                        {{ $t('terminal.review') }}
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