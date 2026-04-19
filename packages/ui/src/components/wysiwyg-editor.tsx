"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading1,
  Heading2,
} from "lucide-react";
import { useEffect } from "react";
import { Button } from "./ui/button";

interface WysiwygEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export function WysiwygEditor({ value, onChange }: WysiwygEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Descreva seu produto...",
      }),
    ],
    content: value || "",
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (!editor) return;

    if (value !== editor.getHTML()) {
      editor.commands.setContent(value || "");
    }
  }, [value, editor]);

  if (!editor) return null;

  const btn = (active: boolean) => (active ? "default" : "outline");

  return (
    <div className="border rounded-md bg-background p-3">
      <div className="flex flex-wrap gap-1 border-b pb-2 mb-2">
        <Button
          type="button"
          size="sm"
          variant={editor.isActive("bold") ? "default" : "outline"}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold className="w-4 h-4" />
        </Button>

        <Button
          type="button"
          size="sm"
          variant={editor.isActive("italic") ? "default" : "outline"}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic className="w-4 h-4" />
        </Button>

        <Button
          type="button"
          size="sm"
          variant={
            editor.isActive("heading", { level: 1 }) ? "default" : "outline"
          }
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
        >
          <Heading1 className="w-4 h-4" />
        </Button>

        <Button
          type="button"
          size="sm"
          variant={
            editor.isActive("heading", { level: 2 }) ? "default" : "outline"
          }
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          <Heading2 className="w-4 h-4" />
        </Button>

        <Button
          type="button"
          size="sm"
          variant={editor.isActive("bulletList") ? "default" : "outline"}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <List className="w-4 h-4" />
        </Button>

        <Button
          type="button"
          size="sm"
          variant={editor.isActive("orderedList") ? "default" : "outline"}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered className="w-4 h-4" />
        </Button>
      </div>

      <EditorContent
        editor={editor}
        className="prose max-w-none min-h-[200px] focus:outline-none
             [&_.ProseMirror]:min-h-[200px]
             [&_.ProseMirror]:outline-none"
      />
    </div>
  );
}
