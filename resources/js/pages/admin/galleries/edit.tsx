import { Event } from '@/components/features/events/types';
import { Button } from '@/components/ui/button';
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, SharedData } from '@/types';
import { useForm, usePage } from '@inertiajs/react';

interface editProps extends SharedData {
    event: Event;
}
export default function EventEdit() {
    const { event } = usePage<editProps>().props;
    const { data, setData, put, processing, errors } = useForm({
        title: event.title,
        description: event.description,
        content: event.content,
        image: null as File | null,
        location: event.location,
        start_date: event.start_date,
        end_date: event.end_date,
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
        put(`/admin/events/${event.id}`);
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
                            Description
                        </FieldLabel>
                        <Input
                            id="input-demo-api-key"
                            type="text"
                            placeholder=""
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                        />
                        <FieldDescription>...</FieldDescription>
                    </Field>

                    <Field className="max-w-sm">
                        <FieldLabel htmlFor="input-demo-api-key">
                            Content
                        </FieldLabel>
                        <Input
                            id="input-demo-api-key"
                            type="text"
                            placeholder=""
                            value={data.content}
                            onChange={(e) => setData('content', e.target.value)}
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

                    <Field className="max-w-sm">
                        <FieldLabel htmlFor="input-demo-api-key">
                            Location
                        </FieldLabel>
                        <Input
                            id="input-demo-api-key"
                            type="text"
                            placeholder=""
                            value={data.location}
                            onChange={(e) => setData('location', e.target.value)}
                        />
                        <FieldDescription>...</FieldDescription>
                    </Field>
                    <Field className="max-w-sm">
                        <FieldLabel htmlFor="input-demo-api-key">
                            Start_date
                        </FieldLabel>
                        <Input
                            id="input-demo-api-key"
                            type="date"
                            placeholder=""
                            value={data.start_date ?? ''}
                            onChange={(e) => setData('start_date', e.target.value)}
                        />
                        <FieldDescription>...</FieldDescription>
                    </Field>
                    <Field className="max-w-sm">
                        <FieldLabel htmlFor="input-demo-api-key">
                            End_date
                        </FieldLabel>
                        <Input
                            id="input-demo-api-key"
                            type="date"
                            placeholder=""
                            value={data.end_date ?? ''}
                            onChange={(e) => setData('end_date', e.target.value)}
                        />
                        <FieldDescription>...</FieldDescription>
                    </Field>
                    <Field className="max-w-sm">
                        <FieldLabel htmlFor="input-demo-api-key">
                            Is Active
                        </FieldLabel>
                        <Input
                            id="input-demo-api-key"
                            type="checkbox"
                            checked={data.is_active}
                            onChange={(e) => setData('is_active', e.target.checked)}
                        />
                        <FieldDescription>...</FieldDescription>
                    </Field>
                    <Button type="submit">Submit</Button>
                </div>
            </form>
        </AppLayout>
    );
}
