<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <NLayout class="layout" :position="fixedMenu">
      <NLayout>
        <NLayoutHeader :inverted="getHeaderInverted" :position="fixedHeader">
          <n-tabs :bar-width="35" type="line" animated size="large">
            <template #prefix>
              <n-divider vertical />
              <img width="150" src="@/assets/logo.png" />
              <n-divider vertical />
            </template>
            <n-tab-pane name="archive" :tab="$t('header.archive')">
            </n-tab-pane>
            <n-tab-pane name="about" :tab="$t('header.about')">
            </n-tab-pane>
            <template #suffix>
              <n-button ghost color="#8a2be2" @click="active = true">
                <template #icon>
                  <n-icon>
                    <add-icon />
                  </n-icon>
                </template>
                {{ $t('header.addNew') }}
              </n-button>
              <n-divider vertical />
              <n-space vertical style="width:175px">
                <n-select v-model:value="value" :options="options" :render-label="renderLabel"
                  :render-tag="renderSingleSelectTag" placeholder="Language" @update:value="changeLangEvent" />
              </n-space>
              <n-divider vertical />
            </template>
          </n-tabs>
          <PageHeader v-model:collapsed="collapsed" :inverted="inverted" />
        </NLayoutHeader>
        <NLayoutContent>
          <RouterView style="width:50%; align-self: center; left: 25%; position: fixed;" />
        </NLayoutContent>
      </NLayout>
    </NLayout>
    <n-drawer v-model:show="active" :width="500" placement="right">
      <n-drawer-content :title="$t('header.addNew')">
        <n-form>
          <n-form-item>
            <div style="left: 50%; width: auto;">
              <n-space vertical align="center" >
                <n-input round v-model:title="title" :placeholder="$t('addNew.title')" show-count :maxlength="12"
                  :count-graphemes="countGraphemes" style="width: 450px;"/>
                <n-input round v-model:detail="detail" type="textarea" :placeholder="$t('addNew.detail')" style="width: 450px;"/>
                <n-switch v-model:sensitive="sensitive" >
                  <template #checked>
                    {{ $t('addNew.sensitiveTrue') }}
                  </template>
                  <template #unchecked>
                    {{ $t('addNew.sensitiveFalse') }}
                  </template>
                </n-switch>
                <n-button type="primary" ghost style="width: 150px;">
                  {{ $t('addNew.submit') }}
                </n-button>
              </n-space>
            </div>
          </n-form-item>
        </n-form>
      </n-drawer-content>
    </n-drawer>
  </n-config-provider>
</template>

<style scoped>
.n-layout-footer {
  padding: 24px;
}
</style>

<script>
import { defineComponent, h, ref } from "vue";
import {
  NImage
} from "naive-ui";
import { useI18n } from 'vue-i18n'
import { Add as addIcon } from '@vicons/ionicons5'

export default defineComponent({
  components: {
    addIcon
  },
  setup() {
    const active = ref(false);
    const themeOverrides = {
      common: {
        primaryColor: '#8a2be2',
        primaryColorHover: "#8a2be2"
      }
    }
    const { t } = useI18n()
    const renderSingleSelectTag = ({ option }) => {
      return h(
        "div",
        {
          style: {
            display: "flex",
            alignItems: "center"
          }
        },
        [
          h(NImage, {
            src: option.img,
            width: 25,
            previewDisabled: true

          }),
          h(
            "div",
            {
              style: {
                marginLeft: "12px"
              }
            },
            [
              h("div", null, option.label)
            ]
          )
        ]
      );
    };
    const renderLabel = (option) => {
      return h(
        "div",
        {
          style: {
            display: "flex",
            alignItems: "center"
          }
        },
        [
          h(NImage, {
            src: option.img,
            width: 25,
            previewDisabled: true
          }),
          h(
            "div",
            {
              style: {
                marginLeft: "12px"
              }
            },
            [
              h("div", null, option.label)
            ]
          )
        ]
      );
    };
    return {
      active,
      themeOverrides,
      value: 'zhcn',
      t,
      options: [
        {
          label: "简体中文",
          value: "zhcn",
          img: "https://flagcdn.com/40x30/cn.png"
        },
        {
          label: "繁體中文",
          value: "zhtw",
          img: "https://flagcdn.com/40x30/tw.png"
        },
        {
          label: "English",
          value: "enus",
          img: "https://flagcdn.com/40x30/gb.png"
        },
        {
          label: "日本語",
          value: "jajp",
          img: "https://flagcdn.com/40x30/jp.png"
        }
      ],
      renderSingleSelectTag,
      renderLabel
    };
  },
  methods: {
    handleClick() {

    },
    activateAdd() {
      active.value = true;
      placement.value = "bottom";
    },
    changeLangEvent(value) {
      console.log(value)
      switch (value) {
        case 'zhcn':
          this.lang = value;
          this.$i18n.locale = this.lang;
          break;
        case 'zhtw':
          this.lang = value;
          this.$i18n.locale = this.lang;
          break;
        case 'enus':
          this.lang = value;
          this.$i18n.locale = this.lang;
          break;
        case 'jajp':
          this.lang = value;
          this.$i18n.locale = this.lang;
          break;
        default:
          this.lang = value;
          this.$i18n.locale = this.lang;
          break;
      }
    }
  }
});

</script>

