import { Client } from '@/components/features/clients/types';
import { Button } from '@/components/ui/button';
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, SharedData } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';

interface editProps extends SharedData {
    client: Client;
}

export default function ClientEdit() {
    const { client } = usePage<editProps>().props;
    const { data, setData, put, processing, errors } = useForm({
        name: client.name,
        logo: null as File | null,
        website: client.website ?? '',
        description: client.description ?? '',
    });

    const [logoPreview, setLogoPreview] = useState<string | null>(
        client.logo || null,
    );

    const breadcrumbs: BreadcrumbItem[] = [];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/clients/${client.id}`);
    };

    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        setData('logo', file);

        // Generate preview
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setLogoPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setLogoPreview(null);
        }
    };

    const removeLogo = () => {
        setData('logo', null);
        setLogoPreview(null);
        // Reset file input
        const fileInput = document.getElementById('logo') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="p-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="mb-2 text-3xl font-bold text-gray-900">
                        Edit Client
                    </h1>
                    <p className="text-gray-600">
                        Update the details below to modify the client
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    {/* Grid Layout */}
                    <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
                        {/* Left Column */}
                        <div className="space-y-6">
                            {/* Name Field */}
                            <Field>
                                <FieldLabel htmlFor="name">
                                    Client Name{' '}
                                    <span className="text-red-500">*</span>
                                </FieldLabel>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="Enter client name"
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
                                    Enter the official name of the client
                                </FieldDescription>
                            </Field>

                            {/* Website Field */}
                            <Field>
                                <FieldLabel htmlFor="website">
                                    Website
                                </FieldLabel>
                                <Input
                                    id="website"
                                    type="url"
                                    placeholder="https://example.com"
                                    value={data.website}
                                    onChange={(e) =>
                                        setData('website', e.target.value)
                                    }
                                    className={
                                        errors.website ? 'border-red-500' : ''
                                    }
                                    disabled={processing}
                                />
                                {errors.website && (
                                    <FieldDescription className="text-red-600">
                                        {errors.website}
                                    </FieldDescription>
                                )}
                                <FieldDescription>
                                    Client's website URL
                                </FieldDescription>
                            </Field>

                            {/* Description Field */}
                            <Field>
                                <FieldLabel htmlFor="description">
                                    Description
                                </FieldLabel>
                                <Textarea
                                    id="description"
                                    placeholder="Enter client description"
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
                                    rows={6}
                                />
                                {errors.description && (
                                    <FieldDescription className="text-red-600">
                                        {errors.description}
                                    </FieldDescription>
                                )}
                                <FieldDescription>
                                    Brief description about the client
                                </FieldDescription>
                            </Field>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-6">
                            {/* Logo Field */}
                            <Field>
                                <FieldLabel htmlFor="logo">
                                    Client Logo
                                </FieldLabel>

                                {!logoPreview ? (
                                    <Input
                                        id="logo"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleLogoChange}
                                        className={
                                            errors.logo ? 'border-red-500' : ''
                                        }
                                        disabled={processing}
                                    />
                                ) : (
                                    <div className="space-y-3">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={removeLogo}
                                            disabled={processing}
                                            className="w-full"
                                        >
                                            Change Logo
                                        </Button>
                                    </div>
                                )}

                                {errors.logo && (
                                    <FieldDescription className="text-red-600">
                                        {errors.logo}
                                    </FieldDescription>
                                )}

                                {/* Logo Preview - Contained */}
                                {logoPreview && (
                                    <div className="mt-4">
                                        <p className="mb-2 text-sm font-medium text-gray-700">
                                            Preview:
                                        </p>
                                        <div className="w-full overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
                                            <img
                                                src={logoPreview}
                                                alt="Logo preview"
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
                            {processing ? 'Updating...' : 'Update Client'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}