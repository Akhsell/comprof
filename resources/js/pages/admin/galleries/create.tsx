import { Button } from '@/components/ui/button';
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function GalleryCreate() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        image: null as File | null,
    });

    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const breadcrumbs: BreadcrumbItem[] = [];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/galleries');
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        setData('image', file);

        // Generate preview
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    };

    const removeImage = () => {
        setData('image', null);
        setImagePreview(null);
        // Reset file input
        const fileInput = document.getElementById('image') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="p-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="mb-2 text-3xl font-bold text-gray-900">
                        Add New Gallery Image
                    </h1>
                    <p className="text-gray-600">
                        Upload a new image to the gallery
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
                                    Image Title{' '}
                                    <span className="text-red-500">*</span>
                                </FieldLabel>
                                <Input
                                    id="title"
                                    type="text"
                                    placeholder="Enter image title"
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
                                    Provide a descriptive title for the image
                                </FieldDescription>
                            </Field>
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
                                    {processing
                                        ? 'Uploading...'
                                        : 'Upload Image'}
                                </Button>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-6">
                            {/* Image Field */}
                            <Field>
                                <FieldLabel htmlFor="image">
                                    Gallery Image{' '}
                                    <span className="text-red-500">*</span>
                                </FieldLabel>

                                {!imagePreview ? (
                                    <Input
                                        id="image"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className={
                                            errors.image ? 'border-red-500' : ''
                                        }
                                        disabled={processing}
                                    />
                                ) : (
                                    <div className="space-y-3">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={removeImage}
                                            disabled={processing}
                                            className="w-full"
                                        >
                                            Change Image
                                        </Button>
                                    </div>
                                )}

                                {errors.image && (
                                    <FieldDescription className="text-red-600">
                                        {errors.image}
                                    </FieldDescription>
                                )}

                                {/* Image Preview - Contained */}
                                {imagePreview && (
                                    <div className="mt-4">
                                        <p className="mb-2 text-sm font-medium text-gray-700">
                                            Preview:
                                        </p>
                                        <div className="w-full overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
                                            <img
                                                src={imagePreview}
                                                alt="Gallery preview"
                                                className="h-auto max-h-68 w-full object-contain"
                                            />
                                        </div>
                                    </div>
                                )}
                            </Field>
                        </div>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
