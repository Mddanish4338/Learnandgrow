import {
  Avatar,
  Button,
  Card,
  CardBody,
  Chip,
  Image,
  Input,
  Spinner,
  Tab,
  Tabs,
  Textarea,
} from "@nextui-org/react";
import {
  Briefcase,
  Camera,
  Edit2,
  Facebook,
  Globe,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
  User,
  BookOpen,
  Clock,
  Award,
} from "lucide-react";
import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import { getTeacherProfile, updateTeacherProfile } from "../../services/teacherService";

export default function MentorProfile() {
  const [selectedTab, setSelectedTab] = useState("about");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef(null);

  const { user } = useAuth();
  const [profile, setProfile] = useState({});
  const [image, setProfileImage] = useState("");

  console.log(user);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getTeacherProfile(user.uid);
        if (data) {
          console.log(data);
          setProfile(data);
          setProfileImage(data.image || "");
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user.uid]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditToggle = async () => {
    setIsEditing(!isEditing);
    
    if (isEditing) {
      const updatedProfile = {
        name: profile.name,
        expertise: profile.expertise,
        location: profile.location,
        experience: profile.experience,
        email: profile.email,
        phone: profile.phone,
        about: profile.about,
        availability: profile.availability,
        certifications: profile.certifications,
        socialLinks: profile.socialLinks,
        image: image,
      };

      const success = await updateTeacherProfile(user.uid, updatedProfile);

      if (success) {
        console.log("Profile updated successfully!");
      } else {
        console.log("Error updating profile.");
      }
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
    return     <div className="flex justify-center items-center h-screen">
    <Spinner size="lg" color="primary" />
  </div>
  }

  if (!profile) {
    return <div>Error: Profile not found.</div>;
  }

  return (
    <div className="max-w-7xl p-4 md:p-6 space-y-6 bg-gray-50 rounded-xl">
      <Card className="w-full border-none shadow-lg overflow-visible">
        <CardBody className="relative p-0">
          <div className="relative h-56 rounded-t-xl overflow-hidden mb-16">
            <div className="absolute inset-0 z-10 opacity-70" style={gradientStyle}></div>
            <Image
              src="/api/placeholder/1200/400"
              alt="Mentor cover"
              classNames={{ img: "object-cover w-full h-full" }}
            />
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
            <Button
              isIconOnly
              className="absolute top-4 right-4 z-20 bg-white/30 backdrop-blur-md"
              variant="flat"
              size="sm"
              onClick={() => fileInputRef.current.click()}
            >
              <Camera size={16} className="text-white" />
            </Button>
          </div>

          <div className="absolute top-36 left-6 flex items-end gap-4 z-20">
            <Avatar
              className="w-28 h-28 text-large border-4 border-white shadow-lg"
              src={image || "/api/placeholder/150/150"}
            />
            <div className="mb-2">
              <h1 className="text-2xl font-bold text-gray-800">{profile.name}</h1>
              <p className="text-indigo-600 font-medium">{profile.expertise}</p>
            </div>
          </div>

          <div className="flex justify-end mt-4 p-4">
            <Button
              color={isEditing ? "success" : "primary"}
              variant={isEditing ? "solid" : "flat"}
              startContent={isEditing ? undefined : <Edit2 size={16} />}
              onPress={handleEditToggle}
              className={isEditing ? "bg-emerald-500" : "bg-indigo-500 text-white"}
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
              <User size={16} />
              <span>About</span>
            </div>
          }
        >
          <Card className="mt-4 shadow-md border-none">
            <CardBody className="space-y-6 p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Input
                    label="Full Name"
                    value={profile.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    readOnly={!isEditing}
                    variant="bordered"
                    className="bg-white"
                    classNames={{
                      label: "text-indigo-600 font-medium",
                      input: "text-gray-800",
                    }}
                    startContent={<User className="text-indigo-400" size={16} />}
                  />
                  <Input
                    label="Expertise"
                    value={profile.expertise}
                    onChange={(e) =>
                      handleInputChange("expertise", e.target.value)
                    }
                    readOnly={!isEditing}
                    variant="bordered"
                    className="bg-white"
                    classNames={{
                      label: "text-indigo-600 font-medium",
                      input: "text-gray-800",
                    }}
                    startContent={
                      <Briefcase className="text-indigo-400" size={16} />
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
                </div>
                <div className="space-y-4">
                  <Input
                    label="Experience"
                    value={profile.experience}
                    onChange={(e) =>
                      handleInputChange("experience", e.target.value)
                    }
                    readOnly={!isEditing}
                    variant="bordered"
                    className="bg-white"
                    classNames={{
                      label: "text-indigo-600 font-medium",
                      input: "text-gray-800",
                    }}
                    startContent={<Award className="text-indigo-400" size={16} />}
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
                label="About Mentor"
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

{/* <div className="bg-indigo-50 p-4 rounded-lg">
  <h3 className="text-lg font-semibold mb-3 text-indigo-700">Availability</h3>
  {isEditing ? (
    <textarea
      className="w-full p-2 border border-indigo-300 rounded-lg"
      value={profile.availability?.join(", ") || ""}
      onChange={(e) =>
        setProfile({ ...profile, availability: e.target.value.split(", ") })
      }
      placeholder="Enter availability (e.g., Monday, Tuesday)"
    />
  ) : (
    <div className="flex flex-wrap gap-2">
      {profile?.availability?.length > 0 ? (
        profile.availability.map((day, index) => (
          <Chip
            key={index}
            variant="flat"
            className="bg-indigo-100 text-indigo-700 font-medium"
          >
            {day}
          </Chip>
        ))
      ) : (
        <p className="text-indigo-500">No availability information</p>
      )}
    </div>
  )}
</div>

<div className="bg-indigo-50 p-4 rounded-lg">
  <h3 className="text-lg font-semibold mb-3 text-indigo-700">Certifications</h3>
  {isEditing ? (
    <textarea
      className="w-full p-2 border border-indigo-300 rounded-lg"
      value={profile.certifications?.join(", ") || ""}
      onChange={(e) =>
        setProfile({ ...profile, certifications: e.target.value.split(", ") })
      }
      placeholder="Enter certifications (e.g., Java, Python)"
    />
  ) : (
    <div className="flex flex-wrap gap-2">
      {profile?.certifications?.length > 0 ? (
        profile.certifications.map((certification, index) => (
          <Chip
            key={index}
            variant="flat"
            className="bg-indigo-100 text-indigo-700 font-medium"
          >
            {certification}
          </Chip>
        ))
      ) : (
        <p className="text-indigo-500">No certifications available</p>
      )}
    </div>
  )}
</div> */}


<div className="bg-indigo-50 p-4 rounded-lg">
  <h3 className="text-lg font-semibold mb-3 text-indigo-700">Availability</h3>
  {isEditing ? (
    <div className="flex flex-wrap gap-2">
      {profile.availability?.map((day, index) => (
        <input
          key={index}
          type="text"
          className="w-full p-2 border border-indigo-300 rounded-lg"
          value={day}
          onChange={(e) => {
            const updatedAvailability = [...profile.availability];
            updatedAvailability[index] = e.target.value;
            setProfile({ ...profile, availability: updatedAvailability });
          }}
          placeholder="Enter availability"
        />
      ))}
      <button
        onClick={() =>
          setProfile({ ...profile, availability: [...(profile.availability || []), ""] })
        }
        className="text-indigo-600 hover:underline"
      >
        + Add More
      </button>
    </div>
  ) : (
    <div className="flex flex-wrap gap-2">
      {profile.availability?.length > 0 ? (
        profile.availability.map((day, index) => (
          <Chip key={index} variant="flat" className="bg-indigo-100 text-indigo-700 font-medium">
            {day}
          </Chip>
        ))
      ) : (
        <p className="text-indigo-500">No availability information</p>
      )}
    </div>
  )}
</div>

<div className="bg-indigo-50 p-4 rounded-lg">
  <h3 className="text-lg font-semibold mb-3 text-indigo-700">Certifications</h3>
  {isEditing ? (
    <div className="flex flex-wrap gap-2">
      {profile.certifications?.map((certification, index) => (
        <input
          key={index}
          type="text"
          className="w-full p-2 border border-indigo-300 rounded-lg"
          value={certification}
          onChange={(e) => {
            const updatedCertifications = [...profile.certifications];
            updatedCertifications[index] = e.target.value;
            setProfile({ ...profile, certifications: updatedCertifications });
          }}
          placeholder="Enter certification"
        />
      ))}
      <button
        onClick={() =>
          setProfile({ ...profile, certifications: [...(profile.certifications || []), ""] })
        }
        className="text-indigo-600 hover:underline"
      >
        + Add More
      </button>
    </div>
  ) : (
    <div className="flex flex-wrap gap-2">
      {profile.certifications?.length > 0 ? (
        profile.certifications.map((certification, index) => (
          <Chip key={index} variant="flat" className="bg-indigo-100 text-indigo-700 font-medium">
            {certification}
          </Chip>
        ))
      ) : (
        <p className="text-indigo-500">No certifications available</p>
      )}
    </div>
  )}
</div>



            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
}
