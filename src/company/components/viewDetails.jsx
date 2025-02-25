import React from "react";

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Divider,
} from "@nextui-org/react";
import {
  AlertCircle,
  CheckCircle2,
  ChevronLeft,
  Clock,
  MapPin,
  Briefcase,
  Calendar,
  Users,
  Building,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import useIsMobile from "../../hooks/useIsMobile";
import ApplicantsTable from "./applicantsTable";

const ViewDetails = () => {
  const Navigate = useNavigate();
  const isMobile = useIsMobile();
  const jobDetails = {
    id: "JOB123",
    title: "Senior Software Engineer",
    department: "Engineering",
    location: "New York, NY",
    type: "Full-time",
    posted: "2024-02-15",
    status: "Active",
    totalApplicants: 45,
    newApplicants: 12,
    description: [
      "Design and implement scalable software solutions",
      "Collaborate with cross-functional teams",
      "Mentor junior developers",
      "Participate in code reviews and technical discussions",
    ],
    requirements: [
      "Bachelor's degree in Computer Science or related field",
      "3+ years of experience with React and Node.js",
      "Strong understanding of cloud architecture",
      "Excellent problem-solving skills",
    ],
  };

  const applicants = [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@email.com",
      appliedDate: "2024-02-16",
      experience: "4 years",
      status: "New",
      resumeUrl: "#",
      avatar:
        "https://static.vecteezy.com/system/resources/previews/021/548/095/original/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg",
      skills: ["React", "Node.js", "TypeScript"],
      summary:
        "Full-stack developer with 4 years of experience building scalable web applications.",
      education: "B.S. Computer Science, MIT",
      phone: "+1 (555) 123-4567",
      location: "Boston, MA",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      appliedDate: "2024-02-15",
      experience: "5 years",
      status: "Shortlisted",
      resumeUrl: "#",
      avatar:
        "https://static.vecteezy.com/system/resources/previews/021/548/095/original/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg",
      skills: ["React", "AWS", "Python"],
      summary:
        "Senior frontend developer with expertise in modern JS frameworks and cloud architecture.",
      education: "M.S. Software Engineering, Stanford",
      phone: "+1 (555) 987-6543",
      location: "San Francisco, CA",
    },
    {
      id: 3,
      name: "Mike Wilson",
      email: "mike.w@email.com",
      appliedDate: "2024-02-14",
      experience: "3 years",
      status: "Rejected",
      resumeUrl: "#",
      avatar:
        "https://static.vecteezy.com/system/resources/previews/021/548/095/original/default-profile-picture-avatar-user-avatar-icon-person-icon-head-icon-profile-picture-icons-default-anonymous-user-male-and-female-businessman-photo-placeholder-social-network-avatar-portrait-free-vector.jpg",
      skills: ["Angular", "Java", "SQL"],
      summary: "Fullstack engineer with background in enterprise applications.",
      education: "B.S. Information Technology, Georgia Tech",
      phone: "+1 (555) 234-5678",
      location: "Atlanta, GA",
    },
  ];

  const statusColorMap = {
    New: "warning",
    Shortlisted: "success",
    Rejected: "danger",
    "Under Review": "primary",
  };

  const gradientOverlay = {
    background: "linear-gradient(120deg, #4f46e5 0%, #7c3aed 100%)",
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 p-4 bg-gray-50 rounded-xl">
      <div className="rounded-xl p-6 text-white mb-8" style={gradientOverlay}>
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <Button
                isIconOnly
                variant="flat"
                radius="full"
                size="sm"
                className="bg-white/20 backdrop-blur-sm text-white"
                onPress={() => Navigate(-1)}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <h1 className="text-3xl font-bold">{jobDetails.title}</h1>
              <Chip color="success" variant="solid" className="ml-2">
                {jobDetails.status}
              </Chip>
            </div>
            <div className="text-white/80 flex items-center gap-4 mt-2">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                <span>
                  Posted: {new Date(jobDetails.posted).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center">
                <Briefcase className="w-4 h-4 mr-1" />
                <span>Job ID: {jobDetails.id}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-md border-none overflow-hidden">
          <CardBody className="flex items-center gap-4 p-4">
            <div className="p-3 bg-indigo-100 rounded-lg">
              <Users className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium">
                Total Applicants
              </p>
              <p className="text-2xl font-bold text-indigo-600">
                {jobDetails.totalApplicants}
              </p>
            </div>
          </CardBody>
        </Card>
        <Card className="shadow-md border-none overflow-hidden">
          <CardBody className="flex items-center gap-4 p-4">
            <div className="p-3 bg-amber-100 rounded-lg">
              <AlertCircle className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium">
                New Applications
              </p>
              <p className="text-2xl font-bold text-amber-600">
                {jobDetails.newApplicants}
              </p>
            </div>
          </CardBody>
        </Card>
        <Card className="shadow-md border-none overflow-hidden">
          <CardBody className="flex items-center gap-4 p-4">
            <div className="p-3 bg-emerald-100 rounded-lg">
              <CheckCircle2 className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium">Shortlisted</p>
              <p className="text-2xl font-bold text-emerald-600">8</p>
            </div>
          </CardBody>
        </Card>
        <Card className="shadow-md border-none overflow-hidden">
          <CardBody className="flex items-center gap-4 p-4">
            <div className="p-3 bg-rose-100 rounded-lg">
              <Clock className="w-6 h-6 text-rose-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium">Under Review</p>
              <p className="text-2xl font-bold text-rose-600">15</p>
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-6">
          <Card className="shadow-md border-none overflow-hidden">
            <CardHeader className="bg-indigo-50 border-b border-indigo-100">
              <h2 className="text-xl font-bold text-indigo-800">Job Details</h2>
            </CardHeader>
            <CardBody className="space-y-4 p-5">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-100 rounded-full">
                  <Building className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">
                    Department
                  </p>
                  <p className="font-semibold">{jobDetails.department}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-100 rounded-full">
                  <MapPin className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Location</p>
                  <p className="font-semibold">{jobDetails.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-100 rounded-full">
                  <Briefcase className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Job Type</p>
                  <p className="font-semibold">{jobDetails.type}</p>
                </div>
              </div>
              <Divider className="my-4" />
              <div className="bg-indigo-50 p-4 rounded-lg">
                <h3 className="font-bold text-indigo-800 mb-3">Requirements</h3>
                <ul className="space-y-2">
                  {jobDetails.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="mt-1 min-w-4 h-4 rounded-full bg-indigo-200 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-indigo-600"></div>
                      </div>
                      <span className="text-gray-700">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardBody>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card className="shadow-md border-none overflow-hidden">
            <CardHeader className="bg-indigo-50 border-b border-indigo-100 flex justify-between items-center">
              <h2 className="text-xl font-bold text-indigo-800">
                Recent Applicants
              </h2>
            </CardHeader>
            <CardBody className="p-0">
              {" "}
              <ApplicantsTable applicants={applicants} isMobile={isMobile} />
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ViewDetails;
