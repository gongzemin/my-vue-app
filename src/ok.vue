<template>
  <div class="mm">
    <Codemirror
      v-model="sqlCode"
      :style="{ width: '100%', height: '550px' }"
      :extensions="extensions"
      :indent-with-tab="false"
    />
  </div>
</template>

<script setup>
import { Codemirror } from 'vue-codemirror'
import { EditorState } from '@codemirror/state'
import { basicSetup } from 'codemirror'
import { EditorView } from '@codemirror/view'
import { onMounted, ref } from 'vue'
import { sql } from '@codemirror/lang-sql'
import { ViewUpdate, keymap } from '@codemirror/view'
import {
  autocompletion,
  acceptCompletion,
  moveCompletionSelection,
} from '@codemirror/autocomplete'

const sqlCode = ref('')

let extensions = ref([
  sql(),
  keymap.of([
    {
      key: 'Tab',
      run: e => {
        acceptCompletion(e)
        return true
      },
    },
  ]),
])
</script>
<style>
.mm {
  width: 1400px;
  height: 700px;
  border: 1px solid pink;
}
.mm1 {
  /* width: 600px;
  height: 700px; */
}
</style>
