import { PlusIcon } from 'lucide-react';

import { columns, Payment } from '@/components/payments/column';
import { DataTable } from '@/components/payments/data-table';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';

export default function Articles() {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
    ];

    const data: Payment[] = [
        {
            id: '728ed52f',
            amount: 100,
            status: 'pending',
            email: 'm@example.com',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="p-10">
                <a href="/admin/articles/create">
                    <Button className=''>
                    <PlusIcon />
                    Create New Article</Button>
                </a>
                <DataTable columns={columns} data={data}/></div>
        </AppLayout>
    );
}
