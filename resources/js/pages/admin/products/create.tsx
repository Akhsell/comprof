import { Button } from '@/components/ui/button';
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function ProductCreate() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        content: '',
        price: '',
        image: null as File | null,
        order: '',
    });

    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [formattedPrice, setFormattedPrice] = useState('');

    const breadcrumbs: BreadcrumbItem[] = [];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/products');
    };

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, '');
        setData('price', value);
        
        if (value) {
            const formatted = parseInt(value).toLocaleString('id-ID');
            setFormattedPrice(formatted);
        } else {
            setFormattedPrice('');
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        setData('image', file);

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
        const fileInput = document.getElementById('image') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="p-8">
                <div className="mb-8">
                    <h1 className="mb-2 text-3xl font-bold text-gray-900">
                        Create New Product
                    </h1>
                    <p className="text-gray-600">
                        Fill in the details below to add a new product
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
                        <div className="space-y-6">
                            <Field>
                                <FieldLabel htmlFor="name">
                                    Product Name{' '}
                                    <span className="text-red-500">*</span>
                                </FieldLabel>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="Enter product name"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData('name', e.target.value)
                                    }
                                    className={
                                        errors.name ? 'border-red-500' : ''
                                    }
                                    disabled={processing}
                                />
                                {errors.name && (
                                    <FieldDescription className="text-red-600">
                                        {errors.name}
                                    </FieldDescription>
                                )}
                                <FieldDescription>
                                    Choose a clear and descriptive product name
                                </FieldDescription>
                            </Field>

                            <Field>
                                <FieldLabel htmlFor="description">
                                    Description{' '}
                                    <span className="text-red-500">*</span>
                                </FieldLabel>
                                <Textarea
                                    id="description"
                                    placeholder="Enter product description"
                                    value={data.description}
                                    onChange={(e) =>
                                        setData('description', e.target.value)
                                    }
                                    className={
                                        errors.description
                                            ? 'border-red-500'
                                            : ''
                                    }
                                    disabled={processing}
                                    rows={4}
                                />
                                {errors.description && (
                                    <FieldDescription className="text-red-600">
                                        {errors.description}
                                    </FieldDescription>
                                )}
                                <FieldDescription>
                                    Brief description of the product
                                </FieldDescription>
                            </Field>

                            <Field>
                                <FieldLabel htmlFor="content">
                                    Content{' '}
                                    <span className="text-red-500">*</span>
                                </FieldLabel>
                                <Textarea
                                    id="content"
                                    placeholder="Write detailed product content here..."
                                    value={data.content}
                                    onChange={(e) =>
                                        setData('content', e.target.value)
                                    }
                                    className={
                                        errors.content ? 'border-red-500' : ''
                                    }
                                    disabled={processing}
                                    rows={8}
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

                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <Field>
                                    <FieldLabel htmlFor="price">
                                        Price{' '}
                                        <span className="text-red-500">*</span>
                                    </FieldLabel>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                                            Rp
                                        </span>
                                        <Input
                                            id="price"
                                            type="text"
                                            placeholder="0"
                                            value={formattedPrice}
                                            onChange={handlePriceChange}
                                            className={`pl-10 ${errors.price ? 'border-red-500' : ''}`}
                                            disabled={processing}
                                        />
                                    </div>
                                    {errors.price && (
                                        <FieldDescription className="text-red-600">
                                            {errors.price}
                                        </FieldDescription>
                                    )}
                                </Field>

                                <Field>
                                    <FieldLabel htmlFor="order">
                                        Display Order
                                    </FieldLabel>
                                    <Input
                                        id="order"
                                        type="number"
                                        placeholder="0"
                                        value={data.order}
                                        onChange={(e) =>
                                            setData('order', e.target.value)
                                        }
                                        className={
                                            errors.order ? 'border-red-500' : ''
                                        }
                                        disabled={processing}
                                    />
                                    {errors.order && (
                                        <FieldDescription className="text-red-600">
                                            {errors.order}
                                        </FieldDescription>
                                    )}
                                </Field>
                            </div>

                            <Field>
                                <FieldLabel htmlFor="image">
                                    Product Image
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

                                {imagePreview && (
                                    <div className="mt-4">
                                        <p className="mb-2 text-sm font-medium text-gray-700">
                                            Preview:
                                        </p>
                                        <div className="w-full overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
                                            <img
                                                src={imagePreview}
                                                alt="Product preview"
                                                className="h-auto max-h-68 w-full object-contain"
                                            />
                                        </div>
                                    </div>
                                )}
                            </Field>
                        </div>
                    </div>

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
                            {processing ? 'Creating...' : 'Create Product'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}