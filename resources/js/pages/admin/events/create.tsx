import { Button } from '@/components/ui/button';
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function EventCreate() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        content: '',
        image: null as File | null,
        location: '',
        start_date: '',
        end_date: '',
        is_active: true,
    });

    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const breadcrumbs: BreadcrumbItem[] = [];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/events');
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
                        Create New Event
                    </h1>
                    <p className="text-gray-600">
                        Fill in the details below to create a new event
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
                                    Event Title{' '}
                                    <span className="text-red-500">*</span>
                                </FieldLabel>
                                <Input
                                    id="title"
                                    type="text"
                                    placeholder="Enter event title"
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
                                    Choose a clear and attractive event title
                                </FieldDescription>
                            </Field>

                            {/* Description Field */}
                            <Field>
                                <FieldLabel htmlFor="description">
                                    Description{' '}
                                    <span className="text-red-500">*</span>
                                </FieldLabel>
                                <Textarea
                                    id="description"
                                    placeholder="Enter event description"
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
                                    Brief description of the event
                                </FieldDescription>
                            </Field>

                            {/* Content Field */}
                            <Field>
                                <FieldLabel htmlFor="content">
                                    Content{' '}
                                    <span className="text-red-500">*</span>
                                </FieldLabel>
                                <Textarea
                                    id="content"
                                    placeholder="Write detailed event content here..."
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
                            {/* Location Field */}
                            <Field>
                                <FieldLabel htmlFor="location">
                                    Location{' '}
                                    <span className="text-red-500">*</span>
                                </FieldLabel>
                                <Input
                                    id="location"
                                    type="text"
                                    placeholder="Enter event location"
                                    value={data.location}
                                    onChange={(e) =>
                                        setData('location', e.target.value)
                                    }
                                    className={
                                        errors.location ? 'border-red-500' : ''
                                    }
                                    disabled={processing}
                                />
                                {errors.location && (
                                    <FieldDescription className="text-red-600">
                                        {errors.location}
                                    </FieldDescription>
                                )}
                                <FieldDescription>
                                    Venue or address of the event
                                </FieldDescription>
                            </Field>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-6">
                            {/* Date Fields in Grid */}
                            <div className="grid grid-cols-2 gap-4">
                                {/* Start Date Field */}
                                <Field>
                                    <FieldLabel htmlFor="start_date">
                                        Start Date{' '}
                                        <span className="text-red-500">*</span>
                                    </FieldLabel>
                                    <Input
                                        id="start_date"
                                        type="date"
                                        value={data.start_date}
                                        onChange={(e) =>
                                            setData(
                                                'start_date',
                                                e.target.value,
                                            )
                                        }
                                        className={
                                            errors.start_date
                                                ? 'border-red-500'
                                                : ''
                                        }
                                        disabled={processing}
                                    />
                                    {errors.start_date && (
                                        <FieldDescription className="text-red-600">
                                            {errors.start_date}
                                        </FieldDescription>
                                    )}
                                </Field>

                                {/* End Date Field */}
                                <Field>
                                    <FieldLabel htmlFor="end_date">
                                        End Date{' '}
                                        <span className="text-red-500">*</span>
                                    </FieldLabel>
                                    <Input
                                        id="end_date"
                                        type="date"
                                        value={data.end_date}
                                        onChange={(e) =>
                                            setData('end_date', e.target.value)
                                        }
                                        className={
                                            errors.end_date
                                                ? 'border-red-500'
                                                : ''
                                        }
                                        disabled={processing}
                                    />
                                    {errors.end_date && (
                                        <FieldDescription className="text-red-600">
                                            {errors.end_date}
                                        </FieldDescription>
                                    )}
                                </Field>
                            </div>

                            {/* Is Active Field */}
                            <Field>
                                <div className="flex items-center gap-2">
                                    <input
                                        id="is_active"
                                        type="checkbox"
                                        checked={data.is_active}
                                        onChange={(e) =>
                                            setData(
                                                'is_active',
                                                e.target.checked,
                                            )
                                        }
                                        disabled={processing}
                                        className="h-4 w-4"
                                    />
                                    <FieldLabel
                                        htmlFor="is_active"
                                        className="mb-0 cursor-pointer"
                                    >
                                        Activate Event Immediately
                                    </FieldLabel>
                                </div>
                                {errors.is_active && (
                                    <FieldDescription className="text-red-600">
                                        {errors.is_active}
                                    </FieldDescription>
                                )}
                                <FieldDescription>
                                    Event will be visible to users if checked
                                </FieldDescription>
                            </Field>

                            {/* Event Image Field */}
                            <Field>
                                <FieldLabel htmlFor="image">
                                    Event Image
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
                                                alt="Event preview"
                                                className="h-auto max-h-52 w-full object-contain"
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
                            {processing ? 'Creating...' : 'Create Event'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
