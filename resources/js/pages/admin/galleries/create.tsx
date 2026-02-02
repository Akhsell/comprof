import { Button } from '@/components/ui/button';
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { useForm } from '@inertiajs/react';

export default function GalleryCreate() {
    const {data, setData, post, processing, errors} = useForm({
        title: '',
        image: null as File | null,
    });

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },

    ];

const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/admin/galleries');
}

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
        <form onSubmit={handleSubmit}>
            <div className='p-10 grid grid-cols-2'>
                <Field className='max-w-sm'>
                <FieldLabel htmlFor="input-demo-api-key">Title</FieldLabel>
                <Input
                    id="input-demo-api-key"
                    type="text"
                    placeholder=""
                    value={data.title}
                    onChange={(e) => setData('title', e.target.value)}
                />
                {errors.title && (<p className="text-red-600">{errors.title}</p>)}
                <FieldDescription>
                    ...
                </FieldDescription>
            </Field>

            <Field className='max-w-sm'>
                <FieldLabel htmlFor="input-demo-api-key">Image</FieldLabel>
                <Input
                    id="input-demo-api-key"
                    type="file"
                    placeholder=""
                    onChange={(e) => setData('image', e.target.files?.[0] ?? null)}
                />
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
