'use client'
import { Alumni, columns, renderCell } from "@/app/alumni_list/columns";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Input } from "@nextui-org/react";
import { useMemo, useState } from "react";
import { SearchIcon } from "./Icon";


interface TableUiProps {
  alumni: Alumni[];
}

const TableUi: React.FC<TableUiProps> = ({ alumni }) => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 8;
  const [filterValue, setFilterValue] = useState("");
  const [visibleColumns, setVisibleColumns] = useState(new Set(columns.map((column) => column.key)));

  const onSearchChange = (value: string) => {
    setFilterValue(value);
    setPage(1);
  };

  const onClear = () => {
    setFilterValue("");
    setPage(1);
  };

  const filteredAlumni = useMemo(() => {
    if (!filterValue) return alumni;
    return alumni.filter((alumnus) =>
      alumnus.name.toLowerCase().includes(filterValue.toLowerCase())
    );
  }, [alumni, filterValue]);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredAlumni.slice(start, end);
  }, [page, filteredAlumni]);

  const pages = Math.ceil(filteredAlumni.length / rowsPerPage);

  const topContent = (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between gap-3 items-end">
        <Input
          isClearable
          className="w-full sm:max-w-[44%]"
          placeholder="Search by name..."
          startContent={<SearchIcon />}
          value={filterValue}
          onClear={onClear}
          onValueChange={onSearchChange}
        />
        <div className="flex gap-3">
          {/* Add column visibility toggle here */}
        </div>
      </div>
    </div>
  );

  return (
    <Table
      aria-label="Alumni Table"
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="secondary"
            page={page}
            total={pages}
            onChange={(page) => setPage(page)}
          />
        </div>
      }
      classNames={{
        wrapper: "min-h-[222px]",
      }}
      topContent={topContent}
      topContentPlacement="outside"
    >
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={items} emptyContent={"No Alumni to display."}>
        {(item) => (
          <TableRow key={item.$id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

export default TableUi;