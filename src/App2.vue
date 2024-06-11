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
import { ref, watchEffect } from 'vue'
import { Codemirror } from 'vue-codemirror'
import { sql } from '@codemirror/lang-sql'
import {
  autocompletion,
  acceptCompletion,
  moveCompletionSelection,
} from '@codemirror/autocomplete'
import { ViewUpdate, keymap, EditorView } from '@codemirror/view'
import { EditorState } from '@codemirror/state'

let editable = false

let extensions = ref([
  sql(),
  keymap.of([
    {
      key: 'Tab',
      run: acceptCompletion,
    },
  ]),
  EditorView.editable.of(false),
  EditorState.readOnly.of(true),
])

const sqlCode = ref('')
</script>
<style>
.mm {
  width: 1400px;
  height: 700px;
  border: 1px solid pink;
  color: #111;
  background-color: #fff;
}
</style>
