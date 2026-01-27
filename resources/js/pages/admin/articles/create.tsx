import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';

export default function ArticleCreate() {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className='p-10'>
                <Field className='max-w-sm'>
                <FieldLabel htmlFor="input-demo-api-key">Title</FieldLabel>
                <Input
                    id="input-demo-api-key"
                    type="text"
                    placeholder=""
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
                />
                <FieldDescription>
                    ...
                </FieldDescription>
            </Field>
            </div>
        </AppLayout>
    );
}
