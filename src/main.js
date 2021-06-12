
import {createApp } from 'vue'
import App from './App.vue'
import 'ant-design-vue/dist/antd.css';
const app = createApp(App);

import {
    Button,
    Form,
    Input,
    Card,
    Radio,
    Row,
    Col,
    message,
    Select,
  } from "ant-design-vue";
  app.config.globalProperties.$message = message;
app.provide("$message", message);
  app
  .use(Button)
  .use(Form)
  .use(Input)
  .use(Select)
  .use(Row)
  .use(Col)
  .use(Card)
  .use(Radio)
app.mount("#app");
// createApp(App).mount('#app');
