import { columns} from '@/components/features/articles/column';
import type { Payment } from '@/components/features/articles/types';
import { DataTable } from '@/components/payments/data-table';
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
            title: 'First Article',
            content: 'This is the content of the first article.',
            thumbnail: 'https://via.placeholder.com/150',
            author: 'John Doe',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="p-10">
                <div className='flex items-center justify-between'> </div>
                <DataTable columns={columns} data={data}
                filterColumns="email"
                createhref='/admin/articles/create'
                createlabel='New Article'
                />
                </div>
        </AppLayout>
    );
}
