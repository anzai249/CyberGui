<template>
  <n-config-provider :theme="isDark" :theme-overrides="themeOverrides">
    <n-layout>
      <n-layout-header class="main-header" bordered>
        <n-tabs v-model:value="valueTab" :bar-width="35" type="line" animated size="large"
          @update:value="handleBeforeLeave" default-value="archive" class="notMobile">
          <template #prefix>
            <n-divider vertical />
            <a class="logo" @click="$router.push('/')"><img height="45" :src="logoBig" /></a>
            <n-divider vertical />
          </template>
          <n-tab-pane name="archive" :tab="$t('header.archive')">
          </n-tab-pane>
          <n-tab-pane name="about" :tab="$t('header.about')">
          </n-tab-pane>
          <template #suffix>
            <n-switch v-model:value="isDarkSwitched" @update:value="darkSwitch" size="large">
              <template #checked-icon>
                🌙
              </template>
              <template #unchecked-icon>
                🔆
              </template>
            </n-switch>
            <n-divider vertical />
            <n-button ghost color="#8a2be2" @click="showAddDrawer">
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
            <a class="logo" @click="$router.push('/')"><img height="53" :src="logoSmall" /></a>
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
      <n-layout class="questions-content">
        <n-message-provider>
          <RouterView />
        </n-message-provider>
      </n-layout>
    </n-layout>
    <!-- Mobile Header Menu -->
    <n-drawer v-model:show="menuActive" :width="getDrawerWidth()">
      <n-drawer-content closable>
        <!-- Mobile Header Menu Content Here -->
        <n-space vertical align="center">
          <n-button-group size="large">
            <n-button type="default" round @click="$router.push('/');
            menuActive = false;">
              {{ $t('header.archive') }}
            </n-button>
            <n-button type="default" round @click="$router.push('/about');
            menuActive = false;">
              {{ $t('header.about') }}
            </n-button>
          </n-button-group>
          <n-divider />
          <n-switch v-model:value="isDarkSwitched" @update:value="darkSwitch" size="large">
            <template #checked-icon>
              🌙
            </template>
            <template #unchecked-icon>
              🔆
            </template>
          </n-switch>
          <n-divider />
          <n-button ghost color="#8a2be2" @click="showAddDrawer">
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
    <n-message-provider>
      <Ask ref="askDrawer" :active="this.addDrawer" @change-active="showAddDrawer" />
    </n-message-provider>
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

.logo {
  cursor: pointer;
  filter: invert(v-bind(invertRate));
}

.main-header {
  height: 53px;
  position: fixed;
  z-index: 100;
  width: 100%;
  padding: 0;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.15);
}

.questions-content {
  /* padding: 24px; */
  margin-top: 53px;
}
</style>

<script>
import { defineComponent, h, ref } from "vue";
import { NImage, darkTheme, useOsTheme } from "naive-ui";
import { useI18n } from 'vue-i18n'
import cookies from 'vue-cookies'
import { Add as addIcon, ReorderThreeSharp, Checkmark } from "@vicons/ionicons5"
import Ask from "./components/Ask.vue"
import { useRouter } from "vue-router"
const globalSettings = require("./settings.json")
const logoBig = (globalSettings.images.logo_big || "./assets/logo.png")
const logoSmall = (globalSettings.images.logo_small || "./assets/logoMobile.png")
const defaultLang = (globalSettings.others.defaultLanguage || 'enus')
const primaryColor = (globalSettings.theme.primaryColor || "#8a2be2")
const primaryColorHover = (globalSettings.theme.primaryColorHover || "#8a2be2")
const primaryColorPressed = (globalSettings.theme.primaryColorPressed || "#610AB3")
const primaryColorSuppl = (globalSettings.theme.primaryColorSuppl || "#8a2be2")
const languageFlags = (globalSettings.images.language_flags)

export default defineComponent({
  components: {
    addIcon,
    ReorderThreeSharp,
    Checkmark,
    Ask
  },
  setup() {
    const router = useRouter()
    const askActive = ref(false)
    const menuActive = ref(false)
    const addDrawer = ref(false)
    let value = ref()
    const osThemeRef = useOsTheme()
    let isDarkSwitched = ref(false)
    let osTheme = osThemeRef
    let isDark = ref(null)
    let invertRate = ref(0)
    let valueTab = ref('archive')
    if (router.currentRoute.value.path === '/') {
      valueTab = ref('archive')
    } else if (router.currentRoute.value.path === '/about') {
      valueTab = ref('about')
    } else {
      valueTab = ref('archive')
    }

    if (cookies.isKey("cyberguiLang")) {
      value = ref(cookies.get("cyberguiLang"))
    } else {
      value = ref(defaultLang)
    }

    if (cookies.isKey("cyberguiDark")) {
      if (!!parseInt(cookies.get("cyberguiDark"))) {
        console.log(cookies.get("cyberguiDark"))
        isDarkSwitched = ref(true)
        isDark = ref(darkTheme)
        invertRate = ref(0.9)
        console.log(isDark)
      } else {
        console.log(false)
        isDarkSwitched = ref(false)
        isDark = ref(null)
        invertRate = ref(0)
        console.log(isDark)
      }
    } else {
      if (osTheme._value === 'dark') {
        isDarkSwitched = ref(true)
        isDark = ref(darkTheme)
        invertRate = ref(0.9)
      } else {
        isDarkSwitched = ref(false)
        isDark = ref(null)
        invertRate = ref(0)
      }
    }

    const themeOverrides = {
      common: {
        primaryColor: primaryColor,
        primaryColorHover: primaryColorHover,
        primaryColorPressed: primaryColorPressed,
        primaryColorSuppl: primaryColorSuppl
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
      logoBig,
      logoSmall,
      askActive,
      menuActive,
      addDrawer,
      themeOverrides,
      isDarkSwitched,
      osTheme,
      isDark,
      invertRate,
      value,
      t,
      valueTab,
      options: [
        {
          label: "English",
          value: "enus",
          img: (languageFlags.enus || "./assets/flags/gb.png")
        },
        {
          label: "Deutsch",
          value: "de",
          img: (languageFlags.de || "./assets/flags/de.png")
        },
        {
          label: "Русский",
          value: "ru",
          img: (languageFlags.ru || "./assets/flags/ru.png")
        },
        {
          label: "日本語",
          value: "ja",
          img: (languageFlags.ja || "./assets/flags/jp.png")
        },
        {
          label: "Nederlands",
          value: "nl",
          img: (languageFlags.nl || "./assets/flags/nl.png")
        },
        {
          label: "简体中文",
          value: "zhcn",
          img: (languageFlags.zhcn || "./assets/flags/cn.png")
        },
        {
          label: "繁體中文",
          value: "zhtw",
          img: (languageFlags.zhtw || "./assets/flags/tw.png")
        },
        {
          label: "减啼忠吻",
          value: "zhsb",
          img: (languageFlags.zhsb || "./assets/flags/unknown.png")
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
    getDrawerWidth() {
      if (window.screen.width >= 350) {
        return 350
      } else {
        return window.screen.width * 0.95
      }
    },
    darkSwitch() {
      if (this.isDarkSwitched) {
        this.isDark = darkTheme
        this.invertRate = 0.9
        cookies.set('cyberguiDark', 1, "8h")

      } else {
        this.isDark = null
        this.invertRate = 0
        cookies.set('cyberguiDark', 0, "8h")

      }
    },
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
        case 'ja':
          this.lang = value;
          this.$i18n.locale = this.lang;
          break;
        case 'nl':
          this.lang = value;
          this.$i18n.locale = this.lang;
          break;
        case 'de':
          this.lang = value;
          this.$i18n.locale = this.lang;
          break;
        case 'ru':
          this.lang = value;
          this.$i18n.locale = this.lang;
          break;
        case 'zhsb':
          this.lang = value;
          this.$i18n.locale = this.lang;
          break;
        default:
          this.lang = value;
          this.$i18n.locale = this.lang;
          break;
      }
      cookies.set('cyberguiLang', this.lang)
    },
    showAddDrawer() {
      this.addDrawer = !this.addDrawer
    }
  }
});

</script>

