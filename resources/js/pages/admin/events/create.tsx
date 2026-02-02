import { Button } from '@/components/ui/button';
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { useForm } from '@inertiajs/react';
import { router } from '@inertiajs/react';

export default function EventCreate() {
    const {data, setData, post, processing, errors} = useForm({
        title: '',
        description: '',
        content: '',
        image: null as File | null,
        location: '',
        start_date: '',
        end_date: '',
        is_active: true,
    });

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },

    ];

const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/admin/events');
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
                <FieldLabel htmlFor="input-demo-api-key">Description</FieldLabel>
                <Input
                    id="input-demo-api-key"
                    type="text"
                    placeholder=""
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                />
                <FieldDescription>
                    ...
                </FieldDescription>
            </Field>

            <Field className='max-w-sm'>
                <FieldLabel htmlFor="input-demo-api-key">Content</FieldLabel>
                <Input
                    id="input-demo-api-key"
                    type="text"
                    placeholder=""
                    value={data.content}
                    onChange={(e) => setData('content', e.target.value)}
                />
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

            <Field className='max-w-sm'>
                <FieldLabel htmlFor="input-demo-api-key">Location</FieldLabel>
                <Input
                    id="input-demo-api-key"
                    type="text"
                    placeholder=""
                    value={data.location}
                    onChange={(e) => setData('location', e.target.value)}
                />
                <FieldDescription>
                    ...
                </FieldDescription>
            </Field>
            <Field className='max-w-sm'>
                <FieldLabel htmlFor="input-demo-api-key">Start Date</FieldLabel>
                <Input
                    id="input-demo-api-key"
                    type="date"
                    placeholder=""
                    value={data.start_date}
                    onChange={(e) => setData('start_date', e.target.value)}
                />
            </Field>
            <Field className='max-w-sm'>
                <FieldLabel htmlFor="input-demo-api-key">End Date</FieldLabel>
                <Input
                    id="input-demo-api-key"
                    type="date"
                    placeholder=""
                    value={data.end_date}
                    onChange={(e) => setData('end_date', e.target.value)}
                />
                <FieldDescription>
                    ...
                </FieldDescription>
            </Field>
            <Field className='max-w-sm'>
                <FieldLabel htmlFor="input-demo-api-key">Is Active</FieldLabel>
                <Input
                    id="input-demo-api-key"
                    type="checkbox"
                    checked={data.is_active}
                    onChange={(e) => setData('is_active', e.target.checked)}
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
