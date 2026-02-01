import { productsColumns } from '@/components/features/products/column';
import type { Product } from '@/components/features/products/types';
import { DataTable } from '@/components/payments/data-table';
import AppLayout from '@/layouts/app-layout';
import type { SharedData } from '@/types';
import { BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';

export default function Products() {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
    ];
    const { auth, products } = usePage<SharedData>().props;
    const user = auth.user;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="p-10">
                <div className="flex w-full justify-between">
                    <p className="text-3xl font-bold">Products</p>
                    <p className="font-black">Hi, {user.name}</p>
                </div>
                <div className="flex items-center justify-between"> </div>
                <DataTable
                    columns={productsColumns}
                    data={products as Product[]}
                    filterColumns="email"
                    createhref="/admin/products/create"
                    createlabel="New Product"
                />
            </div>
        </AppLayout>
    );
}
