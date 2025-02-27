import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Divider,
  Input,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import {
  Briefcase,
  Calendar,
  Clock,
  Code,
  DollarSign,
  FileText,
  MapPin,
  Tag,
  Users,
} from "lucide-react";
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { createJobPost } from "../../services/companyService";

const jobTypes = [
  { value: "Full-time", label: "Full-time" },
  { value: "Part-time", label: "Part-time" },
  { value: "Contract", label: "Contract" },
  { value: "Internship", label: "Internship" },
  { value: "Remote", label: "Remote" },
];

export default function PostJob() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    jobTitle: "",
    location: "",
    jobType: "",
    salary: "",
    jobDescription: "",
    skillsRequired: "",
    duration: "",
    department: "",
    openings: "",
  });

  const [skills, setSkills] = useState([]);

  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSkillsChange = (value) => {
    if (value.includes(",")) {
      const newSkills = value.split(",").map((skill) => skill.trim());
      setSkills((prev) => [
        ...new Set([...prev, ...newSkills.filter((s) => s)]),
      ]);
      handleChange("skillsRequired", "");
    } else {
      handleChange("skillsRequired", value);
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submissionData = {
      ...formData,
      jobType: Array.isArray(formData.jobType)
        ? formData.jobType[0]
        : formData.jobType,
      skillsRequired: skills,
    };

    try {
      await createJobPost(submissionData, user.uid);
      setFormData({
        jobTitle: "",
        location: "",
        jobType: "",
        salary: "",
        jobDescription: "",
        skillsRequired: "",
        applicationDeadline: "",
        department: "",
        openings: "",
        duration: "",
      });
      setSkills([]);
    } catch (error) {
      console.error("Error posting job:", error);
    }
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen p-3 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-primary-500 to-primary-800 bg-clip-text text-transparent">
              Post a New Job
            </h1>
            <p className="text-default-500 mt-1">
              Fill in the details to create an attractive job listing
            </p>
          </div>
        </div>

        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 bg-gradient-to-r from-white to-gray-50">
          <CardHeader className="flex flex-col gap-2 items-center px-6 pt-6 pb-2">
            <div className="bg-primary-100 p-3 rounded-full">
              <Briefcase className="w-6 h-6 text-primary-500" />
            </div>
            <h2 className="text-xl font-bold">Job Details</h2>
            <p className="text-default-500 text-sm text-center">
              Create a compelling job listing to attract the best candidates
            </p>
          </CardHeader>
          <Divider className="my-2" />
          <CardBody className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Job Title"
                  placeholder="e.g., Senior Software Engineer"
                  value={formData.jobTitle}
                  onChange={(e) => handleChange("jobTitle", e.target.value)}
                  startContent={
                    <Briefcase className="w-4 h-4 text-default-400" />
                  }
                  variant="bordered"
                  classNames={{
                    label: "text-default-600 font-medium",
                  }}
                  isRequired
                />
                <Input
                  label="Openings"
                  type="number"
                  placeholder="e.g., 5"
                  value={formData.openings}
                  onChange={(e) => handleChange("openings", e.target.value)}
                  startContent={<Users className="w-4 h-4 text-default-400" />}
                  variant="bordered"
                  classNames={{
                    label: "text-default-600 font-medium",
                  }}
                  isRequired
                />

                <Input
                  label="Duration"
                  placeholder="e.g., 6 months"
                  value={formData.duration}
                  onChange={(e) => handleChange("duration", e.target.value)}
                  startContent={<Clock className="w-4 h-4 text-default-400" />}
                  variant="bordered"
                  classNames={{
                    label: "text-default-600 font-medium",
                  }}
                  isRequired
                />

                <Input
                  type="date"
                  label="Application Deadline"
                  placeholder="Select a date"
                  value={
                    formData.applicationDeadline
                      ? new Date(formData.applicationDeadline)
                          .toISOString()
                          .split("T")[0]
                      : ""
                  }
                  onChange={(e) =>
                    handleChange("applicationDeadline", e.target.value)
                  }
                  startContent={
                    <Calendar className="w-4 h-4 text-default-400" />
                  }
                  variant="bordered"
                  classNames={{
                    label: "text-default-600 font-medium",
                  }}
                />

                <Input
                  label="Department"
                  placeholder="e.g., Engineering"
                  value={formData.department}
                  onChange={(e) => handleChange("department", e.target.value)}
                  startContent={<Tag className="w-4 h-4 text-default-400" />}
                  variant="bordered"
                  classNames={{
                    label: "text-default-600 font-medium",
                  }}
                />

                <Input
                  label="Location"
                  placeholder="e.g., New York, NY"
                  value={formData.location}
                  onChange={(e) => handleChange("location", e.target.value)}
                  startContent={<MapPin className="w-4 h-4 text-default-400" />}
                  variant="bordered"
                  classNames={{
                    label: "text-default-600 font-medium",
                  }}
                  isRequired
                />

                <Select
                  label="Job Type"
                  placeholder="Select job type"
                  selectedKeys={[formData.jobType]}
                  onChange={(e) => handleChange("jobType", e.target.value)}
                  startContent={<Clock className="w-4 h-4 text-default-400" />}
                  variant="bordered"
                  classNames={{
                    label: "text-default-600 font-medium",
                  }}
                  isRequired
                >
                  {jobTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </Select>

                <Input
                  label="Salary Range"
                  placeholder="e.g., $80,000 - $100,000"
                  value={formData.salary}
                  onChange={(e) => handleChange("salary", e.target.value)}
                  startContent={
                    <DollarSign className="w-4 h-4 text-default-400" />
                  }
                  variant="bordered"
                  classNames={{
                    label: "text-default-600 font-medium",
                  }}
                />

                <Input
                  label="Skills Required"
                  placeholder="Add skills (separate with comma)"
                  value={formData.skillsRequired}
                  onChange={(e) => handleSkillsChange(e.target.value)}
                  startContent={<Code className="w-4 h-4 text-default-400" />}
                  variant="bordered"
                  classNames={{
                    label: "text-default-600 font-medium",
                  }}
                />
              </div>

              {skills.length > 0 && (
                <div className="flex flex-wrap gap-2 p-2 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="w-full mb-1 text-sm text-default-600 font-medium">
                    Required Skills:
                  </div>
                  {skills.map((skill, index) => (
                    <Chip
                      key={index}
                      onClose={() => removeSkill(skill)}
                      variant="flat"
                      color="primary"
                      className="shadow-sm"
                    >
                      {skill}
                    </Chip>
                  ))}
                </div>
              )}

              <Textarea
                label="Job Description"
                placeholder="Enter detailed job description"
                value={formData.jobDescription}
                onChange={(e) => handleChange("jobDescription", e.target.value)}
                variant="bordered"
                minRows={4}
                startContent={
                  <FileText className="w-4 h-4 text-default-400 absolute top-3" />
                }
                classNames={{
                  label: "text-default-600 font-medium",
                  input: "pl-8",
                }}
                isRequired
              />

              <div className="flex justify-center md:justify-end gap-3 pb-6 md:pb-0">
                <Button
                  type="submit"
                  color="primary"
                  size="lg"
                  className="font-semibold bg-gradient-to-r from-primary-600 to-primary-700 shadow-md"
                >
                  Post Job
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
