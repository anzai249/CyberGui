<template>
    <!-- Add New Drawer Menu -->
    <n-drawer v-model:show="askActive" :width="getDrawerWidth()" :max-width="screenWidth" placement="right" >
        <n-drawer-content :title="$t('header.addNew')" closable>
            <n-form>
                <n-form-item>
                    <div style="left: 50%; width: 100%;">
                        <n-space vertical align="center">
                            <n-input round v-model:value="title" :placeholder="$t('addNew.title')" show-count
                                :maxlength="30" class="askInput"/>
                            <n-input round v-model:value="detail" type="textarea" :placeholder="$t('addNew.detail')"
                                show-count :maxlength="120" class="askInput" />
                            <n-switch v-model:value="sensitive">
                                <template #checked>
                                    {{ $t('addNew.sensitiveTrue') }}
                                </template>
                                <template #unchecked>
                                    {{ $t('addNew.sensitiveFalse') }}
                                </template>
                            </n-switch>
                            <n-button type="primary" ghost style="width: 150px;"
                                @click="submitQuestion(title, detail, sensitive)">
                                <template #icon>
                                    <n-icon>
                                        <Checkmark />
                                    </n-icon>
                                </template>
                                {{ $t('addNew.submit') }}
                            </n-button>
                        </n-space>
                    </div>
                </n-form-item>
            </n-form>
        </n-drawer-content>
    </n-drawer>
</template>

<style scoped>
.askInput {
    width: 400px;
}

</style>

<script>
import { defineComponent, ref } from "vue";
import { useMessage } from "naive-ui";
import { Add as addIcon, Checkmark } from "@vicons/ionicons5"
import { useI18n } from 'vue-i18n'
import api from "../api.js"

export default defineComponent({
    props: {
        active: {
            type: Boolean
        }
    },
    components: {
        addIcon,
        Checkmark
    },
    emits: ['changeActive'],
    data() {
        return {
            askActive: ref(false),
            sensitive: ref(false),
            title: "",
            detail: ""
        }
    },
    watch: {
        active: {
            handler: 'activeChange',
            deep: true
        },
        askActive: {
            handler: 'askActiveChange',
            deep: true
        }
    },
    methods: {
        getDrawerWidth(){
            if (window.screen.width>=650){
                return 450
            } else {
                return window.screen.width * 0.95
            }
        },
        submitQuestion(title, detail, sensitive) {
            // Ask new question
            let sensitiveParam = 0
            if (sensitive) { sensitiveParam = 1 } else { sensitiveParam = 0 }
            api.post('/ask', { title: title, content: detail, sensitive: sensitiveParam })
                .then(response => {
                    this.askSuccess()
                    this.activeChange()
                    this.$router.go(0)
                })
                .catch(error => {
                    this.askFailed(error)
                });
        },
        activeChange() {
            this.askActive = !this.askActive
        },
        askActive() {
            this.$emit('changeActive')
        }
    },
    setup() {
        const { t } = useI18n()
        const message = useMessage()
        return {
            askSuccess() {
                message.success(
                    t('addNew.success')
                );
            },
            askFailed(error) {
                message.error(
                    t('addNew.error') + error
                );
            }
        }
    }
})
</script>


