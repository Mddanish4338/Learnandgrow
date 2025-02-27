import {
  Button,
  Card,
  CardBody,
  Chip,
  Input,
  Select,
  SelectItem,
  Spinner,
} from "@nextui-org/react";
import {
  Briefcase,
  Calendar,
  Filter,
  MapPin,
  Plus,
  RefreshCcw,
  Search,
  X,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useIsMobile from "../../hooks/useIsMobile";
import JobsTable from "../components/jobsTable";
import { getCompanyJobs } from "../../services/companyService";
import { useAuth } from "../../context/AuthContext";

const ManageJobs = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [activeFilters, setActiveFilters] = useState(0);
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const jobData = await getCompanyJobs(user.uid);
        setJobs(jobData);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchJobs();
  }, [jobs]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    let count = 0;
    if (selectedStatus !== "All") count++;
    if (selectedType !== "All") count++;
    if (selectedDepartment !== "All") count++;
    setActiveFilters(count);
  }, [selectedStatus, selectedType, selectedDepartment]);

  const handleStatusChange = (status) => setSelectedStatus(status);
  const handleTypeChange = (type) => setSelectedType(type);
  const handleDepartmentChange = (dept) => setSelectedDepartment(dept);
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedStatus("All");
    setSelectedType("All");
    setSelectedDepartment("All");
  };

  const departments = ["All", ...new Set(jobs.map((job) => job.department))];

  const filteredJobs = jobs.filter((job) => {
    return (
      (selectedStatus === "All" || job.status === selectedStatus) &&
      (selectedType === "All" ||
        (job.jobType || "").toLowerCase() ===
          (selectedType || "").toLowerCase()) &&
      (selectedDepartment === "All" || job.department === selectedDepartment) &&
      (debouncedSearchTerm === "" ||
        (job.title || "")
          .toLowerCase()
          .includes(debouncedSearchTerm.toLowerCase()) ||
        (job.department || "")
          .toLowerCase()
          .includes(debouncedSearchTerm.toLowerCase()) ||
        (job.jobType || "")
          .toLowerCase()
          .includes(debouncedSearchTerm.toLowerCase()) ||
        (job.location || "")
          .toLowerCase()
          .includes(debouncedSearchTerm.toLowerCase()))
    );
  });

  const handleAction = (action, jobId) => {
    switch (action) {
      case "view":
        navigate(`/company-panel/manage-jobs/job-details/${jobId}`);
        break;
    }
  };
  if (loading) {
    return <Spinner />;
  }
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen px-2 md:px-6 pb-20 w-full max-w-full overflow-hidden space-y-4 md:space-y-6">
      <div className="flex flex-col gap-3 mt-6">
        <div className="flex justify-between items-center">
          <h1 className="text-xl md:text-3xl font-bold bg-gradient-to-r from-primary-500 to-primary-800 bg-clip-text text-transparent">
            Manage Jobs
          </h1>
          <Button
            as={Link}
            to="/company-panel/post-job"
            color="primary"
            startContent={<Plus size={isMobile ? 14 : 16} />}
            size={isMobile ? "sm" : "md"}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            {isMobile ? "New Job" : "Post New Job"}
          </Button>
        </div>

        <div className="w-full mt-2">
          <Input
            placeholder="Search by job title, department, type, or location..."
            startContent={<Search size={16} className="text-default-400" />}
            endContent={
              searchTerm && (
                <Button
                  isIconOnly
                  size="sm"
                  variant="light"
                  onPress={() => setSearchTerm("")}
                >
                  <X size={16} className="text-default-400" />
                </Button>
              )
            }
            className="w-full shadow-sm"
            size="md"
            value={searchTerm}
            onChange={handleSearchChange}
            variant="bordered"
            classNames={{
              inputWrapper: "border-1 border-gray-200",
            }}
          />
        </div>

        <Card className="w-full shadow-sm hover:shadow-md transition-shadow duration-300 bg-white border border-gray-100">
          <CardBody className="p-3 md:p-4">
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <div className="flex items-center">
                <Button
                  startContent={<Filter size={isMobile ? 14 : 16} />}
                  variant="flat"
                  color={activeFilters > 0 ? "primary" : "default"}
                  size="md"
                  onPress={() => setIsFilterExpanded(!isFilterExpanded)}
                  className={
                    activeFilters > 0
                      ? "bg-blue-100 dark:bg-blue-900 font-medium"
                      : "font-medium"
                  }
                >
                  Filters{" "}
                  {activeFilters > 0 && (
                    <Chip
                      size="sm"
                      color="primary"
                      variant="flat"
                      className="ml-1"
                    >
                      {activeFilters}
                    </Chip>
                  )}
                </Button>

                {activeFilters > 0 && (
                  <Button
                    startContent={<RefreshCcw size={isMobile ? 14 : 16} />}
                    variant="light"
                    size="md"
                    onPress={resetFilters}
                    className="ml-2"
                  >
                    Reset
                  </Button>
                )}
              </div>

              {!isMobile && (
                <div className="flex flex-wrap gap-2 items-center ml-auto">
                  {selectedStatus !== "All" && (
                    <Chip
                      variant="flat"
                      color="primary"
                      onClose={() => setSelectedStatus("All")}
                      startContent={<Calendar size={14} />}
                      className="shadow-sm"
                    >
                      Status: {selectedStatus}
                    </Chip>
                  )}
                  {selectedType !== "All" && (
                    <Chip
                      variant="flat"
                      color="secondary"
                      onClose={() => setSelectedType("All")}
                      startContent={<Briefcase size={14} />}
                      className="shadow-sm"
                    >
                      Type: {selectedType}
                    </Chip>
                  )}
                  {selectedDepartment !== "All" && (
                    <Chip
                      variant="flat"
                      color="warning"
                      onClose={() => setSelectedDepartment("All")}
                      startContent={<MapPin size={14} />}
                      className="shadow-sm"
                    >
                      Dept: {selectedDepartment}
                    </Chip>
                  )}
                </div>
              )}
            </div>

            {isFilterExpanded && (
              <div className="mt-3 pt-3 border-t">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <Select
                    label="Status"
                    selectedKeys={[selectedStatus]}
                    onChange={(e) => handleStatusChange(e.target.value)}
                    startContent={
                      <Calendar size={16} className="text-default-400" />
                    }
                    classNames={{
                      trigger: "h-12 border-1 border-gray-200",
                      label: "text-default-600 font-medium",
                    }}
                    variant="bordered"
                  >
                    <SelectItem key="All">All Statuses</SelectItem>
                    <SelectItem key="Active">Active</SelectItem>
                    <SelectItem key="Closed">Closed</SelectItem>
                  </Select>

                  <Select
                    label="Job Type"
                    selectedKeys={[selectedType]}
                    onChange={(e) => handleTypeChange(e.target.value)}
                    startContent={
                      <Briefcase size={16} className="text-default-400" />
                    }
                    classNames={{
                      trigger: "h-12 border-1 border-gray-200",
                      label: "text-default-600 font-medium",
                    }}
                    variant="bordered"
                  >
                    <SelectItem key="All">All Types</SelectItem>
                    <SelectItem key="Full-time">Full-time</SelectItem>
                    <SelectItem key="Part-time">Part-time</SelectItem>
                    <SelectItem key="Contract">Contract</SelectItem>
                    <SelectItem key="Internship">Internship</SelectItem>
                  </Select>

                  <Select
                    label="Department"
                    selectedKeys={[selectedDepartment]}
                    onChange={(e) => handleDepartmentChange(e.target.value)}
                    startContent={
                      <MapPin size={16} className="text-default-400" />
                    }
                    classNames={{
                      trigger: "h-12 border-1 border-gray-200",
                      label: "text-default-600 font-medium",
                    }}
                    variant="bordered"
                  >
                    {departments.map((dept) => (
                      <SelectItem key={dept}>
                        {dept === "All" ? "All Departments" : dept}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
              </div>
            )}
          </CardBody>
        </Card>
      </div>

      {isMobile && activeFilters > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedStatus !== "All" && (
            <Chip
              variant="flat"
              color="primary"
              onClose={() => setSelectedStatus("All")}
              size="sm"
              className="shadow-sm"
            >
              Status: {selectedStatus}
            </Chip>
          )}
          {selectedType !== "All" && (
            <Chip
              variant="flat"
              color="secondary"
              onClose={() => setSelectedType("All")}
              size="sm"
              className="shadow-sm"
            >
              Type: {selectedType}
            </Chip>
          )}
          {selectedDepartment !== "All" && (
            <Chip
              variant="flat"
              color="warning"
              onClose={() => setSelectedDepartment("All")}
              size="sm"
              className="shadow-sm"
            >
              Dept: {selectedDepartment}
            </Chip>
          )}
        </div>
      )}

      <div className="w-full max-w-full overflow-x-hidden">
        <JobsTable
          jobs={filteredJobs}
          isMobile={isMobile}
          handleAction={handleAction}
        />
      </div>
    </div>
  );
};

export default ManageJobs;
