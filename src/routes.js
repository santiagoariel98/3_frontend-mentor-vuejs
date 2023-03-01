import * as VueRouter from "vue-router";

import InteractiveCardDetailsForm from "./views/1_interactive-card-details-form/Index.vue";

/** @type {import("vue-router").RouteRecordRaw[]} */
const routes = [{ path: "/1_interactive-form", component: InteractiveCardDetailsForm }];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
});

export default router;
