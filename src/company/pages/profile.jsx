import {
  Avatar,
  Button,
  Card,
  CardBody,
  Chip,
  Image,
  Input,
  Tab,
  Tabs,
  Textarea,
} from "@nextui-org/react";
import {
  Briefcase,
  Building2,
  Camera,
  Edit2,
  Facebook,
  Globe,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Users,
} from "lucide-react";
import React, { useState } from "react";

export default function Profile() {
  const [selectedTab, setSelectedTab] = useState("about");
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: "TechCorp Solutions",
    industry: "Information Technology",
    size: "500-1000 employees",
    location: "New York, NY",
    website: "www.techcorp.com",
    email: "careers@techcorp.com",
    phone: "+1 (555) 123-4567",
    about:
      "TechCorp Solutions is a leading provider of innovative technology solutions. We specialize in software development, cloud computing, and digital transformation services for enterprises worldwide.",
    benefits: [
      "Health Insurance",
      "401(k) Plan",
      "Remote Work Options",
      "Professional Development",
      "Flexible Hours",
      "Gym Membership",
    ],
    socialLinks: {
      facebook: "facebook.com/techcorp",
      twitter: "twitter.com/techcorp",
      linkedin: "linkedin.com/company/techcorp",
    },
  });

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      // Save changes logic would go here
      console.log("Saving profile changes:", profile);
    }
  };

  const handleInputChange = (field, value) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSocialChange = (platform, value) => {
    setProfile((prev) => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value,
      },
    }));
  };

  const gradientStyle = {
    background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
  };

  return (
    <div className="max-w-7xl p-4 md:p-6 space-y-6 bg-gray-50 rounded-xl">
      <Card className="w-full border-none shadow-lg overflow-visible">
        <CardBody className="relative p-0">
          <div className="relative h-56 rounded-t-xl overflow-hidden mb-16">
            <div
              className="absolute inset-0 z-10 opacity-70"
              style={gradientStyle}
            ></div>
            <Image
              src="/api/placeholder/1200/400"
              alt="Company cover"
              classNames={{
                img: "object-cover w-full h-full",
              }}
            />
            <Button
              isIconOnly
              className="absolute top-4 right-4 z-20 bg-white/30 backdrop-blur-md"
              variant="flat"
              size="sm"
            >
              <Camera size={16} className="text-white" />
            </Button>
          </div>

          <div className="absolute top-36 left-6 flex items-end gap-4 z-20">
            <Avatar
              className="w-28 h-28 text-large border-4 border-white shadow-lg"
              src="/api/placeholder/150/150"
            />
            <div className="mb-2">
              <h1 className="text-2xl font-bold text-gray-800">
                {profile.name}
              </h1>
              <p className="text-indigo-600 font-medium">{profile.industry}</p>
            </div>
          </div>

          <div className="flex justify-end mt-4 p-4">
            <Button
              color={isEditing ? "success" : "primary"}
              variant={isEditing ? "solid" : "flat"}
              startContent={isEditing ? undefined : <Edit2 size={16} />}
              onPress={handleEditToggle}
              className={
                isEditing ? "bg-emerald-500" : "bg-indigo-500 text-white"
              }
            >
              {isEditing ? "Save Changes" : "Edit Profile"}
            </Button>
          </div>
        </CardBody>
      </Card>

      <Tabs
        selectedKey={selectedTab}
        onSelectionChange={setSelectedTab}
        variant="underlined"
        classNames={{
          tabList: "gap-6",
          cursor: "w-full bg-indigo-500",
          tab: "data-[selected=true]:text-indigo-500 font-medium",
        }}
      >
        <Tab
          key="about"
          title={
            <div className="flex items-center gap-2">
              <Building2 size={16} />
              <span>About</span>
            </div>
          }
        >
          <Card className="mt-4 shadow-md border-none">
            <CardBody className="space-y-6 p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Input
                    label="Company Name"
                    value={profile.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    readOnly={!isEditing}
                    variant="bordered"
                    className="bg-white"
                    classNames={{
                      label: "text-indigo-600 font-medium",
                      input: "text-gray-800",
                    }}
                    startContent={
                      <Building2 className="text-indigo-400" size={16} />
                    }
                  />
                  <Input
                    label="Location"
                    value={profile.location}
                    onChange={(e) =>
                      handleInputChange("location", e.target.value)
                    }
                    readOnly={!isEditing}
                    variant="bordered"
                    className="bg-white"
                    classNames={{
                      label: "text-indigo-600 font-medium",
                      input: "text-gray-800",
                    }}
                    startContent={
                      <MapPin className="text-indigo-400" size={16} />
                    }
                  />
                  <Input
                    label="Website"
                    value={profile.website}
                    onChange={(e) =>
                      handleInputChange("website", e.target.value)
                    }
                    readOnly={!isEditing}
                    variant="bordered"
                    className="bg-white"
                    classNames={{
                      label: "text-indigo-600 font-medium",
                      input: "text-gray-800",
                    }}
                    startContent={
                      <Globe className="text-indigo-400" size={16} />
                    }
                  />
                </div>
                <div className="space-y-4">
                  <Input
                    label="Company Size"
                    value={profile.size}
                    onChange={(e) => handleInputChange("size", e.target.value)}
                    readOnly={!isEditing}
                    variant="bordered"
                    className="bg-white"
                    classNames={{
                      label: "text-indigo-600 font-medium",
                      input: "text-gray-800",
                    }}
                    startContent={
                      <Users className="text-indigo-400" size={16} />
                    }
                  />
                  <Input
                    label="Email"
                    value={profile.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    readOnly={!isEditing}
                    variant="bordered"
                    className="bg-white"
                    classNames={{
                      label: "text-indigo-600 font-medium",
                      input: "text-gray-800",
                    }}
                    startContent={
                      <Mail className="text-indigo-400" size={16} />
                    }
                  />
                  <Input
                    label="Phone"
                    value={profile.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    readOnly={!isEditing}
                    variant="bordered"
                    className="bg-white"
                    classNames={{
                      label: "text-indigo-600 font-medium",
                      input: "text-gray-800",
                    }}
                    startContent={
                      <Phone className="text-indigo-400" size={16} />
                    }
                  />
                </div>
              </div>

              <Textarea
                label="About Company"
                value={profile.about}
                onChange={(e) => handleInputChange("about", e.target.value)}
                readOnly={!isEditing}
                variant="bordered"
                className="bg-white"
                classNames={{
                  label: "text-indigo-600 font-medium",
                  input: "text-gray-800",
                }}
                minRows={4}
              />

              <div className="bg-indigo-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 text-indigo-700">
                  Employee Benefits
                </h3>
                <div className="flex flex-wrap gap-2">
                  {profile.benefits.map((benefit, index) => (
                    <Chip
                      key={index}
                      variant="flat"
                      className="bg-indigo-100 text-indigo-700 font-medium"
                    >
                      {benefit}
                    </Chip>
                  ))}
                </div>
              </div>
            </CardBody>
          </Card>
        </Tab>

        <Tab
          key="jobs"
          title={
            <div className="flex items-center gap-2">
              <Briefcase size={16} />
              <span>Active Jobs</span>
            </div>
          }
        >
          <Card className="mt-4 shadow-md border-none">
            <CardBody>
              <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-lg">
                <Briefcase size={48} className="mx-auto mb-4 text-indigo-300" />
                <p className="text-lg">No active job postings</p>
              </div>
            </CardBody>
          </Card>
        </Tab>

        <Tab
          key="social"
          title={
            <div className="flex items-center gap-2">
              <Globe size={16} />
              <span>Social</span>
            </div>
          }
        >
          <Card className="mt-4 shadow-md border-none">
            <CardBody className="space-y-4 p-6">
              <Input
                label="Facebook"
                value={profile.socialLinks.facebook}
                onChange={(e) => handleSocialChange("facebook", e.target.value)}
                readOnly={!isEditing}
                variant="bordered"
                className="bg-white"
                classNames={{
                  label: "text-indigo-600 font-medium",
                  input: "text-gray-800",
                }}
                startContent={<Facebook className="text-blue-500" size={16} />}
              />
              <Input
                label="Twitter"
                value={profile.socialLinks.twitter}
                onChange={(e) => handleSocialChange("twitter", e.target.value)}
                readOnly={!isEditing}
                variant="bordered"
                className="bg-white"
                classNames={{
                  label: "text-indigo-600 font-medium",
                  input: "text-gray-800",
                }}
                startContent={<Twitter className="text-sky-500" size={16} />}
              />
              <Input
                label="LinkedIn"
                value={profile.socialLinks.linkedin}
                onChange={(e) => handleSocialChange("linkedin", e.target.value)}
                readOnly={!isEditing}
                variant="bordered"
                className="bg-white"
                classNames={{
                  label: "text-indigo-600 font-medium",
                  input: "text-gray-800",
                }}
                startContent={<Linkedin className="text-blue-700" size={16} />}
              />
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
}
