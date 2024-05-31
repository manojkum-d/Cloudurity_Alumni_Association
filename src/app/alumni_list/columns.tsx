// columns.ts
import React from 'react';
import { User, Tooltip, Chip } from '@nextui-org/react';
import { DeleteIcon, EditIcon, EyeIcon } from '@/components/ui/Icon';
import { ChipProps } from "@nextui-org/react";

const statusColorMap: Record<string, ChipProps["color"]> = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

export interface Alumni {
  $id: string;
  name: string;
  email: string;
  yearofpassed: number;
  department:string;
  specialization: string;
  cocurricular: string[];
  phoneno: string;
  extracurricular: string[];
  dob: string | null;
  image: string; 
}

export const columns = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "department", label: "Department" },
  { key: "yearofpassed", label: "Year of Passed" },
  { key: "specialization", label: "Specialization" },
  { key: "cocurricular", label: "Co-curricular Activities" },
  { key: "phoneno", label: "Phone Number" },
  { key: "extracurricular", label: "Extra-curricular Activities" },
  { key: "dob", label: "Date of Birth" },
  { key: "actions", label: "Actions" }, 
];

export const renderCell = (alumni: Alumni, columnKey: React.Key) => {
  const cellValue = alumni[columnKey as keyof Alumni];

  if (Array.isArray(cellValue)) {
    return cellValue.join(', ');
  } else {
    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: alumni.image }}
            description={alumni.email}
            name={cellValue}
          >
            {alumni.email}
          </User>
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            <p className="text-bold text-sm capitalize text-default-400">{alumni.specialization}</p>
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[cellValue as keyof typeof statusColorMap] || "default"}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip content="Edit user">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }
};
