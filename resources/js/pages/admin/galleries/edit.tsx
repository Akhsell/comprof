import { Gallery } from '@/components/features/galleries/types';
import { Button } from '@/components/ui/button';
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, SharedData } from '@/types';
import { useForm, usePage } from '@inertiajs/react';

interface editProps extends SharedData {
    gallery: Gallery;
}
export default function GalleryEdit() {
    const { gallery } = usePage<editProps>().props;
    const { data, setData, put, processing, errors } = useForm({
        title: gallery.title,
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
        put(`/admin/galleries/${gallery.id}`);
    };

    console.log(usePage().props);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 p-10">
                    <Field className="max-w-sm">
                        <FieldLabel htmlFor="input-demo-api-key">
                            Title
                        </FieldLabel>
                        <Input
                            id="input-demo-api-key"
                            type="text"
                            placeholder=""
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                        />
                        
                        <FieldDescription>...</FieldDescription>
                    </Field>

                    <Field className="max-w-sm">
                        <FieldLabel htmlFor="input-demo-api-key">
                            Image
                        </FieldLabel>
                        <Input
                            id="input-demo-api-key"
                            type="file"
                            placeholder=""
                            onChange={(e) =>
                                setData(
                                    'image',
                                    e.target.files?.[0] ?? null,
                                )
                            }
                        />
                        <FieldDescription>...</FieldDescription>
                    </Field>
                    <Button type="submit">Submit</Button>
                </div>
            </form>
        </AppLayout>
    );
}
