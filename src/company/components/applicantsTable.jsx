import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Divider,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  User,
  Tooltip,
} from "@nextui-org/react";
import { Eye, Mail, Download, UserCheck, UserX, Copy } from "lucide-react";
import React, { useState } from "react";

const statusColorMap = {
  Pending: "warning",
  New: "primary",
  Shortlisted: "success",
  Rejected: "danger",
};

const ApplicantsTable = ({ applicants = [], isMobile, handleAction }) => {
  const [copySuccess, setCopySuccess] = useState(false);
  const [updatedApplicants, setUpdatedApplicants] = useState(applicants);

  const columns = isMobile
    ? [
        { key: "name", label: "APPLICANT" },
        { key: "status", label: "STATUS" },
        { key: "actions", label: "ACTIONS" },
      ]
    : [
        { key: "applicant", label: "APPLICANT" },
        { key: "appliedDate", label: "APPLIED DATE" },
        { key: "status", label: "STATUS" },
        { key: "experience", label: "EXPERIENCE" },
        { key: "actions", label: "" },
      ];

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  const handleDownloadResume = (resumeUrl) => {
    const link = document.createElement("a");
    link.href = resumeUrl;
    link.download = "Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShortlist = (applicantId) => {
    if (handleAction) {
      // If parent component provides handleAction, use it
      handleAction({
        type: "shortlist",
        applicantId,
      });
    } else {
      // Otherwise, handle it internally
      setUpdatedApplicants(
        updatedApplicants.map((app) =>
          app.id === applicantId ? { ...app, status: "Shortlisted" } : app
        )
      );
    }
  };

  const handleReject = (applicantId) => {
    if (handleAction) {
      // If parent component provides handleAction, use it
      handleAction({
        type: "reject",
        applicantId,
      });
    } else {
      // Otherwise, handle it internally
      setUpdatedApplicants(
        updatedApplicants.map((app) =>
          app.id === applicantId ? { ...app, status: "Rejected" } : app
        )
      );
    }
  };

  const renderCell = (applicant, columnKey) => {
    switch (columnKey) {
      case "applicant":
        return (
          <User
            name={applicant.name}
            description={applicant.email}
            avatarProps={{
              src: applicant.avatar,
              radius: "lg",
            }}
          />
        );

      case "name":
        return (
          <div className="flex items-center gap-2">
            <img
              src={applicant.avatar}
              alt={applicant.name}
              className="w-6 h-6 rounded-full"
            />
            <span>{applicant.name}</span>
          </div>
        );

      case "status":
        return (
          <Chip
            size="sm"
            color={statusColorMap[applicant.status]}
            variant="flat"
            className="text-xs"
          >
            {applicant.status}
          </Chip>
        );

      case "actions":
        return (
          <div className={`flex ${isMobile ? "gap-[0px]" : "gap-2"}`}>
            <Popover
              placement={isMobile ? "top" : "left"}
              showArrow
              trigger="hover"
            >
              <PopoverTrigger>
                <Button isIconOnly variant="light" size="sm">
                  <Eye className="w-4 h-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <div className="w-80 p-4">
                  <div className="flex gap-4 items-start mb-4">
                    <img
                      src={applicant.avatar}
                      alt={`${applicant.name} profile`}
                      className="w-16 h-16 rounded-md object-cover"
                    />
                    <div>
                      <h3 className="text-lg font-semibold">
                        {applicant.name}
                      </h3>
                      <p className="text-sm text-gray-500">{applicant.email}</p>
                      <p className="text-xs text-gray-500">{applicant.phone}</p>
                      <p className="text-xs text-gray-500">
                        {applicant.location}
                      </p>
                    </div>
                  </div>
                  <Divider className="my-2" />
                  <div className="my-2">
                    <p className="text-sm font-medium">Experience</p>
                    <p className="text-sm">{applicant.experience}</p>
                  </div>
                  <div className="my-2">
                    <p className="text-sm font-medium">Education</p>
                    <p className="text-sm">{applicant.education}</p>
                  </div>
                  <div className="my-2">
                    <p className="text-sm font-medium">Skills</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {applicant.skills.map((skill, index) => (
                        <Chip key={index} size="sm" variant="flat">
                          {skill}
                        </Chip>
                      ))}
                    </div>
                  </div>
                  <div className="my-2">
                    <p className="text-sm font-medium">Summary</p>
                    <p className="text-sm">{applicant.summary}</p>
                  </div>
                  <div className="mt-4 flex justify-between">
                    <Chip
                      color={statusColorMap[applicant.status]}
                      variant="flat"
                    >
                      {applicant.status}
                    </Chip>
                    <Button
                      isIconOnly
                      size="sm"
                      variant="light"
                      onPress={() => handleDownloadResume(applicant.resume)}
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            {!isMobile && (
              <Popover placement="top" showArrow>
                <PopoverTrigger>
                  <Button isIconOnly variant="light" size="sm">
                    <Mail className="w-4 h-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <div className="p-2 relative">
                    <div className="pr-8 py-2">
                      <p className="text-sm font-medium">Email Address:</p>
                      <p className="text-sm mt-1">{applicant.email}</p>
                    </div>
                    <Button
                      isIconOnly
                      size="sm"
                      variant="light"
                      className="absolute top-2 right-2"
                      onPress={() => copyToClipboard(applicant.email)}
                    >
                      <Tooltip
                        content={copySuccess ? "Copied!" : "Copy"}
                        placement="top"
                      >
                        <Copy className="w-4 h-4" />
                      </Tooltip>
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            )}

            <Tooltip content="Shortlist">
              <Button
                isIconOnly
                variant="light"
                size="sm"
                color="success"
                onPress={() => handleShortlist(applicant.id)}
                isDisabled={applicant.status === "Shortlisted"}
              >
                <UserCheck className="w-4 h-4" />
              </Button>
            </Tooltip>

            <Tooltip content="Reject">
              <Button
                isIconOnly
                variant="light"
                size="sm"
                color="danger"
                onPress={() => handleReject(applicant.id)}
                isDisabled={applicant.status === "Rejected"}
              >
                <UserX className="w-4 h-4" />
              </Button>
            </Tooltip>
          </div>
        );

      default:
        return applicant[columnKey];
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="md:px-6 py-2 md:py-4">
        <h3 className="text-sm md:text-lg font-semibold">Applicants</h3>
      </CardHeader>
      <CardBody className="md:px-4 overflow-hidden">
        <div className="w-full overflow-x-scroll">
          <Table
            aria-label="Applicants table"
            selectionMode="none"
            classNames={{
              base: "w-full min-w-full p-0",
              table: "p-0 overflow-x-visible",
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
            <TableBody className="gap-y-2 space-y-2">
              {updatedApplicants.map((applicant) => (
                <TableRow key={applicant.id}>
                  {columns.map((column) => (
                    <TableCell key={`${applicant.id}-${column.key}`}>
                      {renderCell(applicant, column.key)}
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

export default ApplicantsTable;
