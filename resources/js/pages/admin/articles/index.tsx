import { articlesColumns } from '@/components/features/articles/column';
import type { Article } from '@/components/features/articles/types';
import { DataTable } from '@/components/payments/data-table';
import AppLayout from '@/layouts/app-layout';
import type { SharedData } from '@/types';
import { BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';

export default function Articles() {
    const breadcrumbs: BreadcrumbItem[] = [];

    const { auth, articles } = usePage<SharedData>().props;
    const user = auth.user;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="p-10">
                <div className="flex w-full justify-between">
                    <p className="text-3xl font-bold">Articles</p>
                    <p className="font-black">Hi, {user.name}</p>
                </div>
                <div className="flex items-center justify-between"> </div>
                <DataTable
                    columns={articlesColumns}
                    data={articles as Article[]}
                    filterColumns="email"
                    createhref="/admin/articles/create"
                    createlabel="New Article"
                />
            </div>
        </AppLayout>
    );
}
