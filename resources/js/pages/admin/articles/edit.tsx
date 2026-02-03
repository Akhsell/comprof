import { Article } from '@/components/features/articles/types';
import { Button } from '@/components/ui/button';
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, SharedData } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';

interface editProps extends SharedData {
    article: Article;
}

export default function ArticleEdit() {
    const { article } = usePage<editProps>().props;
    const { data, setData, put, processing, errors } = useForm({
        title: article.title,
        author: article.author,
        content: article.content,
        thumbnail: null as File | null,
    });

    const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(
        article.thumbnail || null,
    );

    const breadcrumbs: BreadcrumbItem[] = [];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/articles/${article.id}`);
    };

    const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        setData('thumbnail', file);

        // Generate preview
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setThumbnailPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setThumbnailPreview(null);
        }
    };

    const removeThumbnail = () => {
        setData('thumbnail', null);
        setThumbnailPreview(null);
        // Reset file input
        const fileInput = document.getElementById(
            'thumbnail',
        ) as HTMLInputElement;
        if (fileInput) fileInput.value = '';
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="p-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="mb-2 text-3xl font-bold text-gray-900">
                        Edit Article
                    </h1>
                    <p className="text-gray-600">
                        Update the details below to modify the article
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    {/* Grid Layout */}
                    <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
                        {/* Left Column */}
                        <div className="space-y-6">
                            {/* Title Field */}
                            <Field>
                                <FieldLabel htmlFor="title">
                                    Title{' '}
                                    <span className="text-red-500">*</span>
                                </FieldLabel>
                                <Input
                                    id="title"
                                    type="text"
                                    placeholder="Enter article title"
                                    value={data.title}
                                    onChange={(e) =>
                                        setData('title', e.target.value)
                                    }
                                    className={
                                        errors.title ? 'border-red-500' : ''
                                    }
                                    disabled={processing}
                                />
                                {errors.title && (
                                    <FieldDescription className="text-red-600">
                                        {errors.title}
                                    </FieldDescription>
                                )}
                                <FieldDescription>
                                    Choose a clear and descriptive title
                                </FieldDescription>
                            </Field>

                            {/* Author Field */}
                            <Field>
                                <FieldLabel htmlFor="author">
                                    Author{' '}
                                    <span className="text-red-500">*</span>
                                </FieldLabel>
                                <Input
                                    id="author"
                                    type="text"
                                    placeholder="Enter author name"
                                    value={data.author}
                                    onChange={(e) =>
                                        setData('author', e.target.value)
                                    }
                                    className={
                                        errors.author ? 'border-red-500' : ''
                                    }
                                    disabled={processing}
                                />
                                {errors.author && (
                                    <FieldDescription className="text-red-600">
                                        {errors.author}
                                    </FieldDescription>
                                )}
                            </Field>

                            {/* Content Field */}
                            <Field>
                                <FieldLabel htmlFor="content">
                                    Content{' '}
                                    <span className="text-red-500">*</span>
                                </FieldLabel>
                                <Textarea
                                    id="content"
                                    placeholder="Write your article content here..."
                                    value={data.content}
                                    onChange={(e) =>
                                        setData('content', e.target.value)
                                    }
                                    className={
                                        errors.content ? 'border-red-500' : ''
                                    }
                                    disabled={processing}
                                    rows={12}
                                />
                                {errors.content && (
                                    <FieldDescription className="text-red-600">
                                        {errors.content}
                                    </FieldDescription>
                                )}
                                <FieldDescription>
                                    {data.content.length} characters
                                </FieldDescription>
                            </Field>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-6">
                            {/* Thumbnail Field */}
                            <Field>
                                <FieldLabel htmlFor="thumbnail">
                                    Thumbnail Image
                                </FieldLabel>

                                {!thumbnailPreview ? (
                                    <Input
                                        id="thumbnail"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleThumbnailChange}
                                        className={
                                            errors.thumbnail
                                                ? 'border-red-500'
                                                : ''
                                        }
                                        disabled={processing}
                                    />
                                ) : (
                                    <div className="space-y-3">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={removeThumbnail}
                                            disabled={processing}
                                            className="w-full"
                                        >
                                            Change Image
                                        </Button>
                                    </div>
                                )}

                                {errors.thumbnail && (
                                    <FieldDescription className="text-red-600">
                                        {errors.thumbnail}
                                    </FieldDescription>
                                )}

                                {/* Image Preview - Contained */}
                                {thumbnailPreview && (
                                    <div className="mt-4">
                                        <p className="mb-2 text-sm font-medium text-gray-700">
                                            Preview:
                                        </p>
                                        <div className="w-full overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
                                            <img
                                                src={thumbnailPreview}
                                                alt="Thumbnail preview"
                                                className="h-auto max-h-68 w-full object-contain"
                                            />
                                        </div>
                                    </div>
                                )}
                            </Field>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid max-w-md grid-cols-2 gap-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => window.history.back()}
                            disabled={processing}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Updating...' : 'Update Article'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}