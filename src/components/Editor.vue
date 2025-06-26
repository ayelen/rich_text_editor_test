<script setup>
import { ref, onBeforeUnmount } from 'vue'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'
import TextStyle from '@tiptap/extension-text-style'
import Heading from '@tiptap/extension-heading'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const editor = useEditor({
  extensions: [
    StarterKit.configure({
      bulletList: { keepMarks: true, keepAttributes: false },
    }),
    Image.configure({
      allowBase64: true,
    }),
    Link.configure({
      openOnClick: true,
    }),
    TextStyle,
    Heading.configure({ levels: [1, 2, 3] }),
    TextAlign.configure({
      types: ['heading', 'paragraph'],
    }),
  ],
  content: '<p></p>',
})

onBeforeUnmount(() => editor.value?.destroy())

const insertImageFromURL = () => {
  const url = prompt(t('editor.insertImage'))
  if (url && isValidImageUrl(url)) {
    editor.value?.chain().focus().setImage({ src: url }).run()
  } else {
    alert(t('editor.invalidImage'))
  }
}

function isValidImageUrl(url) {
  return /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp|svg)$/i.test(url)
}

const setLink = () => {
  const url = prompt(t('editor.enterUrl'))
  if (url) {
    editor.value?.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }
}

const setFontSize = (size) => {
  editor.value?.chain().focus().setMark('textStyle', { fontSize: size }).run()
}
</script>

<template>
  <div class="editor">
    <div class="toolbar">
      <button @click="editor.chain().focus().toggleBold().run()">{{ t('editor.bold') }}</button>
      <button @click="editor.chain().focus().toggleItalic().run()">{{ t('editor.italic') }}</button>
      <button @click="editor.chain().focus().toggleBulletList().run()">
        {{ t('editor.bullets') }}
      </button>
      <button @click="editor.chain().focus().toggleOrderedList().run()">
        {{ t('editor.numbered') }}
      </button>
      <button @click="editor.chain().focus().setTextAlign('left').run()">
        {{ t('editor.alignLeft') }}
      </button>
      <button @click="editor.chain().focus().setTextAlign('center').run()">
        {{ t('editor.alignCenter') }}
      </button>
      <button @click="editor.chain().focus().setTextAlign('right').run()">
        {{ t('editor.alignRight') }}
      </button>
      <button @click="setLink">{{ t('editor.link') }}</button>
      <button @click="insertImageFromURL">{{ t('editor.insertImage') }}</button>

      <select @change="setFontSize($event.target.value)">
        <option disabled selected>{{ t('editor.fontSize') }}</option>
        <option value="12px">12px</option>
        <option value="16px">16px</option>
        <option value="20px">20px</option>
        <option value="24px">24px</option>
      </select>
    </div>

    <EditorContent :editor="editor" />
  </div>
</template>

<style scoped>
.editor {
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 6px;
  max-width: 750px;
}
.toolbar {
  margin-bottom: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
button,
select {
  padding: 0.4rem 0.6rem;
  font-size: 14px;
}
</style>
