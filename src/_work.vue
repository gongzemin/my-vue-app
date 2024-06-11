<template>
  <div class="mm" id="code-container"></div>
</template>

<script setup>
import { EditorState } from '@codemirror/state'
import { basicSetup } from 'codemirror'
import { sql } from '@codemirror/lang-sql'
import { ViewUpdate, keymap, EditorView } from '@codemirror/view'
import { acceptCompletion } from '@codemirror/autocomplete'
import { onMounted } from 'vue'
let state = EditorState.create({
  extensions: [
    basicSetup,
    sql(),
    keymap.of([
      {
        key: 'Tab',
        run: acceptCompletion,
      },
    ]),
  ],
  // 编辑器中的内容
  doc: '',
})

onMounted(() => {
  let view = new EditorView({
    state,
    // 编辑器 挂载的dom
    parent: document.querySelector('#code-container'),
  })
})
</script>
<style>
.mm {
  width: 1400px;
  height: 700px;
  border: 1px solid pink;
}
</style>
