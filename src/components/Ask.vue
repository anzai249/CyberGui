<script setup>
import { defineComponent, h, ref } from "vue";
import { useMessage } from "naive-ui";
import { Add as addIcon, Checkmark } from "@vicons/ionicons5"
import axios from 'axios'

defineProps({
    active: {
        type: Boolean,
        require: true
    }

})
</script>

<script>
export default defineComponent({
    components: {
        addIcon
    },
    emits:['changeActive'],
    setup() {
        const message = useMessage()
        return {
            askSuccess() {
                message.success($t('addNew.success'))
            },
            askFailed(error) {
                message.error($t('addNew.error'), error)
            },
        }
    },
    data() {
        return{
            askActive: ref(false)
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
        submitQuestion(title, detail, sensitive) {
            // Ask new question
            let sensitiveParam = 0
            if (sensitive) { sensitiveParam = 1 } else { sensitiveParam = 0 }
            axios.post('http://localhost:1107/ask', '{ "title": "' + title + '", "content": "' + detail + '", "sensitive": "' + sensitiveParam + '"}')
                .then(response => {
                    this.askSuccess()
                })
                .catch(error => {
                    this.askFailed(error)
                });
        },
        activeChange(){
            this.askActive = !this.askActive
        },
        askActive(){
            this.$emit('changeActive')
        }
    }
})
</script>


<template>
    <!-- Add New Drawer Menu -->
    <n-drawer v-model:show="askActive" :width="450" placement="right">
        <n-drawer-content :title="$t('header.addNew')" closable>
            <n-form>
                <n-form-item>
                    <div style="left: 50%; width: auto;">
                        <n-space vertical align="center">
                            <n-input round v-model:value="title" :placeholder="$t('addNew.title')" show-count
                                :maxlength="30" :count-graphemes="countGraphemes" style="width: 400px;" />
                            <n-input round v-model:value="detail" type="textarea" :placeholder="$t('addNew.detail')"
                                show-count :maxlength="120" style="width: 400px;" />
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