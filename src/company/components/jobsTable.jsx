import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Chip,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Card,
  CardHeader,
  CardBody,
} from "@nextui-org/react";
import { MoreVertical, Eye, Edit2, Trash2 } from "lucide-react";

const statusColorMap = {
  Active: "success",
  paused: "warning",
  Closed: "danger",
};

const JobsTableWithCard = ({ jobs = [], isMobile, handleAction }) => {
  const columns = isMobile
    ? [
        { key: "title", label: "JOB" },
        { key: "status", label: "STATUS" },
        { key: "actions", label: "ACTIONS" },
      ]
    : [
        { key: "title", label: "JOB TITLE" },
        { key: "department", label: "DEPARTMENT" },
        { key: "location", label: "LOCATION" },
        { key: "type", label: "TYPE" },
        { key: "posted", label: "POSTED" },
        { key: "status", label: "STATUS" },
        { key: "applicants", label: "APPLICANTS" },
        { key: "actions", label: "" },
      ];

  const renderCell = (job, columnKey) => {
    switch (columnKey) {
      case "title":
        return (
          <div className="max-w-32 md:max-w-full">
            <div className="font-medium text-xs md:text-sm truncate">
              {job.title}
            </div>
          </div>
        );
      case "type":
        return (
          <Chip size="sm" variant="flat">
            {job.type}
          </Chip>
        );
      case "posted":
        return new Date(job.posted).toLocaleDateString();
      case "status":
        return (
          <Chip
            size="sm"
            color={statusColorMap[job.status]}
            variant="flat"
            className="text-xs"
          >
            {job.status}
          </Chip>
        );
      case "actions":
        return (
          <Dropdown>
            <DropdownTrigger>
              <Button isIconOnly variant="light" size="sm">
                <MoreVertical size={isMobile ? 14 : 16} />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Job actions">
              <DropdownItem
                startContent={<Eye size={14} />}
                onPress={() => handleAction("view", job.id)}
              >
                View Details
              </DropdownItem>
              <DropdownItem
                startContent={<Edit2 size={14} />}
                onPress={() => handleAction("edit", job.id)}
              >
                Edit Job
              </DropdownItem>
              <DropdownItem
                startContent={<Trash2 size={14} />}
                className="text-danger"
                color="danger"
                onPress={() => handleAction("delete", job.id)}
              >
                Delete Job
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        );
      default:
        return job[columnKey];
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="md:px-6 py-2 md:py-4">
        <h3 className="text-sm md:text-lg font-semibold">All Jobs</h3>
      </CardHeader>
      <CardBody className="md:px-4 overflow-hidden">
        <div className="w-full overflow-x-auto">
          <Table
            aria-label="Jobs table"
            selectionMode="none"
            classNames={{
              th: "text-xs md:text-sm py-2 md:px-4",
              td: "text-xs md:text-sm py-2 p-0 md:px-4",
              tbody: "p-0 gap-x-1",
              wrapper: "p-0",
            }}
            shadow={!isMobile ? "sm" : "none"}
            layout={isMobile ? "fixed" : "auto"}
          >
            <TableHeader>
              {columns.map((column) => (
                <TableColumn key={column.key}>{column.label}</TableColumn>
              ))}
            </TableHeader>
            <TableBody>
              {jobs.map((job) => (
                <TableRow key={job.id}>
                  {columns.map((column) => (
                    <TableCell key={`${job.id}-${column.key}`}>
                      {renderCell(job, column.key)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardBody>
    </Card>
  );
};

export default JobsTableWithCard;
