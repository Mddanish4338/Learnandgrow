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
  Badge,
  Avatar,
  Tooltip,
} from "@nextui-org/react";
import {
  MoreVertical,
  Eye,
  Edit2,
  Trash2,
  Briefcase,
  MapPin,
  Calendar,
  Clock,
  Users,
  Filter,
  Search,
  Plus,
} from "lucide-react";
import { Link } from "react-router-dom";

const statusColorMap = {
  Active: "success",
  Paused: "warning",
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
          <div className="flex items-center gap-3 max-w-32 md:max-w-full">
            <div className="bg-primary-100 p-2 rounded-md">
              <Briefcase size={isMobile ? 14 : 18} className="text-primary" />
            </div>
            <div>
              <div className="font-medium text-xs md:text-sm truncate">
                {job.title}
              </div>
              {isMobile && job.department && (
                <div className="text-xs text-gray-500">{job.department}</div>
              )}
            </div>
          </div>
        );
      case "department":
        return (
          <div className="flex items-center gap-2">
            <Chip size="sm" variant="flat" color="primary">
              {job.department}
            </Chip>
          </div>
        );
      case "location":
        return (
          <div className="flex items-center gap-1.5">
            <MapPin size={14} className="text-gray-500" />
            <span className="text-xs md:text-sm">{job.location}</span>
          </div>
        );
      case "type":
        return (
          <Chip
            size="sm"
            variant="flat"
            classNames={{
              base: "w-[100px]",
              content: "w-[150px], flex items-center justify-center",
            }}
            color={job.type === "Full Time" ? "secondary" : "default"}
          >
            <Clock size={12} className="mr-1" />
            {job.type}
          </Chip>
        );
      case "posted":
        return (
          <div className="flex items-center gap-1.5">
            <Calendar size={14} className="text-gray-500" />
            <Tooltip
              content={`Posted on ${new Date(job.posted).toLocaleDateString(
                "en-US",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }
              )}`}
            >
              <span className="text-xs md:text-sm">
                {formatTimeAgo(job.posted)}
              </span>
            </Tooltip>
          </div>
        );
      case "status":
        return (
          <Chip
            size="sm"
            color={statusColorMap[job.status]}
            variant="flat"
            className="text-xs font-medium"
          >
            {job.status}
          </Chip>
        );
      case "applicants":
        return (
          <div className="flex items-center gap-2">
            <Badge content={job.applicants} color="primary" size="sm">
              <Users size={16} className="text-gray-600" />
            </Badge>
          </div>
        );
      case "actions":
        return (
          <div className="flex justify-end">
            <Dropdown>
              <DropdownTrigger>
                <Button
                  isIconOnly
                  variant="light"
                  size="sm"
                  className="rounded-full"
                >
                  <MoreVertical size={isMobile ? 14 : 16} />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Job actions">
                <DropdownItem
                  startContent={<Eye size={14} className="text-blue-500" />}
                  onPress={() => handleAction("view", job.id)}
                >
                  View Details
                </DropdownItem>
                <DropdownItem
                  startContent={<Edit2 size={14} className="text-amber-500" />}
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
          </div>
        );
      default:
        return job[columnKey];
    }
  };

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "Yesterday";
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
    return `${Math.floor(diffInDays / 365)} years ago`;
  };

  const renderEmptyState = () => {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="bg-gray-100 rounded-full p-4 mb-4">
          <Briefcase size={32} className="text-gray-400" />
        </div>
        <h4 className="text-base font-medium mb-2">No Jobs Posted</h4>
        <p className="text-sm text-gray-500 mb-4 max-w-md">
          There are currently no job listings available. Create your first job
          posting to get started.
        </p>
        <Button
          as={Link}
          to="/company-panel/post-job"
          color="primary"
          variant="flat"
          startContent={<Plus size={16} />}
        >
          Create Job Posting
        </Button>
      </div>
    );
  };

  return (
    <Card className="w-full shadow-md">
      <CardHeader className="flex justify-between items-center px-6 py-4 bg-gradient-to-l from-primary-foreground to-primary-100">
        <div>
          <h3 className="text-sm md:text-lg font-semibold text-primary-700">
            All Jobs
          </h3>
          {jobs.length > 0 && (
            <p className="text-xs text-gray-500">
              Showing {jobs.length} job{jobs.length !== 1 ? "s" : ""}
            </p>
          )}
        </div>
      </CardHeader>
      <CardBody className="md:px-4 overflow-hidden">
        {jobs.length > 0 ? (
          <div className="w-full overflow-x-auto">
            <Table
              aria-label="Jobs table"
              selectionMode="none"
              classNames={{
                th: "text-xs md:text-sm py-3 md:px-4 bg-gray-50",
                td: "text-xs md:text-sm py-3 md:px-4",
                tbody: "p-0",
                wrapper: "p-0 rounded-lg border border-gray-200",
              }}
              shadow="none"
              layout={isMobile ? "fixed" : "auto"}
              isStriped
            >
              <TableHeader>
                {columns.map((column) => (
                  <TableColumn key={column.key} className="font-medium">
                    {column.label}
                  </TableColumn>
                ))}
              </TableHeader>
              <TableBody>
                {jobs.map((job) => (
                  <TableRow
                    key={job.id}
                    className="hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => handleAction("view", job.id)}
                  >
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
        ) : (
          renderEmptyState()
        )}
      </CardBody>
    </Card>
  );
};

export default JobsTableWithCard;
