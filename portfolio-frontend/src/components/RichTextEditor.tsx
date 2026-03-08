import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Placeholder from '@tiptap/extension-placeholder';
import Link from '@tiptap/extension-link';
import { common, createLowlight } from 'lowlight';
import {
    FaBold, FaItalic, FaStrikethrough, FaCode,
    FaListUl, FaListOl, FaQuoteLeft, FaImage,
    FaLink, FaMinus
} from 'react-icons/fa6';
import '../styles/editor.css';

const lowlight = createLowlight(common);

interface RichTextEditorProps {
    content: string;
    onChange: (html: string) => void;
}

const MenuBar = ({ editor }: { editor: any }) => {
    if (!editor) return null;

    const addImage = () => {
        const url = window.prompt('Enter image URL:');
        if (url) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    };

    const addLink = () => {
        const url = window.prompt('Enter URL:');
        if (url) {
            editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
        }
    };

    const buttons = [
        {
            icon: <FaBold />,
            action: () => editor.chain().focus().toggleBold().run(),
            active: editor.isActive('bold'),
            title: 'Bold',
        },
        {
            icon: <FaItalic />,
            action: () => editor.chain().focus().toggleItalic().run(),
            active: editor.isActive('italic'),
            title: 'Italic',
        },
        {
            icon: <FaStrikethrough />,
            action: () => editor.chain().focus().toggleStrike().run(),
            active: editor.isActive('strike'),
            title: 'Strikethrough',
        },
        {
            icon: <FaCode />,
            action: () => editor.chain().focus().toggleCode().run(),
            active: editor.isActive('code'),
            title: 'Inline Code',
        },
        { divider: true },
        {
            icon: <span className="text-xs font-bold">H1</span>,
            action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
            active: editor.isActive('heading', { level: 1 }),
            title: 'Heading 1',
        },
        {
            icon: <span className="text-xs font-bold">H2</span>,
            action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
            active: editor.isActive('heading', { level: 2 }),
            title: 'Heading 2',
        },
        {
            icon: <span className="text-xs font-bold">H3</span>,
            action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
            active: editor.isActive('heading', { level: 3 }),
            title: 'Heading 3',
        },
        { divider: true },
        {
            icon: <FaListUl />,
            action: () => editor.chain().focus().toggleBulletList().run(),
            active: editor.isActive('bulletList'),
            title: 'Bullet List',
        },
        {
            icon: <FaListOl />,
            action: () => editor.chain().focus().toggleOrderedList().run(),
            active: editor.isActive('orderedList'),
            title: 'Ordered List',
        },
        {
            icon: <FaQuoteLeft />,
            action: () => editor.chain().focus().toggleBlockquote().run(),
            active: editor.isActive('blockquote'),
            title: 'Blockquote',
        },
        { divider: true },
        {
            icon: <span className="text-[10px] font-mono">{'{}'}</span>,
            action: () => editor.chain().focus().toggleCodeBlock().run(),
            active: editor.isActive('codeBlock'),
            title: 'Code Block',
        },
        {
            icon: <FaImage />,
            action: addImage,
            active: false,
            title: 'Insert Image',
        },
        {
            icon: <FaLink />,
            action: addLink,
            active: editor.isActive('link'),
            title: 'Add Link',
        },
        {
            icon: <FaMinus />,
            action: () => editor.chain().focus().setHorizontalRule().run(),
            active: false,
            title: 'Horizontal Rule',
        },
    ];

    return (
        <div className="editor-toolbar">
            {buttons.map((btn, i) => {
                if ('divider' in btn) {
                    return <div key={`div-${i}`} className="divider" />;
                }
                return (
                    <button
                        key={i}
                        type="button"
                        onClick={btn.action}
                        className={btn.active ? 'is-active' : ''}
                        title={btn.title}
                    >
                        {btn.icon}
                    </button>
                );
            })}
        </div>
    );
};

const RichTextEditor = ({ content, onChange }: RichTextEditorProps) => {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                codeBlock: false, // We use CodeBlockLowlight instead
            }),
            Image.configure({
                HTMLAttributes: {
                    class: 'rounded-xl',
                },
            }),
            CodeBlockLowlight.configure({
                lowlight,
                HTMLAttributes: {
                    class: 'not-prose',
                },
            }),
            Placeholder.configure({
                placeholder: 'Tell your story...',
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    rel: 'noopener noreferrer',
                    target: '_blank',
                },
            }),
        ],
        content,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: 'tiptap-editor focus:outline-none',
            },
        },
    });

    return (
        <div className="border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden bg-white dark:bg-black/50">
            <MenuBar editor={editor} />
            <EditorContent editor={editor} />
        </div>
    );
};

export default RichTextEditor;
