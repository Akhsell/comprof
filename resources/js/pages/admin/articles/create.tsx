import { Button } from '@/components/ui/button';
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { useForm } from '@inertiajs/react';

export default function ArticleCreate() {
    const {data, setData, post, processing, errors} = useForm({
        title: '',
        author: '',
        content: '',
        thumbnail: null as File | null,
    });

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },

    ];

const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/admin/articles');
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
                <FieldLabel htmlFor="input-demo-api-key">Thumbnail</FieldLabel>
                <Input
                    id="input-demo-api-key"
                    type="file"
                    placeholder=""
                    onChange={(e) => setData('thumbnail', e.target.files?.[0] ?? null)}
                />
                <FieldDescription>
                    ...
                </FieldDescription>
            </Field>

            <Field className='max-w-sm'>
                <FieldLabel htmlFor="input-demo-api-key">Author</FieldLabel>
                <Input
                    id="input-demo-api-key"
                    type="text"
                    placeholder=""
                    value={data.author}
                    onChange={(e) => setData('author', e.target.value)}
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
