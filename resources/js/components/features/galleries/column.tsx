'use client';


import { Link } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { PencilIcon, Trash } from 'lucide-react';
import { Gallery } from './types';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const galleriesColumns: ColumnDef<Gallery>[] = [
    {
        accessorKey: 'title',
        header: 'Title',
    },
    {
        accessorKey: 'image',
        header: 'Image',
        cell: ({ row }) => {
            const images = row.original.image;
            const url = images ? `/storage/${images}` : 'noimage.png';
            return <img className="h-10 w-10 object-cover" src={url} alt="" />;
        },
    },
    {
        accessorKey: 'action',
        header: 'Action',
        cell: ({ row }) => {
            return (
                <div className="flex items-center gap-2">
                    <Link href={`/admin/galleries/${row.original.id}`}>
                        <PencilIcon className="text-blue-600" size={18} />
                    </Link>
                    <Link
                        href={`/admin/galleries/${row.original.id}`}
                        method="delete"
                        as="button"
                        className="cursor-pointer"
                    >
                        <Trash className="text-red-600" size={18} />
                    </Link>
                </div>
            );
        },
    },
];
