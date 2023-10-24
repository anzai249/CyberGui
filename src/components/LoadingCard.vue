<script>
import { defineComponent } from 'vue'
export default defineComponent({
    data() {
        return {}
    },
    setup() {
    }
})
</script>
<style>
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
                    <n-divider title-placement="left" style="top: -10px;">
                        <n-skeleton height="34px" circle />
                    </n-divider>
                    <n-skeleton text width="60%" height="20px" />
                </template>
                <n-space vertical>
                    <n-skeleton text :repeat="4" />
                    <n-space vertical>
                        <n-space justify="space-between" size="large" style="height: 28px;">
                            <n-skeleton :width="75" text style="top:15%; position: relative;" />
                            <n-space justify="end">
                                <n-skeleton :width="90" round size="small" />
                                <n-skeleton :width="90" round size="small" />
                            </n-space>
                        </n-space>
                        <n-divider title-placement="left">
                            <n-skeleton height="34px" circle />
                        </n-divider>
                        <n-skeleton text :repeat="3" />
                    </n-space>
                </n-space>
            </n-card>
        </n-space>
    </div>
</template>