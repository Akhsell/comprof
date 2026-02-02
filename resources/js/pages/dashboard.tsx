import { Head, usePage } from '@inertiajs/react';

// import { dashboard } from '@/routes';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { Product } from '@/components/features/products/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

type DashboardProps = SharedData & {
    productsCount: Product[];
}

export default function Dashboard() {
    const {productsCount} = usePage<DashboardProps>().props;
    console.log(usePage().props);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div>
                <p>Products: {productsCount.length  }</p>
            </div>
        </AppLayout>
    );
}
