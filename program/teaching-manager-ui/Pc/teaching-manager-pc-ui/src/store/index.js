import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const vuex = new Vuex.Store({
    state: {
        role: '',       //登录用户的角色
        token: '',      //用户token
        name: '',       //用户名
        id: ''          //用户id
    }
})

export default vuex