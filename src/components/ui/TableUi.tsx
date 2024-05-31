'use client'
import { Alumni, columns, renderCell } from "@/app/alumni_list/columns";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Input, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, SortDescriptor, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, User } from "@nextui-org/react";
import React, { useMemo, useState } from "react";
import { ChevronDownIcon, SearchIcon } from "./Icon";
import { PlusIcon } from "lucide-react";
import { useRouter } from 'next/router';
import { mutate } from 'swr';
import Link from "next/link";

interface TableUiProps {
  alumni: Alumni[];
}

const TableUi: React.FC<TableUiProps> = ({ alumni }) => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 8;
  const [filterValue, setFilterValue] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState<Set<string>>(new Set(["all"]));
  const [yearFilter, setYearFilter] = useState<Set<number>>(new Set());
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "name",
    direction: "ascending",
  });
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedUser, setSelectedUser] = useState<Alumni | null>(null);
  // const router = useRouter();

  const onSearchChange = (value: string) => {
    setFilterValue(value);
    setPage(1);
  };

  const onClear = () => {
    setFilterValue("");
    setDepartmentFilter(new Set(["all"]));
    setYearFilter(new Set());
    setPage(1);
  };

  const openModal = (user: Alumni) => {
    setSelectedUser(user);
    onOpen();
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/routes?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Alumni deleted successfully');
        mutate('/api/routes');
      } else {
        console.error('Failed to delete alumni');
      }
    } catch (error) {
      console.error('Error deleting alumni', error);
    }
  };

  const filteredAlumni = useMemo(() => {
    let filteredData = alumni;

    if (filterValue) {
      filteredData = filteredData.filter((alumnus) =>
        alumnus.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    if (!departmentFilter.has("all")) {
      filteredData = filteredData.filter((alumnus) =>
        Array.from(departmentFilter).includes(alumnus.department)
      );
    }

    if (yearFilter.size > 0) {
      filteredData = filteredData.filter((alumnus) =>
        yearFilter.has(alumnus.yearofpassed)
      );
    }

    return filteredData;
  }, [alumni, filterValue, departmentFilter, yearFilter]);

  const sortedAlumni = useMemo(() => {
    return [...filteredAlumni].sort((a, b) => {
      const first = a[sortDescriptor.column as keyof Alumni] ?? 0;
      const second = b[sortDescriptor.column as keyof Alumni] ?? 0;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [filteredAlumni, sortDescriptor]);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return sortedAlumni.slice(start, end);
  }, [page, sortedAlumni]);

  const pages = Math.ceil(filteredAlumni.length / rowsPerPage);

  const departmentItems = useMemo(() => {
    return [
      { key: "all", name: "All" },
      ...Array.from(new Set(alumni.map((alumnus) => alumnus.department))).map((department) => ({
        key: department,
        name: department,
      })),
    ];
  }, [alumni]);

  const yearItems = useMemo(() => {
    return Array.from(new Set(alumni.map((alumnus) => alumnus.yearofpassed))).map((year) => ({
      key: year,
      name: year.toString(),
    }));
  }, [alumni]);

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
          <Dropdown>
            <DropdownTrigger className="hidden sm:flex">
              <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                Department
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Department Filter"
              closeOnSelect={false}
              selectedKeys={departmentFilter}
              selectionMode="multiple"
              onSelectionChange={(keys) => setDepartmentFilter(new Set(keys as Set<string>))}
              items={departmentItems}
            >
              {(item) => (
                <DropdownItem key={item.key} className="capitalize">
                  {item.name}
                </DropdownItem>
              )}
            </DropdownMenu>
          </Dropdown>
          <Dropdown>
            <DropdownTrigger className="hidden sm:flex">
              <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                Year of Passed
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Year Filter"
              closeOnSelect={false}
              selectedKeys={yearFilter}
              selectionMode="multiple"
              onSelectionChange={(keys) => setYearFilter(new Set(Array.from(keys, (key) => Number(key))))}
              items={yearItems}
            >
              {(item) => (
                <DropdownItem key={item.key}>{item.name}</DropdownItem>
              )}
            </DropdownMenu>
          </Dropdown>
          <Link href='/add-new-alu'>
          <Button color="primary" endContent={<PlusIcon />}>
            Add New
          </Button>

          </Link>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-default-400 text-small">Total {filteredAlumni.length} Alumni</span>
        <Button size="sm" variant="flat" onPress={onClear}>
          Clear Filter
        </Button>
      </div>
    </div>
  );

  return (
    <>
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
        sortDescriptor={sortDescriptor}
        onSortChange={setSortDescriptor}
        >
       <TableHeader columns={columns}>
         {(column) => (
           <TableColumn key={column.key} allowsSorting={column.sortable}>
             {column.label}
           </TableColumn>
         )}
       </TableHeader>
       <TableBody items={items} emptyContent={"No Alumni to display."}>
         {(item) => (
           <TableRow key={item.$id} onClick={() => openModal(item)}>
             {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
           </TableRow>
         )}
       </TableBody>
     </Table>

     <Modal 
       backdrop="opaque" 
       isOpen={isOpen} 
       onOpenChange={onOpenChange}
       radius="lg"
       
       classNames={{
         body: "py-6",
         backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
         base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
         header: "border-b-[1px] border-[#292f46]",
         footer: "border-t-[1px] border-[#292f46]",
         closeButton: "hover:bg-white/5 active:bg-white/10",
       }}
       motionProps={{
         variants: {
           enter: {
             y: 0,
             opacity: 1,
             transition: {
               duration: 0.3,
               ease: "easeOut",
             },
           },
           exit: {
             y: -20,
             opacity: 0,
             transition: {
               duration: 0.2,
               ease: "easeIn",
             },
           },
         }
       }}
     >
       <ModalContent>
         {(onClose) => (
           <>
           <ModalHeader className="flex flex-col items-center gap-1">
       {selectedUser && (
         <>
           <User name={selectedUser.name} description={selectedUser.email} avatarProps={{
       src : selectedUser.image
     }}/>
         </>
       )}
     </ModalHeader>
             <ModalBody>
               <p><strong>Department:</strong> {selectedUser?.department}</p>
               <p><strong>Year of Passed:</strong> {selectedUser?.yearofpassed}</p>
               <p><strong>Specialization:</strong> {selectedUser?.specialization}</p>
               <p><strong>Co-curricular:</strong> {selectedUser?.cocurricular.join(", ")}</p>
               <p><strong>Phone No:</strong> {selectedUser?.phoneno}</p>
               <p><strong>Extra-curricular:</strong> {selectedUser?.extracurricular.join(", ")}</p>
               <p><strong>Date of Birth:</strong> {selectedUser?.dob}</p>
             </ModalBody>
             <ModalFooter>
               <Button  variant="light" onPress={onClose}>
                 Close
               </Button>
             </ModalFooter>
           </>
         )}
       </ModalContent>
     </Modal>
   </>
 );
};

export default TableUi;