// this script runs in the context of devtool.html which is embeded as a iframe in Chrome devtools tab
import log from './utils/logger.js'

const tabTitle = "{{camelize name}} Devtool"
const icon = "img/48.png"
const html = "html/devtool.html"

function createDevtoolPanel () {
  chrome.devtools.panels.create(tabTitle, icon, html, panel => {
    'Shown,Hidden,Search'.split(',').forEach(event => {
      panel['on' + event].addListener(function (arg1, arg2) {
        log(event, arg1, arg2);
        if (event === 'Hidden') {
          window.app.onHidden();
        }
        chrome.runtime.sendMessage({type:':{{name}}-devtool-' + event.toLowerCase()})
      })
    })
  });
}

createDevtoolPanel();

/* eslint-disable */
import Vue from 'vue'
// import Vuex from 'vuex'
import App from './components/Devtool.vue'

// vuex
// const store = new Vuex.Store({
//   modules
// })

const app = new Vue({
  el: '#root',
  render: h => h(App)
})
