import React, { useState } from 'react';
import { motion } from 'framer-motion';

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
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2 uppercase tracking-wider">Title</label>
                        <input
                            type="text"
                            className="w-full bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 focus:border-teal-500 focus:outline-none transition-colors text-black dark:text-white"
                            value={formData.title}
                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2 uppercase tracking-wider">Cover Image URL</label>
                        <input
                            type="text"
                            className="w-full bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 focus:border-teal-500 focus:outline-none transition-colors text-black dark:text-white"
                            value={formData.coverImageUrl}
                            onChange={e => setFormData({ ...formData, coverImageUrl: e.target.value })}
                            placeholder="https://..."
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2 uppercase tracking-wider">Summary</label>
                    <textarea
                        className="w-full bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 focus:border-teal-500 focus:outline-none transition-colors text-black dark:text-white"
                        rows={2}
                        value={formData.summary}
                        onChange={e => setFormData({ ...formData, summary: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2 uppercase tracking-wider">Content (Markdown)</label>
                    <textarea
                        className="w-full bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 focus:border-teal-500 focus:outline-none transition-colors font-mono text-sm text-black dark:text-white"
                        rows={12}
                        value={formData.content}
                        onChange={e => setFormData({ ...formData, content: e.target.value })}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2 uppercase tracking-wider">Tags</label>
                    <input
                        type="text"
                        className="w-full bg-gray-50 dark:bg-black border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-3 focus:border-teal-500 focus:outline-none transition-colors text-black dark:text-white"
                        value={formData.tags}
                        onChange={e => setFormData({ ...formData, tags: e.target.value })}
                        placeholder="Tech, Life, Design"
                    />
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
