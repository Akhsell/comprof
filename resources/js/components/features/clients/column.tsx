'use client';

import { Link } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { PencilIcon, Trash } from 'lucide-react';
import { Client } from './types';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const clientsColumns: ColumnDef<Client>[] = [
    {
        accessorKey: 'name',
        header: 'Name',
    },
    {
        accessorKey: 'description',
        header: 'Description',
    },
    {
        accessorKey: 'content',
        header: 'Content',
    },
    {
        accessorKey: 'location',
        header: 'Location',
    },
    {
        accessorKey: 'action',
        header: 'Action',
        cell: ({ row }) => {
            return (
                <div className="flex items-center gap-2">
                    <Link href={`/admin/clients/${row.original.id}`}>
                        <PencilIcon className="text-blue-600" size={18} />
                    </Link>
                    <Link
                        href={`/admin/clients/${row.original.id}`}
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
