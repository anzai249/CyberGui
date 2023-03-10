<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <n-layout position="absolute">
      <n-layout-header style="height: 53px;" bordered>
        <n-tabs :bar-width="35" type="line" animated size="large" @update:value="handleBeforeLeave"
          default-value="archive" class="notMobile">
          <template #prefix>
            <n-divider vertical />
            <img height="53" src="@/assets/logo.png" />
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
        <n-tabs class="mobile">
          <template #prefix>
            <n-divider vertical />
            <img height="53" src="@/assets/logoMobile.png" />
            <n-divider vertical />
          </template>
          <template #suffix>
            <n-button ghost color="#8a2be2" @click="menuActive = true">
              <template #icon>
                <n-icon>
                  <ReorderThreeSharp />
                </n-icon>
              </template>
            </n-button>
            <n-divider vertical />
          </template>
        </n-tabs>
      </n-layout-header>
      <n-layout position="absolute" style="top: 53px; bottom: 0px">
        <RouterView />
      </n-layout>
    </n-layout>
    <!-- Mobile Header Menu -->
    <n-drawer v-model:show="menuActive" :width="350" :placement="right">
      <n-drawer-content closable>
        <!-- Mobile Header Menu Content Here -->
        <n-space vertical align="center">
          <n-button-group size="large">
            <n-button type="default" round @click="$router.push('/')">
              {{ $t('header.archive') }}
            </n-button>
            <n-button type="default" round @click="$router.push('/about')">
              {{ $t('header.about') }}
            </n-button>
          </n-button-group>
          <n-divider />
          <n-button ghost color="#8a2be2" @click="active = true" style="width: 150px;">
            <template #icon>
              <n-icon>
                <add-icon />
              </n-icon>
            </template>
            {{ $t('header.addNew') }}
          </n-button>
          <n-space vertical style="width:175px">
            <n-select v-model:value="value" :options="options" :render-label="renderLabel"
              :render-tag="renderSingleSelectTag" placeholder="Language" @update:value="changeLangEvent" />
          </n-space>
        </n-space>
      </n-drawer-content>
    </n-drawer>
    <!-- Add New Drawer Menu -->
    <n-drawer v-model:show="active" :width="450" placement="right">
      <n-drawer-content :title="$t('header.addNew')" closable>
        <n-form>
          <n-form-item>
            <div style="left: 50%; width: auto;">
              <n-space vertical align="center">
                <n-input round v-model:title="title" :placeholder="$t('addNew.title')" show-count :maxlength="15"
                  :count-graphemes="countGraphemes" style="width: 400px;" />
                <n-input round v-model:detail="detail" type="textarea" :placeholder="$t('addNew.detail')" show-count :maxlength="120"
                  style="width: 400px;" />
                <n-switch v-model:sensitive="sensitive">
                  <template #checked>
                    {{ $t('addNew.sensitiveTrue') }}
                  </template>
                  <template #unchecked>
                    {{ $t('addNew.sensitiveFalse') }}
                  </template>
                </n-switch>
                <n-button type="primary" ghost style="width: 150px;">
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
  </n-config-provider>
</template>

<style scoped>
.n-layout-footer {
  padding: 24px;
}

@media (min-width: 650px) {
  .mobile {
    display: none;
  }
}

@media (max-width: 650px) {
  .notMobile {
    display: none;
  }
}
</style>

<script>
import { defineComponent, h, ref } from "vue";
import { NImage } from "naive-ui";
import { useI18n } from 'vue-i18n'
import { Add as addIcon, ReorderThreeSharp, Checkmark } from "@vicons/ionicons5"
import { useRouter } from "vue-router"

export default defineComponent({
  components: {
    addIcon,
    ReorderThreeSharp,
    Checkmark
  },
  setup() {
    const router = useRouter()
    const active = ref(false);
    const menuActive = ref(false);
    const value = ref("zhcn");
    const themeOverrides = {
      common: {
        primaryColor: '#8a2be2',
        primaryColorHover: "#8a2be2"
      }
    }
    const { t } = useI18n()
    const renderSingleSelectTag = ref(({ option }) => {
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
    });
    const renderLabel = ref((option) => {
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
    });
    return {
      active,
      menuActive,
      themeOverrides,
      value,
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
      renderLabel,
      handleBeforeLeave: (tabName) => {
        switch (tabName) {
          case "archive":
            router.push('/')
            return true;
          case "about":
            router.push('/about')
            return true;
          default:
            return true;
        }
      }
    };
  },
  methods: {
    changeLangEvent(value) {
      this.valueMobile = value
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

