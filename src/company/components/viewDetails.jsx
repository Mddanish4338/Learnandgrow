import React, { useEffect, useState } from "react";

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
import { useNavigate, useParams } from "react-router-dom";
import useIsMobile from "../../hooks/useIsMobile";
import ApplicantsTable from "./applicantsTable";
import { getJobById } from "../../services/companyService";

const ViewDetails = () => {
  const { id } = useParams();
  const Navigate = useNavigate();
  const isMobile = useIsMobile();
  const [job, setJob] = useState();
  const [loading, setLoading] = useState();
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
  useEffect(() => {
    if (!id) return;

    const fetchJobProfile = async () => {
      setLoading(true);
      const jobData = await getJobById(id);
      if (jobData) {
        setJob(jobData);
      }
      setLoading(false);
    };

    fetchJobProfile();
  }, [job]);
  console.log(job);

  const statusColorMap = {
    New: "warning",
    Shortlisted: "success",
    Rejected: "danger",
  };
  const convertTimestampToDate = (timestamp) => {
    if (!timestamp?.seconds) return "Invalid Date";

    const date = new Date(timestamp.seconds * 1000);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
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
              <h1 className="text-3xl font-bold">{job?.jobTitle}</h1>
              <Chip color="success" variant="solid" className="ml-2">
                {job?.status}
              </Chip>
            </div>
            <div className="text-white/80 flex items-center gap-4 mt-2">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                <span>Posted: {convertTimestampToDate(job?.postedAt)}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                <span>Duration: {job?.duration}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid text-center grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-md border-none overflow-hidden">
          <CardBody className="flex items-center gap-4 p-4">
            <div className="p-3 bg-indigo-100 rounded-lg">
              <Users className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <p className="text-sm text-center text-gray-600 font-medium">
                Total Applicants
              </p>
              <p className="text-2xl text-center font-bold text-indigo-600">
                {job?.candidates?.length || 0}
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
              <p className="text-sm text-center text-gray-600 font-medium">
                New Applications
              </p>
              <p className="text-2xl text-center font-bold text-amber-600">
                {job?.candidates?.filter((c) => c.hiringStatus === "New")
                  .length || 0}
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
              <p className="text-sm text-center text-gray-600 font-medium">
                Shortlisted
              </p>
              <p className="text-2xl font-bold text-center text-emerald-600">
                {job?.candidates?.filter(
                  (c) => c.hiringStatus === "Shortlisted"
                ).length || 0}
              </p>
            </div>
          </CardBody>
        </Card>
        <Card className="shadow-md border-none overflow-hidden">
          <CardBody className="flex items-center gap-4 p-4">
            <div className="p-3 bg-rose-100 rounded-lg">
              <Clock className="w-6 h-6 text-rose-600" />
            </div>
            <div>
              <p className="text-sm text-center text-gray-600 font-medium">
                Rejected
              </p>
              <p className="text-2xl font-bold text-center text-rose-600">
                {job?.candidates?.filter((c) => c.hiringStatus === "Rejected")
                  .length || 0}
              </p>
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 ">
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
                  <p className="font-semibold">{job?.department}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-100 rounded-full">
                  <MapPin className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Location</p>
                  <p className="font-semibold">{job?.location}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-100 rounded-full">
                  <Briefcase className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Job Type</p>
                  <p className="font-semibold">{job?.jobType}</p>
                </div>
              </div>
              <Divider className="my-4" />
              <div className="bg-indigo-50 p-4 rounded-lg">
                <h3 className="font-bold text-indigo-800 mb-3">Requirements</h3>
                <ul className="space-y-2">
                  {job?.jobDescription
                    ?.split(".")
                    .map((req, index) => req.trim())
                    .filter((req) => req.length > 0)
                    .map((req, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="mt-1 min-w-4 h-4 rounded-full bg-indigo-200 flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-indigo-600"></div>
                        </div>
                        <span className="text-gray-700">{req}.</span>
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
            <CardBody className="p-6">
              {job?.candidates && job.candidates.length > 0 ? (
                <ApplicantsTable
                  applicants={job?.candidates}
                  isMobile={isMobile}
                  jobId={job.id}
                />
              ) : (
                <div className="flex flex-col items-center justify-center py-12 px-4">
                  <div className="relative w-40 h-40 mb-6">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full opacity-70 animate-pulse"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="80"
                        height="80"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary-500"
                      >
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                      </svg>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">
                    No Applicants Yet
                  </h3>

                  <p className="text-gray-500 text-center max-w-md mb-6">
                    Your job posting is waiting for the perfect candidates to
                    discover it. They'll appear here once they apply.
                  </p>

                  <div className="grid grid-cols-2 gap-6 w-full max-w-lg">
                    {[
                      { icon: "clock", text: "Be Patient" },
                      { icon: "refresh-cw", text: "Check Later" },
                    ].map((item, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 flex items-center justify-center mb-2 shadow-sm">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-primary-500"
                          >
                            {item.icon === "share-2" && (
                              <>
                                <circle cx="18" cy="5" r="3"></circle>
                                <circle cx="6" cy="12" r="3"></circle>
                                <circle cx="18" cy="19" r="3"></circle>
                                <line
                                  x1="8.59"
                                  y1="13.51"
                                  x2="15.42"
                                  y2="17.49"
                                ></line>
                                <line
                                  x1="15.41"
                                  y1="6.51"
                                  x2="8.59"
                                  y2="10.49"
                                ></line>
                              </>
                            )}
                            {item.icon === "clock" && (
                              <>
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="12 6 12 12 16 14"></polyline>
                              </>
                            )}
                            {item.icon === "refresh-cw" && (
                              <>
                                <polyline points="23 4 23 10 17 10"></polyline>
                                <polyline points="1 20 1 14 7 14"></polyline>
                                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
                              </>
                            )}
                          </svg>
                        </div>
                        <span className="text-xs text-gray-500">
                          {item.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ViewDetails;
