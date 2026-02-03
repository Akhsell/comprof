import { Article } from '@/components/features/articles/types';
import { Client } from '@/components/features/clients/types';
import { Event } from '@/components/features/events/types';
import { Gallery } from '@/components/features/galleries/types';
import { Product } from '@/components/features/products/types';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { SharedData, type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import {
    BookOpenText,
    BoxIcon,
    CalendarDays,
    Image,
    LayoutDashboard,
    Users,
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [];

type DashboardProps = SharedData & {
    productsCount: Product[];
    clientsCount: Client[];
    articlesCount: Article[];
    eventsCount: Event[];
    galleriesCount: Gallery[];
};

// Metric Card Component with Animation
const MetricCard = ({
    title,
    value,
    icon,
    delay = 0,
}: {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    delay?: number;
}) => {
    return (
        <Card
            className={cn(
                'transition-all duration-300 hover:-translate-y-1 hover:shadow-lg',
                'animate-fade-in opacity-0',
            )}
            style={{
                animationDelay: `${delay}ms`,
                animationFillMode: 'forwards',
            }}
        >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                    {title}
                </CardTitle>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    {icon}
                </div>
            </CardHeader>
            <CardContent>
                <div className="text-3xl font-bold">{value}</div>
            </CardContent>
        </Card>
    );
};

// Progress Bar Component with Animation
const ProgressBar = ({
    label,
    count,
    total,
    color,
    delay = 0,
}: {
    label: string;
    count: number;
    total: number;
    color: string;
    delay?: number;
}) => {
    const percentage = total > 0 ? (count / total) * 100 : 0;

    return (
        <div
            className="animate-fade-in space-y-2 opacity-0"
            style={{
                animationDelay: `${delay}ms`,
                animationFillMode: 'forwards',
            }}
        >
            <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{label}</span>
                <span className="text-sm font-semibold text-muted-foreground">
                    {count}
                </span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-secondary">
                <div
                    className={cn(
                        color,
                        'h-full rounded-full transition-all duration-1000 ease-out',
                    )}
                    style={{
                        width: `${percentage}%`,
                        animationDelay: `${delay}ms`,
                    }}
                />
            </div>
        </div>
    );
};

export default function Dashboard() {
    const {
        productsCount,
        clientsCount,
        articlesCount,
        eventsCount,
        galleriesCount,
    } = usePage<DashboardProps>().props;

    const totalCount =
        productsCount.length +
        clientsCount.length +
        articlesCount.length +
        eventsCount.length +
        galleriesCount.length;

    const metrics = [
        {
            title: 'Total Products',
            value: productsCount.length,
            icon: <BoxIcon className="h-5 w-5" />,
        },
        {
            title: 'Total Clients',
            value: clientsCount.length,
            icon: <Users className="h-5 w-5" />,
        },
        {
            title: 'Total Articles',
            value: articlesCount.length,
            icon: <BookOpenText className="h-5 w-5" />,
        },
        {
            title: 'Total Events',
            value: eventsCount.length,
            icon: <CalendarDays className="h-5 w-5" />,
        },
        {
            title: 'Gallery Items',
            value: galleriesCount.length,
            icon: <Image className="h-5 w-5" />,
        },
        {
            title: 'Total Content',
            value: totalCount,
            icon: <LayoutDashboard className="h-5 w-5" />,
        },
    ];

    const contentDistribution = [
        {
            label: 'Products',
            count: productsCount.length,
            color: 'bg-blue-500',
        },
        { label: 'Clients', count: clientsCount.length, color: 'bg-green-500' },
        {
            label: 'Articles',
            count: articlesCount.length,
            color: 'bg-purple-500',
        },
        { label: 'Events', count: eventsCount.length, color: 'bg-orange-500' },
        {
            label: 'Gallery',
            count: galleriesCount.length,
            color: 'bg-pink-500',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <style>{`
                @keyframes fade-in {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .animate-fade-in {
                    animation: fade-in 0.5s ease-out;
                }
            `}</style>

            <div className="space-y-6 p-10">
                {/* Page Header */}
                <div className="animate-fade-in">
                    <h1 className="text-3xl font-bold tracking-tight">
                        Dashboard
                    </h1>
                    <p className="mt-2 text-muted-foreground">
                        Welcome back, Here's an overview of your content.
                    </p>
                </div>

                {/* Metrics Grid */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {metrics.map((metric, index) => (
                        <MetricCard
                            key={metric.title}
                            title={metric.title}
                            value={metric.value}
                            icon={metric.icon}
                            delay={index * 100}
                        />
                    ))}
                </div>

                {/* Content Distribution
                <Card
                    className="animate-fade-in opacity-0"
                    style={{
                        animationDelay: '600ms',
                        animationFillMode: 'forwards',
                    }}
                >
                    <CardHeader>
                        <CardTitle>Content Distribution</CardTitle>
                        <CardDescription>
                            Overview of your content across different categories
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {contentDistribution.map((item, index) => (
                            <ProgressBar
                                key={item.label}
                                label={item.label}
                                count={item.count}
                                total={totalCount}
                                color={item.color}
                                delay={700 + index * 100}
                            />
                        ))}
                    </CardContent>
                </Card> */}
            </div>
        </AppLayout>
    );
}
