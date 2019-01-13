import Vue from 'vue'
import Vuex from 'vuex'

import todoApp from './modules/todoApp'

// Make sure to call Vue.use(Vuex) first if using a module system
Vue.use(Vuex); // Vue plugin https://kr.vuejs.org/v2/guide/plugins.html

export const store = new Vuex.Store({
	modules: {
		todoApp,	
	}
});

