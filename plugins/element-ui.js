import Vue from 'vue'
// import { MessageBox, Message, Loading } from 'element-ui'
import Element from 'element-ui'

// import lang from 'element-ui/lib/locale/lang/en'
// import elLocal from 'element-ui/lib/locale'
import locale from 'element-ui/lib/locale/lang/en'

Vue.use(Element, { locale })
// elLocal.use(lang)
// const optionFunction = options=> {
//     return {
//          showClose:false,
//         ...options
//     }
   
// }
// Vue.prototype.$message = options=>MessageBox(optionFunction(options))