import { galleriesColumns } from '@/components/features/galleries/column';
import type { Gallery } from '@/components/features/galleries/types';
import { DataTable } from '@/components/payments/data-table';
import AppLayout from '@/layouts/app-layout';
import type { SharedData } from '@/types';
import { BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';

export default function Galleries() {
    const breadcrumbs: BreadcrumbItem[] = [];

    const { auth, galleries } = usePage<SharedData>().props;
    const user = auth.user;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="p-10">
                <div className="flex w-full justify-between">
                    <p className="text-3xl font-bold">Galleries</p>
                    <p className="font-black">Hi, {user.name}</p>
                </div>
                <div className="flex items-center justify-between"> </div>
                <DataTable
                    columns={galleriesColumns}
                    data={galleries as Gallery[]}
                    filterColumns="email"
                    createhref="/admin/galleries/create"
                    createlabel="New Gallery"
                />
            </div>
        </AppLayout>
    );
}
