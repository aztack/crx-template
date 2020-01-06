<template lang="pug">
.main(@mouseup.capture="onMouseUp", @mousedown.capture="onMouseDown")
  .root-container.clear-fix
    el-header
      img.logo(:src="LogImg")
      h1
        a(style="color:black;text-decoration:none;"
          target="_blank" href="alert('Place your extension homepage here')") {{camelize name}} Devtool
      el-button#compile-btn(type="primary", size="mini", @click="reload", icon="el-icon-refresh") Reload Extension
    el-container
      el-aside
        el-input(
          size="mini",
          clearable,
          placeholder="Node name",
          v-model="filterText")
        el-tree(
          ref="tree",
          :data="treeNode",
          node-key="id",
          :highlight-current="true",
          :default-expanded-keys="[1, 2]",
          :expand-on-click-node="false",
          :filter-node-method="filterNode",
          @node-click="onClickTreeNode")
      el-main
</template>

<style lang="styl">
.logo
  width: 24px
  height: 24px
  vertical-align: top
  margin-right: 1em
h1
  font-size: 14px
  display: inline
  margin: 0 1em 0 0

.comp-table
  border-collapse: collapse
  .inspect-btn
    text-align: right
  th, td
    padding: .5em 1em !important

.el-table
  margin-bottom: 1em
  &:before
    display: none
  td
    padding: 2px
  th
    background-color: #efefef

.main
  input, button
    border-radius: 2px

.el-button--primary, .el-checkbox__inner
  background-color: #4285F4
  border-color: #4285F4


.el-input--mini .el-input__inner
  height: 24px
  line-height: 24px

.el-input-number--mini
  line-height: 22px

.el-tree-node.is-current
  position: relative
  &:before
    content: '$n0'
    position: absolute
    top: 0.5em
    right: 4px
    color: #b7b7b7
</style>

<script>
import log from '../utils/logger.js'
import injectedScript from '../injectedScript.js'
import LogImg from '../../img/48.png'
// element-ui
import 'element-ui/lib/theme-chalk/index.css'
import { Message } from 'element-ui'
import { Notification } from 'element-ui'
import ElButton from 'element-ui/lib/button'
import ElCheckbox from 'element-ui/lib/checkbox'
import ElSwitch from 'element-ui/lib/switch'
import ElInput from 'element-ui/lib/input'
import ElInputNumber from 'element-ui/lib/input-number'
import ElColorPicker from 'element-ui/lib/color-picker'
import ElTree from 'element-ui/lib/tree'
import ElContainer from 'element-ui/lib/container'
import ElHeader from 'element-ui/lib/header'
import ElAside from 'element-ui/lib/aside'
import ElMain from 'element-ui/lib/main'
import ElFooter from 'element-ui/lib/footer'
import ElTable from 'element-ui/lib/table'
import ElTableColumn from 'element-ui/lib/table-column'

// locale
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
locale.use(lang)

const app = {
  name: 'app',
  mixins: [],
  components: {
    ElInput,
    ElInputNumber,
    ElColorPicker,
    ElButton,
    ElCheckbox,
    ElSwitch,
    ElTree,
    ElContainer,
    ElHeader,
    ElAside,
    ElMain,
    ElFooter,
    ElTable,
    ElTableColumn
  },
  data () {
    return {
      isShowDebugLayer: false,
      isShowFps: true,
      isShowErudaBtn: true,
      treeNode: [],
      nodeProps: [],
      nodeComps: [],
      filterText: '',
      LogImg,
      inputNumberStep: 1
    }
  },
  mounted () {
    window.app = this;
    this.inspectedWindow = chrome.devtools.inspectedWindow;
    const tabId = chrome.devtools.inspectedWindow.tabId
    const conn = chrome.extension.connect({
      name: '' + tabId
    });

    conn.postMessage({
      name: 'panelPageCreated',
      tabId
    });

    log(`Connecting to window #${tabId}`);

    conn.onMessage.addListener(message => {
      if (!message) return;
      log(message);
      switch (message.type) {
        case ':inspectedWinReloaded':
          location.reload();
          break;
      }
    });

    this.init();
  },
  watch: {
  },
  methods: {
    init () {
      this.injectScript();
    },
    eval(code) {
      return new Promise((resolve, reject) => {
        try {
          log(code);
          this.inspectedWindow.eval(code, res => {
            if (res) log(res);
            resolve(res);
          });
        } catch (e) {
          log(e);
          reject(e);
        }
      });
    },
    reload() {
      location.reload();
    },
    injectScript () {
      // inject ccdevtool
      const fn = injectedScript.toString();
      const js = `(${fn})();`
      return this.eval(js).then(_ => log('injected!'));
    }
  }
};

export default app;
</script>
