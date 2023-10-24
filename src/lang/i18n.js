import { createI18n } from "vue-i18n";
import messages from "./index.js";
import cookies from 'vue-cookies'
const defaultLang = require('../settings.json').others.defaultLanguage
let cachedLang = defaultLang

if (cookies.isKey("cyberguiLang")) {
    cachedLang = cookies.get("cyberguiLang")
} else {
    cachedLang = defaultLang
}

const i18n = createI18n({
    legacy: false,
    locale: localStorage.getItem('locale') || cachedLang,
    messages
})

export default i18n