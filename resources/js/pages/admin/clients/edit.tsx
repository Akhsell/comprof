import { Client } from '@/components/features/clients/types';
import { Button } from '@/components/ui/button';
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, SharedData } from '@/types';
import { useForm, usePage } from '@inertiajs/react';

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
        put(`/admin/clients/${client.id}`);
    };

    console.log(usePage().props);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 p-10">
                    <Field className="max-w-sm">
                        <FieldLabel htmlFor="input-demo-api-key">
                            Name
                        </FieldLabel>
                        <Input
                            id="input-demo-api-key"
                            type="text"
                            placeholder=""
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                        />

                        <FieldDescription>...</FieldDescription>
                    </Field>
                    <Field className="max-w-sm">
                        <FieldLabel htmlFor="input-demo-api-key">
                            Logo
                        </FieldLabel>
                        <Input
                            id="input-demo-api-key"
                            type="file"
                            placeholder=""
                            onChange={(e) =>
                                setData(
                                    'logo',
                                    e.target.files?.[0] ?? null,
                                )
                            }
                        />
                        <FieldDescription>...</FieldDescription>
                    </Field>
                    <Field className="max-w-sm">
                        <FieldLabel htmlFor="input-demo-api-key">
                            Website
                        </FieldLabel>
                        <Input
                            id="input-demo-api-key"
                            type="text"
                            placeholder=""
                            value={data.website}
                            onChange={(e) => setData('website', e.target.value)}
                        />

                        <FieldDescription>...</FieldDescription>
                    </Field>
                    <Field className="max-w-sm">
                        <FieldLabel htmlFor="input-demo-api-key">
                            Description
                        </FieldLabel>
                        <Input
                            id="input-demo-api-key"
                            type="text"
                            placeholder=""
                            value={data.description}
                            onChange={(e) =>
                                setData('description', e.target.value)
                            }
                        />

                        <FieldDescription>...</FieldDescription>
                    </Field>

                    {/* <Field className="max-w-sm">
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
                    </Field> */}
                    <Button type="submit">Submit</Button>
                </div>
            </form>
        </AppLayout>
    );
}
