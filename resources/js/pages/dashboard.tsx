import { Head, usePage } from '@inertiajs/react';

// import { dashboard } from '@/routes';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { Product } from '@/components/features/products/types';
import { Client } from '@/components/features/clients/types';
import { Article } from '@/components/features/articles/types';
import { Event } from '@/components/features/events/types';
import { Gallery } from '@/components/features/galleries/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

type DashboardProps = SharedData & {
    productsCount: Product[];
    clientsCount: Client[];
    articlesCount: Article[];
    eventsCount: Event[];
    galleriesCount: Gallery[];

}

export default function Dashboard() {
    const {productsCount, clientsCount, articlesCount, eventsCount, galleriesCount} = usePage<DashboardProps>().props;
    console.log(usePage().props);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div>
                <p>Products: {productsCount.length}</p>
                <p>Clients: {clientsCount.length}</p>
                <p>Articles: {articlesCount.length}</p>
                <p>Events: {eventsCount.length}</p>
                <p>Gallery: {galleriesCount.length}</p>
            </div>
        </AppLayout>
    );
}
