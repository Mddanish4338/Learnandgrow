import { Button, ButtonGroup, Input } from "@nextui-org/react";
import { Filter, Plus, RefreshCcw, Search } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useIsMobile from "../../hooks/useIsMobile";
import JobsTable from "../components/jobsTable";

const ManageJobs = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  // Sample jobs data
  const [jobs] = useState([
    {
      id: 1,
      title: "Senior Software Engineer",
      department: "Engineering",
      location: "New York, NY",
      type: "Full-time",
      posted: "2024-02-15",
      status: "Active",
      applicants: 12,
    },
    {
      id: 2,
      title: "UX Designer",
      department: "Design",
      location: "Remote",
      type: "Contract",
      posted: "2024-02-14",
      status: "Active",
      applicants: 8,
    },
    {
      id: 3,
      title: "Product Manager",
      department: "Product",
      location: "San Francisco, CA",
      type: "Full-time",
      posted: "2024-02-10",
      status: "Closed",
      applicants: 15,
    },
    {
      id: 4,
      title: "Marketing Specialist",
      department: "Marketing",
      location: "Chicago, IL",
      type: "Part-time",
      posted: "2024-02-16",
      status: "Closed",
      applicants: 0,
    },
  ]);

  const handleAction = (action, jobId) => {
    switch (action) {
      case "view":
        navigate(`/company-panel/manage-jobs/job-details/${jobId}`);
        break;
      case "edit":
        navigate(`/company-panel/manage-jobs/edit/${jobId}`);
        break;
      case "delete":
        // Add delete confirmation logic here
        console.log(`Deleting job with id: ${jobId}`);
        break;
      default:
        break;
    }
  };

  return (
    <div className="px-2 md:px-6 pb-20 w-full max-w-full overflow-hidden min-h-screen space-y-4 md:space-y-6">
      <div className="flex flex-col gap-3 mt-3">
        <div className="flex justify-between items-center">
          <h1 className="text-lg md:text-2xl font-bold">Manage Jobs</h1>
          <Button
            as={Link}
            to="/post-job"
            color="primary"
            startContent={<Plus size={isMobile ? 14 : 16} />}
            size={isMobile ? "sm" : "md"}
          >
            {isMobile ? "New Job" : "Post New Job"}
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            placeholder="Search jobs..."
            startContent={<Search size={16} className="text-default-400" />}
            className="w-full sm:w-72"
            size={isMobile ? "sm" : "md"}
          />
          <div className="flex gap-2">
            <ButtonGroup>
              <Button
                startContent={<Filter size={isMobile ? 14 : 16} />}
                variant="flat"
                size={isMobile ? "sm" : "md"}
              >
                {isMobile ? "Filter" : "Filter"}
              </Button>
              <Button
                startContent={<RefreshCcw size={isMobile ? 14 : 16} />}
                variant="flat"
                size={isMobile ? "sm" : "md"}
              >
                {isMobile ? "Reset" : "Reset"}
              </Button>
            </ButtonGroup>
          </div>
        </div>
      </div>

      <div className="w-full max-w-full overflow-x-hidden">
        <JobsTable
          jobs={jobs}
          isMobile={isMobile}
          handleAction={handleAction}
        />
      </div>
    </div>
  );
};

export default ManageJobs;
