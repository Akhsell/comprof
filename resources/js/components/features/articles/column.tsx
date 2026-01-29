"use client"

import { PencilIcon, Trash } from "lucide-react"
import { ColumnDef } from "@tanstack/react-table"
import { Payment } from "./types"
import { Link, router } from "@inertiajs/react"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.


export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "content",
    header: "Content",
  },
  {
    accessorKey: "thumbnail",
    header: "Thumbnail",
  },
  {
    accessorKey: "author",
    header: "Author",
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => {
      return(
        <div className="flex items-center gap-2">
          <Link>
          <PencilIcon className="text-black" size={18} />
        </Link>
        <Link href={('admin/article/destroy/${row.original.id}')} method="delete" as="button" >
          <Trash className="text-red-600" size={18} />
        </Link>
        </div>
      )
  }   },
]