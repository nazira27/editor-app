<!-- RichTextEditor.vue -->
<template>
  <div class="editor">
    <div class="editor-buttons mb-2">
      <b-button-group class="mr-2">
        <b-button 
          :class="{ active: isActive('bold') }"
          @click="commands.bold"
          v-b-tooltip.hover title="Bold"
        >
          <b-icon-type-bold></b-icon-type-bold>
        </b-button>
        <b-button 
          :class="{ active: isActive('italic') }"
          @click="commands.italic"
          v-b-tooltip.hover title="Italic"
        >
          <b-icon-type-italic></b-icon-type-italic>
        </b-button>
        <b-button 
          :class="{ active: isActive('strike') }"
          @click="commands.strike"
          v-b-tooltip.hover title="Strike-through"
        >
          <b-icon-type-strikethrough></b-icon-type-strikethrough>
        </b-button>
        <b-button 
          :class="{ active: isActive('code') }"
          @click="commands.code"
          v-b-tooltip.hover title="Inline Code"
        >
          <b-icon-code></b-icon-code>
        </b-button>
      </b-button-group>

      <b-button-group class="mr-2">
        <b-button 
          :class="{ active: isActive('heading', { level: 1 }) }"
          @click="commands.heading({ level: 1 })"
          v-b-tooltip.hover title="Heading 1"
        >
          H1
        </b-button>
        <b-button 
          :class="{ active: isActive('heading', { level: 2 }) }"
          @click="commands.heading({ level: 2 })"
          v-b-tooltip.hover title="Heading 2"
        >
          H2
        </b-button>
      </b-button-group>

      <b-button-group class="mr-2">
        <b-button 
          :class="{ active: isActive('bulletList') }"
          @click="commands.bulletList"
          v-b-tooltip.hover title="Bullet List"
        >
          <b-icon-list-ul></b-icon-list-ul>
        </b-button>
        <b-button 
          :class="{ active: isActive('orderedList') }"
          @click="commands.orderedList"
          v-b-tooltip.hover title="Numbered List"
        >
          <b-icon-list-ol></b-icon-list-ol>
        </b-button>
      </b-button-group>

      <b-button-group>
        <b-button 
          :class="{ active: isActive('blockquote') }"
          @click="commands.blockquote"
          v-b-tooltip.hover title="Blockquote"
        >
          <b-icon-blockquote-left></b-icon-blockquote-left>
        </b-button>
        <b-button 
          :class="{ active: isActive('codeBlock') }"
          @click="commands.codeBlock"
          v-b-tooltip.hover title="Code Block"
        >
          <b-icon-code-square></b-icon-code-square>
        </b-button>
        <b-button
          @click="commands.horizontalRule"
          v-b-tooltip.hover title="Horizontal Line"
        >
          <b-icon-hr></b-icon-hr>
        </b-button>
        <b-button
          @click="commands.clearFormat"
          v-b-tooltip.hover title="Clear Formatting"
        >
          <b-icon-eraser></b-icon-eraser>
        </b-button>
      </b-button-group>
    </div>
    <editor-content :editor="editor" class="editor-content"></editor-content>
  </div>
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-2'
import StarterKit from '@tiptap/starter-kit'

export default {
  name: 'RichTextEditor',
  components: {
    EditorContent
  },
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      editor: null,
      commands: {}
    }
  },
  watch: {
    value(newValue) {
      const content = this.editor?.getHTML()
      if (this.editor && newValue !== content) {
        this.editor.commands.setContent(newValue)
      }
    }
  },
  mounted() {
    this.editor = new Editor({
      content: this.value,
      extensions: [StarterKit],
      onUpdate: () => {
        this.$emit('input', this.editor.getHTML())
      }
    })

    this.commands = {
      bold: () => this.editor.chain().focus().toggleBold().run(),
      italic: () => this.editor.chain().focus().toggleItalic().run(),
      strike: () => this.editor.chain().focus().toggleStrike().run(),
      code: () => this.editor.chain().focus().toggleCode().run(),
      heading: (attrs) => this.editor.chain().focus().toggleHeading(attrs).run(),
      bulletList: () => this.editor.chain().focus().toggleBulletList().run(),
      orderedList: () => this.editor.chain().focus().toggleOrderedList().run(),
      blockquote: () => this.editor.chain().focus().toggleBlockquote().run(),
      codeBlock: () => this.editor.chain().focus().toggleCodeBlock().run(),
      horizontalRule: () => this.editor.chain().focus().setHorizontalRule().run(),
      clearFormat: () => this.editor.chain().focus().clearNodes().unsetAllMarks().run()
    }
  },
  beforeDestroy() {
    if (this.editor) {
      this.editor.destroy()
    }
  },
  methods: {
    isActive(type, attrs = {}) {
      return this.editor?.isActive(type, attrs) ?? false
    }
  }
}
</script>

<style scoped>
.editor {
  border: 1px solid #ccc;
  border-radius: 4px;
}

.editor-content {
  padding: 1rem;
  min-height: 300px;
  background-color: white;
}

.editor-buttons {
  padding: 0.5rem;
  border-bottom: 1px solid #ccc;
  background-color: #f8f9fa;
}

:deep(.ProseMirror) {
  outline: none;
  min-height: 300px;
}

:deep(.ProseMirror p) {
  margin-bottom: 1em;
}

:deep(.ProseMirror h1) {
  font-size: 2em;
  margin-bottom: 0.5em;
}

:deep(.ProseMirror h2) {
  font-size: 1.5em;
  margin-bottom: 0.5em;
}

:deep(.ProseMirror ul),
:deep(.ProseMirror ol) {
  padding-left: 1.5em;
  margin-bottom: 1em;
}

.editor-buttons .btn {
  border-radius: 0;
}

.editor-buttons .btn.active {
  background-color: #e9ecef;
  border-color: #dee2e6;
}

.editor-buttons .btn-group + .btn-group {
  margin-left: 0.5rem;
}

.editor-buttons .btn-group {
  margin-bottom: 0.5rem;
}

.editor-buttons .btn {
  padding: 0.25rem 0.5rem;
}

.editor-buttons .btn:hover {
  background-color: #929eab;
}

.editor-buttons .btn.active {
  background-color: #dee2e6;
  border-color: #ced4da;
  box-shadow: inset 0 3px 5px rgba(0,0,0,.125);
}
</style> 