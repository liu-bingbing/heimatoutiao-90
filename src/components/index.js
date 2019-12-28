import layoutAside from './home/layout-aside.vue'
import layoutHeader from './home/layout-header.vue'
import breadCrumb from './common/bread-crumb.vue'
import { quillEditor } from 'vue-quill-editor'// quill编辑器的组件对象
import coverImage from './publish/cover-image.vue'
import SelectImage from './publish/select-image.vue'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
  install (Vue) {
    Vue.component('layout-aside', layoutAside)
    Vue.component('layout-header', layoutHeader)
    Vue.component('bread-crumb', breadCrumb)// 全局注册一个面包屑
    Vue.component('quill-editor', quillEditor)// 注册一个全局的富文本编辑器
    Vue.component('cover-image', coverImage)// 注册一个封面组件
    Vue.component('select-image', SelectImage)// 注册一个素材库和上传图片组件
  }
}
