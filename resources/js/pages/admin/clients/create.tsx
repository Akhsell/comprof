import { Button } from '@/components/ui/button';
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { useForm } from '@inertiajs/react';

export default function ClientCreate() {
    const {data, setData, post, processing, errors} = useForm({
        name: '',
        logo: null as File | null,
        website: '',
        description: '',
    });

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },

    ];

const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/admin/clients');
}

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
        <form onSubmit={handleSubmit}>
            <div className='p-10 grid grid-cols-2'>
                <Field className='max-w-sm'>
                <FieldLabel htmlFor="input-demo-api-key">Name</FieldLabel>
                <Input
                    id="input-demo-api-key"
                    type="text"
                    placeholder=""
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                />
                {errors.name && (<p className="text-red-600">{errors.name}</p>)}
                <FieldDescription>
                    ...
                </FieldDescription>
            </Field>
            <Field className='max-w-sm'>
                <FieldLabel htmlFor="input-demo-api-key">Logo</FieldLabel>
                <Input
                    id="input-demo-api-key"
                    type="file"
                    placeholder=""
                    onChange={(e) => setData('logo', e.target.files?.[0] ?? null)}
                />
                {errors.logo && (<p className="text-red-600">{errors.logo}</p>)}
                <FieldDescription>
                    ...
                </FieldDescription>
            </Field>
            <Field className='max-w-sm'>
                <FieldLabel htmlFor="input-demo-api-key">Website</FieldLabel>
                <Input
                    id="input-demo-api-key"
                    type="text"
                    placeholder=""
                    value={data.website}
                    onChange={(e) => setData('website', e.target.value)}
                />
                {errors.website && (<p className="text-red-600">{errors.website}</p>)}
                <FieldDescription>
                    ...
                </FieldDescription>
            </Field>
            <Field className='max-w-sm'>
                <FieldLabel htmlFor="input-demo-api-key">Description</FieldLabel>
                <Input
                    id="input-demo-api-key"
                    type="text"
                    placeholder=""
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                />
                {errors.description && (<p className="text-red-600">{errors.description}</p>)}
                <FieldDescription>
                    ...
                </FieldDescription>
            </Field>
            <Button type="submit">Submit</Button>
            </div>
        </form>
        </AppLayout>
    );
}
