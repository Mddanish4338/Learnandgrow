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
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Spinner,
  cn,
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
  Check,
  X,
  LogOut,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  getCompanyById,
  updateCompanyProfile,
} from "../../services/companyService";
import EmployeeBenefitsSection from "../components/employeeBenefitSection";
import { Link } from "react-router-dom";

export default function Profile() {
  const [selectedTab, setSelectedTab] = useState("about");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [originalProfile, setOriginalProfile] = useState(null);
  const { user, logout } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (!user?.uid) return;

    const fetchProfile = async () => {
      setLoading(true);
      const companyData = await getCompanyById(user?.uid);
      if (companyData) {
        setProfile(companyData);
        setOriginalProfile(JSON.parse(JSON.stringify(companyData))); // Deep copy
        console.log(companyData);
      }
      setLoading(false);
    };

    fetchProfile();
  }, [user?.uid]);

  const handleEditToggle = () => {
    if (isEditing) {
      onOpen();
    } else {
      setIsEditing(true);
    }
  };

  const handleCancelEdit = () => {
    setProfile(JSON.parse(JSON.stringify(originalProfile)));
    setIsEditing(false);
  };

  const handleSaveChanges = async () => {
    setIsSaving(true);
    onClose();

    try {
      const updatedData = {};
      Object.keys(profile).forEach((key) => {
        if (profile[key] !== null && profile[key] !== undefined) {
          if (
            typeof profile[key] === "object" &&
            !Array.isArray(profile[key])
          ) {
            updatedData[key] = {};
            Object.keys(profile[key]).forEach((nestedKey) => {
              if (
                profile[key][nestedKey] !== null &&
                profile[key][nestedKey] !== undefined
              ) {
                updatedData[key][nestedKey] = profile[key][nestedKey];
              }
            });
          } else {
            updatedData[key] = profile[key];
          }
        }
      });

      const success = await updateCompanyProfile(user.uid, updatedData);
      if (success) {
        setOriginalProfile(JSON.parse(JSON.stringify(profile)));
        console.log("Profile updated successfully");
      } else {
        console.error("Failed to update profile");
        setProfile(JSON.parse(JSON.stringify(originalProfile)));
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      setProfile(JSON.parse(JSON.stringify(originalProfile)));
    } finally {
      setIsSaving(false);
      setIsEditing(false);
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex justify-center items-center h-64">
        Profile not found
      </div>
    );
  }

  return (
    <div className="max-w-7xl md:p-6 space-y-6 bg-gray-50 rounded-xl">
      <Card className="w-full border-none shadow-lg overflow-visible">
        <CardBody className="relative p-0">
          <div className="relative h-56 rounded-t-xl overflow-hidden mb-16">
            <div
              className="absolute inset-0 z-10 opacity-70"
              style={gradientStyle}
            ></div>
            <Image
              src={profile?.coverImage || ""}
              alt="Company cover"
              classNames={{
                img: "object-cover w-full h-full",
              }}
            />
            {isEditing && (
              <Button
                isIconOnly
                className="absolute top-4 right-4 z-20 bg-white/30 backdrop-blur-md"
                variant="flat"
                size="sm"
              >
                <Camera size={16} className="text-white" />
              </Button>
            )}
          </div>

          <div className="absolute top-36 left-6 flex items-end gap-4 z-20">
            <img
              className="w-28 h-28 rounded-full text-large border-4 border-white shadow-lg"
              src={profile?.logo || "https://via.placeholder.com/112"}
              alt={profile?.name || "Company logo"}
            />
            <div className="mb-2">
              <h1 className="text-2xl font-bold text-gray-800">
                {profile?.name || "Company Name"}
              </h1>
              <p className="text-indigo-600 font-medium">
                {profile?.industry || ""}
              </p>
            </div>
          </div>

          <div className="flex justify-end mt-4 p-4 gap-2">
            {isEditing ? (
              <div className="flex gap-2">
                <Button
                  color="danger"
                  variant="flat"
                  startContent={<X size={16} />}
                  onPress={handleCancelEdit}
                >
                  Cancel
                </Button>
                <Button
                  color="success"
                  variant="solid"
                  startContent={<Check size={16} />}
                  onPress={handleEditToggle}
                  isLoading={isSaving}
                  className="bg-emerald-500 text-white"
                >
                  Save Changes
                </Button>
              </div>
            ) : (
              <Button
                color="primary"
                variant="flat"
                startContent={<Edit2 size={16} />}
                onPress={handleEditToggle}
                className="bg-indigo-500 text-white"
              >
                Edit Profile
              </Button>
            )}
            <Button
              as={Link}
              to="/"
              variant="light"
              color="danger"
              className={cn(
                "justify-start gap-2 hover:bg-danger/10 transition-colors"
              )}
              startContent={<LogOut size={20} />}
              onPress={() => logout()}
            >
              Logout
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
                    value={profile?.name || ""}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    isReadOnly={!isEditing}
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
                    placeholder="Add location"
                    value={profile?.location || ""}
                    onChange={(e) =>
                      handleInputChange("location", e.target.value)
                    }
                    isReadOnly={!isEditing}
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
                    value={profile?.website || ""}
                    placeholder="Add a link to your website"
                    onChange={(e) =>
                      handleInputChange("website", e.target.value)
                    }
                    isReadOnly={!isEditing}
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
                    value={profile?.size || ""}
                    onChange={(e) => handleInputChange("size", e.target.value)}
                    isReadOnly={!isEditing}
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
                    value={profile?.email || ""}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    isReadOnly={!isEditing}
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
                    value={profile?.phone || ""}
                    placeholder="Add your phone number"
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    isReadOnly={!isEditing}
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
                value={profile?.description || ""}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                isReadOnly={!isEditing}
                variant="bordered"
                className="bg-white"
                classNames={{
                  label: "text-indigo-600 font-medium",
                  input: "text-gray-800",
                }}
                minRows={4}
              />

              <EmployeeBenefitsSection profile={profile} />
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
                value={profile?.socialLinks?.facebook || ""}
                placeholder="Add facebook url"
                onChange={(e) => handleSocialChange("facebook", e.target.value)}
                isReadOnly={!isEditing}
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
                value={profile?.socialLinks?.twitter || ""}
                placeholder="Add twitter url"
                onChange={(e) => handleSocialChange("twitter", e.target.value)}
                isReadOnly={!isEditing}
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
                value={profile?.socialLinks?.linkedin || ""}
                placeholder="Add linkedin url"
                onChange={(e) => handleSocialChange("linkedin", e.target.value)}
                isReadOnly={!isEditing}
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

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Confirm Changes
          </ModalHeader>
          <ModalBody>
            <p>
              Are you sure you want to save these changes to your company
              profile?
            </p>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Cancel
            </Button>
            <Button
              color="success"
              onPress={handleSaveChanges}
              className="bg-emerald-500 text-white"
            >
              Save Changes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
