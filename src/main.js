import { createApp } from 'vue'
import App from './App.vue'
// import { NavbarPlugin } from 'bootstrap-vue'
// import Vue from 'vue'
// import BootstrapVue from 'bootstrap-vue'
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'


import {router} from '@/router';

export const app = createApp(App);

// const cors = require('cors');
//
// app.use(cors())
// App.use(NavbarPlugin)

// const cors=require("cors");
// const corsOptions ={
//     origin:'*',
//     credentials:true,            //access-control-allow-credentials:true
//     optionSuccessStatus:200,
// }

// app.use(cors(corsOptions))
app.use(router);
// app.use(BootstrapVue);
app.mount('#app')
