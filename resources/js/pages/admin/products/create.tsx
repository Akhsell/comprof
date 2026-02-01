import { Button } from '@/components/ui/button';
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { useForm } from '@inertiajs/react';

export default function ProductCreate() {
    const {data, setData, post, processing, errors} = useForm({
        name: '',
        description: '',
        content: '',
        price: '',
        image: null as File | null,
        order: '',
    });

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },

    ];

const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/admin/products');
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
                <FieldLabel htmlFor="input-demo-api-key">Price</FieldLabel>
                <Input
                    id="input-demo-api-key"
                    type="text"
                    placeholder=""
                    value={data.price}
                    onChange={(e) => setData('price', e.target.value)}
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
                <FieldLabel htmlFor="input-demo-api-key">Order</FieldLabel>
                <Input
                    id="input-demo-api-key"
                    type="text"
                    placeholder=""
                    value={data.order}
                    onChange={(e) => setData('order', e.target.value)}
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
