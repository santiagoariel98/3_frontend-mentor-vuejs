import App from "./App.vue";
import "./style.css";
import { createApp } from "vue";
import router from "./routes";

createApp(App).use(router).mount("#app");
