import React, { useState } from 'react';
import { motion } from 'framer-motion';
import RichTextEditor from './RichTextEditor';

interface BlogFormProps {
    initialData?: {
        title: string;
        content: string;
        summary: string;
        tags: string;
        coverImageUrl: string;
        published: boolean;
    };
    onSubmit: (data: any) => Promise<void>;
    onCancel: () => void;
}

const BlogForm: React.FC<BlogFormProps> = ({ initialData, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        summary: '',
        tags: '',
        coverImageUrl: '',
        published: true,
        publishedAt: new Date().toISOString(),
        ...initialData
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await onSubmit(formData);
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-2xl border border-gray-200 dark:border-gray-800"
        >
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold mono-heading text-black dark:text-white">
                    {initialData ? 'Edit Entry' : 'New Journal Entry'}
                </h2>
                <button
                    onClick={onCancel}
                    className="text-gray-500 hover:text-black dark:hover:text-white transition-colors"
                >
                    Cancel
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title — Medium-style large input */}
                <div>
                    <input
                        type="text"
                        className="w-full bg-transparent border-none text-3xl font-bold text-black dark:text-white placeholder-gray-400 focus:outline-none focus:ring-0 py-2"
                        placeholder="Title"
                        value={formData.title}
                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                        required
                    />
                </div>

                {/* Summary */}
                <div>
                    <input
                        type="text"
                        className="w-full bg-transparent border-none text-lg text-gray-600 dark:text-gray-400 placeholder-gray-400 focus:outline-none focus:ring-0 py-1"
                        placeholder="Write a brief summary..."
                        value={formData.summary}
                        onChange={e => setFormData({ ...formData, summary: e.target.value })}
                    />
                </div>

                <hr className="border-gray-200 dark:border-gray-800" />

                {/* Rich Text Editor */}
                <div>
                    <RichTextEditor
                        content={formData.content}
                        onChange={(html) => setFormData({ ...formData, content: html })}
                    />
                </div>

                <hr className="border-gray-200 dark:border-gray-800" />

                {/* Metadata Row */}
                <div className="grid md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">Cover Image URL</label>
                        <input
                            type="text"
                            className="w-full bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 focus:border-teal-500 focus:outline-none transition-colors text-black dark:text-white text-sm"
                            value={formData.coverImageUrl}
                            onChange={e => setFormData({ ...formData, coverImageUrl: e.target.value })}
                            placeholder="https://..."
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider">Tags</label>
                        <input
                            type="text"
                            className="w-full bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 focus:border-teal-500 focus:outline-none transition-colors text-black dark:text-white text-sm"
                            value={formData.tags}
                            onChange={e => setFormData({ ...formData, tags: e.target.value })}
                            placeholder="Spring Boot, JWT, Security"
                        />
                    </div>
                    <div className="flex items-end">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={formData.published}
                                onChange={e => setFormData({ ...formData, published: e.target.checked })}
                                className="w-5 h-5 rounded border-gray-300 text-teal-500 focus:ring-teal-500"
                            />
                            <span className="text-sm text-gray-400 uppercase tracking-wider font-medium">Published</span>
                        </label>
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-black dark:bg-white text-white dark:text-black font-bold py-3 px-8 rounded-full hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100"
                    >
                        {isSubmitting ? 'Publishing...' : 'Publish Entry'}
                    </button>
                </div>
            </form>
        </motion.div>
    );
};

export default BlogForm;
