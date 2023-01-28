import { createI18n } from "vue-i18n";
import messages from "./index.js";

const i18n = createI18n({
    legacy: false,
    locale: localStorage.getItem('locale') || 'zhcn',
    messages
})

export default i18n