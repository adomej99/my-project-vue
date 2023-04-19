import { createApp } from 'vue'
import App from './components/HomePage.vue'

import {router} from '@/router';

export const app = createApp(App);

// const cors = require('cors');
//
// app.use(cors())

// const cors=require("cors");
// const corsOptions ={
//     origin:'*',
//     credentials:true,            //access-control-allow-credentials:true
//     optionSuccessStatus:200,
// }

// app.use(cors(corsOptions))
app.use(router);

app.mount('#app')
