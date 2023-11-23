import { type Song } from ".prisma/client";
import usePlayer from "~/app/_hooks/usePlayer";
import React, { type MouseEvent, useEffect } from "react";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

interface SongListProps<TData extends Song, TValue> {
  columns: ColumnDef<TData, TValue>[];
  songs: TData[];
}

export default function SongList<TData extends Song, TValue>({
  columns,
  songs,
}: SongListProps<TData, TValue>) {
  const player = usePlayer();

  function onClick(e: MouseEvent, song: Song) {
    e.preventDefault();
    if (player.activeSong?.id !== song.id) player.setActiveSong(song);
    else player.togglePlay();
    if (player.tempIds.length) player.updateIds();
  }

  useEffect(() => {
    player.setTempIds(songs.map((song) => song.id));
  }, [player.setTempIds, songs]);

  const table = useReactTable({
    data: songs,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full overflow-auto rounded-md">
      <Table className="w-full table-fixed">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    colSpan={header.colSpan}
                    style={{ width: header.getSize() }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          <TableRow className="h-2" />
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                onDoubleClick={(e) => onClick(e, row.original)}
                onClick={() => {
                  table.toggleAllPageRowsSelected(false);
                  row.toggleSelected(true);
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
