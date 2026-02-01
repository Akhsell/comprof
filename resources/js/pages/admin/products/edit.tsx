import { Product } from '@/components/features/products/types';
import { Button } from '@/components/ui/button';
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, SharedData } from '@/types';
import { useForm, usePage } from '@inertiajs/react';

interface editProps extends SharedData {
    product: Product;
}
export default function ProductEdit() {
    const { product } = usePage<editProps>().props;
    const { data, setData, put, processing, errors } = useForm({
        name: product.name,
        description: product.description,
        content: product.content,
        price: product.price,
        image: null as File | null,
        order: product.order,
    });

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/admin/products/${product.id}`);
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
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                        />
                        <FieldDescription>...</FieldDescription>
                    </Field>

                    <Field className="max-w-sm">
                        <FieldLabel htmlFor="input-demo-api-key">
                            Author
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
                            Price
                        </FieldLabel>
                        <Input
                            id="input-demo-api-key"
                            type="number"
                            placeholder=""
                            value={data.price}
                            onChange={(e) =>
                                setData(
                                    'price',
                                    parseFloat(e.target.value) || 0,
                                )
                            }
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
                                setData('image', e.target.files?.[0] ?? null)
                            }
                        />
                        <FieldDescription>...</FieldDescription>
                    </Field>

                    <Field className="max-w-sm">
                        <FieldLabel htmlFor="input-demo-api-key">
                            Order
                        </FieldLabel>
                        <Input
                            id="input-demo-api-key"
                            type="number"
                            placeholder=""
                            value={data.order}
                            onChange={(e) =>
                                setData('order', parseInt(e.target.value) || 0)
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
