import { createApp } from "vue";
import App from "./App.vue";
import "@/assets/styles.css";
import axios from "axios";
import router from "./router";
import store from "./store";

const app = createApp(App);

app.use(router);
app.use(store); //! middleware

app.config.globalProperties.$axios = axios;

app.mount("#app");
