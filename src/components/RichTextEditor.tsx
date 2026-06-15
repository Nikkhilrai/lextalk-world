"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Table } from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableHeader from '@tiptap/extension-table-header';
import TableCell from '@tiptap/extension-table-cell';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import {
    Bold, Italic, Underline as UnderlineIcon, Strikethrough,
    Heading1, Heading2, Heading3, Heading4,
    List, ListOrdered, Quote, Code, Link as LinkIcon,
    Table as TableIcon, AlignLeft, AlignCenter, AlignRight, AlignJustify,
    Minus, Undo, Redo
} from 'lucide-react';
import { useCallback, useEffect } from 'react';

interface RichTextEditorProps {
    content: string;
    onChange: (content: string) => void;
    placeholder?: string;
}

export default function RichTextEditor({ content, onChange, placeholder }: RichTextEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Table.configure({
                resizable: true,
            }),
            TableRow,
            TableHeader,
            TableCell,
            Link.configure({
                openOnClick: false,
            }),
            Underline,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
        ],
        content: content,
        editorProps: {
            attributes: {
                class: 'prose prose-slate dark:prose-invert max-w-none focus:outline-none min-h-[400px] px-4 py-3',
            },
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    // Update editor content when prop changes (for Word upload)
    useEffect(() => {
        if (editor && content !== editor.getHTML()) {
            editor.commands.setContent(content);
        }
    }, [content, editor]);

    const setLink = useCallback(() => {
        if (!editor) return;

        const previousUrl = editor.getAttributes('link').href;
        const url = window.prompt('URL', previousUrl);

        if (url === null) return;
        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }

        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }, [editor]);

    const addTable = useCallback(() => {
        if (!editor) return;
        editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
    }, [editor]);

    if (!editor) return null;

    const ToolbarButton = ({ onClick, active, children, title }: any) => (
        <button
            onClick={onClick}
            type="button"
            title={title}
            className={`p-2 rounded transition-colors ${active
                ? 'bg-amber-500 text-white'
                : 'hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                }`}
        >
            {children}
        </button>
    );

    return (
        <div className="border border-slate-300 dark:border-slate-600 rounded-lg overflow-hidden bg-white dark:bg-slate-800">
            {/* Toolbar */}
            <div className="border-b border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 p-2 flex flex-wrap gap-1">
                {/* Text Formatting */}
                <div className="flex gap-1 border-r border-slate-300 dark:border-slate-600 pr-2">
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        active={editor.isActive('bold')}
                        title="Bold (Ctrl+B)"
                    >
                        <Bold size={18} />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        active={editor.isActive('italic')}
                        title="Italic (Ctrl+I)"
                    >
                        <Italic size={18} />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleUnderline().run()}
                        active={editor.isActive('underline')}
                        title="Underline (Ctrl+U)"
                    >
                        <UnderlineIcon size={18} />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleStrike().run()}
                        active={editor.isActive('strike')}
                        title="Strikethrough"
                    >
                        <Strikethrough size={18} />
                    </ToolbarButton>
                </div>

                {/* Headings */}
                <div className="flex gap-1 border-r border-slate-300 dark:border-slate-600 pr-2">
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                        active={editor.isActive('heading', { level: 1 })}
                        title="Heading 1"
                    >
                        <Heading1 size={18} />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                        active={editor.isActive('heading', { level: 2 })}
                        title="Heading 2"
                    >
                        <Heading2 size={18} />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                        active={editor.isActive('heading', { level: 3 })}
                        title="Heading 3"
                    >
                        <Heading3 size={18} />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
                        active={editor.isActive('heading', { level: 4 })}
                        title="Heading 4"
                    >
                        <Heading4 size={18} />
                    </ToolbarButton>
                </div>

                {/* Lists */}
                <div className="flex gap-1 border-r border-slate-300 dark:border-slate-600 pr-2">
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        active={editor.isActive('bulletList')}
                        title="Bullet List"
                    >
                        <List size={18} />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        active={editor.isActive('orderedList')}
                        title="Numbered List"
                    >
                        <ListOrdered size={18} />
                    </ToolbarButton>
                </div>

                {/* Alignment */}
                <div className="flex gap-1 border-r border-slate-300 dark:border-slate-600 pr-2">
                    <ToolbarButton
                        onClick={() => editor.chain().focus().setTextAlign('left').run()}
                        active={editor.isActive({ textAlign: 'left' })}
                        title="Align Left"
                    >
                        <AlignLeft size={18} />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().setTextAlign('center').run()}
                        active={editor.isActive({ textAlign: 'center' })}
                        title="Align Center"
                    >
                        <AlignCenter size={18} />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().setTextAlign('right').run()}
                        active={editor.isActive({ textAlign: 'right' })}
                        title="Align Right"
                    >
                        <AlignRight size={18} />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().setTextAlign('justify').run()}
                        active={editor.isActive({ textAlign: 'justify' })}
                        title="Justify"
                    >
                        <AlignJustify size={18} />
                    </ToolbarButton>
                </div>

                {/* Insert */}
                <div className="flex gap-1 border-r border-slate-300 dark:border-slate-600 pr-2">
                    <ToolbarButton onClick={setLink} active={editor.isActive('link')} title="Insert Link">
                        <LinkIcon size={18} />
                    </ToolbarButton>
                    <ToolbarButton onClick={addTable} title="Insert Table">
                        <TableIcon size={18} />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleBlockquote().run()}
                        active={editor.isActive('blockquote')}
                        title="Blockquote"
                    >
                        <Quote size={18} />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                        active={editor.isActive('codeBlock')}
                        title="Code Block"
                    >
                        <Code size={18} />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().setHorizontalRule().run()}
                        title="Horizontal Rule"
                    >
                        <Minus size={18} />
                    </ToolbarButton>
                </div>

                {/* Table Operations (shown only when inside a table) */}
                {editor.isActive('table') && (
                    <div className="flex gap-1 border-r border-slate-300 dark:border-slate-600 pr-2">
                        <button
                            onClick={() => editor.chain().focus().addColumnBefore().run()}
                            type="button"
                            className="px-2 py-1 text-xs rounded hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
                            title="Add Column Before"
                        >
                            Col←
                        </button>
                        <button
                            onClick={() => editor.chain().focus().addColumnAfter().run()}
                            type="button"
                            className="px-2 py-1 text-xs rounded hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
                            title="Add Column After"
                        >
                            Col→
                        </button>
                        <button
                            onClick={() => editor.chain().focus().deleteColumn().run()}
                            type="button"
                            className="px-2 py-1 text-xs rounded hover:bg-red-100 dark:hover:bg-red-900 text-red-700 dark:text-red-300"
                            title="Delete Column"
                        >
                            Del Col
                        </button>
                        <button
                            onClick={() => editor.chain().focus().addRowBefore().run()}
                            type="button"
                            className="px-2 py-1 text-xs rounded hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
                            title="Add Row Before"
                        >
                            Row↑
                        </button>
                        <button
                            onClick={() => editor.chain().focus().addRowAfter().run()}
                            type="button"
                            className="px-2 py-1 text-xs rounded hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
                            title="Add Row After"
                        >
                            Row↓
                        </button>
                        <button
                            onClick={() => editor.chain().focus().deleteRow().run()}
                            type="button"
                            className="px-2 py-1 text-xs rounded hover:bg-red-100 dark:hover:bg-red-900 text-red-700 dark:text-red-300"
                            title="Delete Row"
                        >
                            Del Row
                        </button>
                        <button
                            onClick={() => editor.chain().focus().deleteTable().run()}
                            type="button"
                            className="px-2 py-1 text-xs rounded hover:bg-red-100 dark:hover:bg-red-900 text-red-700 dark:text-red-300"
                            title="Delete Table"
                        >
                            Del Table
                        </button>
                    </div>
                )}

                {/* Undo/Redo */}
                <div className="flex gap-1">
                    <ToolbarButton
                        onClick={() => editor.chain().focus().undo().run()}
                        title="Undo (Ctrl+Z)"
                    >
                        <Undo size={18} />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => editor.chain().focus().redo().run()}
                        title="Redo (Ctrl+Y)"
                    >
                        <Redo size={18} />
                    </ToolbarButton>
                </div>
            </div>

            {/* Editor Content */}
            <div className="bg-white dark:bg-slate-800">
                <EditorContent editor={editor} />
            </div>

            <style jsx global>{`
                .ProseMirror table {
                    border-collapse: collapse;
                    table-layout: fixed;
                    width: 100%;
                    margin: 20px 0;
                    overflow: hidden;
                }

                .ProseMirror td,
                .ProseMirror th {
                    min-width: 1em;
                    border: 2px solid #cbd5e1;
                    padding: 8px 12px;
                    vertical-align: top;
                    box-sizing: border-box;
                    position: relative;
                }

                .ProseMirror th {
                    font-weight: bold;
                    text-align: left;
                    background-color: #1e293b;
                    color: white;
                }

                .ProseMirror .selectedCell:after {
                    z-index: 2;
                    position: absolute;
                    content: "";
                    left: 0; right: 0; top: 0; bottom: 0;
                    background: rgba(59, 130, 246, 0.3);
                    pointer-events: none;
                }

                .ProseMirror .column-resize-handle {
                    position: absolute;
                    right: -2px;
                    top: 0;
                    bottom: -2px;
                    width: 4px;
                    background-color: #f59e0b;
                    pointer-events: none;
                }

                .ProseMirror p {
                    margin: 0.5em 0;
                }

                .ProseMirror blockquote {
                    padding-left: 1rem;
                    border-left: 3px solid #f59e0b;
                    margin: 1rem 0;
                    font-style: italic;
                }

                .ProseMirror code {
                    background-color: #f1f5f9;
                    padding: 0.2em 0.4em;
                    border-radius: 3px;
                    font-size: 0.9em;
                }

                .ProseMirror pre {
                    background: #1e293b;
                    color: #f1f5f9;
                    font-family: 'JetBrainsMono', 'Courier New', monospace;
                    padding: 0.75rem 1rem;
                    border-radius: 0.5rem;
                    overflow-x: auto;
                }

                .ProseMirror pre code {
                    color: inherit;
                    padding: 0;
                    background: none;
                    font-size: 0.9rem;
                }

                .dark .ProseMirror code {
                    background-color: #334155;
                }

                .dark .ProseMirror td,
                .dark .ProseMirror th {
                    border-color: #475569;
                }
            `}</style>
        </div>
    );
}
