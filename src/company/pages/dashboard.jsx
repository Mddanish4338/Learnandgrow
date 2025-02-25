import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Progress,
} from "@nextui-org/react";
import {
  ArrowRight,
  BarChart2,
  Briefcase,
  Clock,
  TrendingUp,
  UserCheck,
  Users,
} from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const StatCard = ({
  title,
  value,
  icon: Icon,
  description,
  trend,
  color = "default",
}) => {
  const gradients = {
    primary: "bg-gradient-to-r from-blue-500/10 to-blue-600/5",
    success: "bg-gradient-to-r from-green-500/10 to-green-600/5",
    warning: "bg-gradient-to-r from-orange-500/10 to-orange-600/5",
    secondary: "bg-gradient-to-r from-purple-500/10 to-purple-600/5",
    default: "bg-gradient-to-r from-gray-100 to-gray-50",
  };

  const iconColors = {
    primary: "text-blue-500",
    success: "text-green-500",
    warning: "text-orange-500",
    secondary: "text-purple-500",
    default: "text-default-400",
  };

  return (
    <Card
      className={`w-full overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 ${gradients[color]}`}
    >
      <CardBody className="gap-2 p-4">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <span className="text-default-600 text-sm font-medium">
              {title}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold">{value}</span>
              {trend && (
                <Chip
                  color="success"
                  variant="flat"
                  size="sm"
                  className="h-6"
                  classNames={{
                    base: "w-[100px]",
                    content: "w-[150px], flex items-center justify-center",
                  }}
                >
                  <TrendingUp size={12} className="mr-1" />
                  {trend}
                </Chip>
              )}
            </div>
          </div>
          <div
            className={`rounded-full p-2 ${
              color !== "default" ? "bg-white/90" : "bg-primary-50"
            }`}
          >
            <Icon className={`h-6 w-6 ${iconColors[color]}`} />
          </div>
        </div>
        <p className="text-default-500 text-sm mt-1">{description}</p>
      </CardBody>
    </Card>
  );
};

const JobPerformanceCard = ({ title, applicants, value, color }) => (
  <div className="space-y-2 bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <span className={`w-2 h-8 rounded-full bg-${color}-500`}></span>
        <span className="text-sm font-medium">{title}</span>
      </div>
      <Chip size="sm" variant="flat" color="primary">
        {applicants} Applicants
      </Chip>
    </div>
    <Progress
      value={value}
      color={color}
      size="sm"
      radius="sm"
      className="mt-2"
    />
  </div>
);

const DashBoard = () => {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <div className="p-3 md:p-8 max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-primary-500 to-primary-800 bg-clip-text text-transparent">
              Company Dashboard
            </h1>
            <p className="text-default-500 mt-1">
              Welcome back! Here's what's happening with your jobs today.
            </p>
          </div>
          <Button
            as={Link}
            to="/company-panel/post-job"
            color="primary"
            size="lg"
            endContent={<ArrowRight size={16} />}
            className="shadow-md"
          >
            Post New Job
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <StatCard
            title="Active Jobs"
            value="5"
            icon={Briefcase}
            description="Currently active job postings"
            trend="+2 this week"
            color="primary"
          />
          <StatCard
            title="Total Applicants"
            value="25"
            icon={Users}
            description="Applicants across all positions"
            trend="+8 new"
            color="success"
          />
          <StatCard
            title="Closing Soon"
            value="3"
            icon={Clock}
            description="Jobs closing in 48 hours"
            color="warning"
          />
          <StatCard
            title="Average Response"
            value="85%"
            icon={BarChart2}
            description="Application response rate"
            trend="+5%"
            color="secondary"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          <Card className="lg:col-span-2 shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardHeader className="flex gap-2 px-6 pt-6">
              <div className="bg-primary-100 p-2 rounded-lg">
                <BarChart2 className="h-5 w-5 text-primary-500" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Top Performing Jobs</h3>
                <p className="text-default-500 text-sm">
                  Application metrics for your active positions
                </p>
              </div>
            </CardHeader>
            <CardBody className="gap-4 px-6 pb-6">
              <JobPerformanceCard
                title="Senior Developer"
                applicants="15"
                value={75}
                color="success"
              />
              <JobPerformanceCard
                title="UX Designer"
                applicants="12"
                value={60}
                color="primary"
              />
              <JobPerformanceCard
                title="Marketing Specialist"
                applicants="8"
                value={40}
                color="warning"
              />
            </CardBody>
          </Card>

          <div className="flex flex-col gap-6">
            <Card className="shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardHeader className="flex gap-2 px-6 pt-6">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <UserCheck className="h-5 w-5 text-blue-500" />
                </div>
                <span className="font-bold text-lg">Profile Completion</span>
              </CardHeader>
              <CardBody className="gap-4 px-6 pb-6">
                <Progress
                  value={80}
                  color="primary"
                  size="md"
                  radius="sm"
                  className="w-full"
                  showValueLabel={true}
                />
                <div className="flex justify-between items-center">
                  <span className="text-default-500 text-sm">80% complete</span>
                  <Button
                    as={Link}
                    to="/profile"
                    size="sm"
                    color="primary"
                    variant="flat"
                    className="font-medium"
                  >
                    Complete Profile
                  </Button>
                </div>
              </CardBody>
            </Card>

            <Card className="bg-gradient-to-r from-primary-600 to-primary-800 text-white shadow-md">
              <CardBody className="p-6">
                <h3 className="text-lg font-bold mb-2">Need Help?</h3>
                <p className="text-white/80 text-sm mb-4">
                  Our team is ready to assist you with your recruitment process.
                </p>
                <Button
                  as={Link}
                  to="/support"
                  color="primary"
                  variant="solid"
                  className="bg-white text-primary-700 font-medium w-full shadow-lg hover:shadow-xl transition-shadow"
                >
                  Contact Support
                </Button>
              </CardBody>
            </Card>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-4 pb-14 md:pb-4">
          <Button
            as={Link}
            to="/company-panel/manage-jobs"
            variant="bordered"
            color="primary"
            startContent={<Briefcase size={16} />}
            className="border-2 font-medium shadow-sm"
          >
            Manage Jobs
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
