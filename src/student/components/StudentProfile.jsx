import {
  Avatar,
  Button,
  Card,
  CardBody,
  Chip,
  Input,
  Tab,
  Tabs,
} from "@nextui-org/react";
import { Edit2, Plus, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { getStudentById, updateStudentProfile } from "../../services/studentService";
import { useAuth } from "../../context/AuthContext";

export default function StudentProfile() {
  const [selectedTab, setSelectedTab] = useState("about");
  const [isEditing, setIsEditing] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await getStudentById(user.uid);
      if (data) {
        setProfile(data);
      }
      setLoading(false);
    };

    fetchProfile();
  }, [user.uid]);

  if (loading) {
    return <div className="text-center text-lg">Loading profile...</div>;
  }

  if (!profile) {
    return <div className="text-center text-red-500">Failed to load profile.</div>;
  }

  // Toggle Edit Mode & Save Changes
  const handleEditToggle = async () => {
    if (isEditing) {
      await updateStudentProfile(user.uid, profile);
    }
    setIsEditing(!isEditing);
  };

  // Handle Input Changes for Text Fields
  const handleInputChange = (field, value) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle Input Changes for Nested Fields (Education)
  const handleNestedInputChange = (field, value) => {
    setProfile((prev) => ({
      ...prev,
      education: {
        ...prev.education,
        [field]: value,
      },
    }));
  };

  // Handle Skill Input
  const handleSkillChange = (e) => setNewSkill(e.target.value);

  // Add Skill
  const addSkill = () => {
    if (newSkill.trim() !== "") {
      setProfile((prev) => ({
        ...prev,
        skills: [...(prev.skills || []), newSkill], // Ensure skills is an array
      }));
      setNewSkill("");
    }
  };

  // Remove Skill
  const removeSkill = (skillToRemove) => {
    setProfile((prev) => ({
      ...prev,
      skills: (prev.skills || []).filter((skill) => skill !== skillToRemove),
    }));
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 space-y-6">
      <Card>
        <CardBody className="text-center">
          <Avatar className="w-24 h-24 mx-auto" src={profile.profileImage || "https://avatar.iran.liara.run/public/38"} />
          
          {/* Editable Name */}
          {isEditing ? (
            <Input
              className="mt-3"
              value={profile.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
            />
          ) : (
            <h1 className="text-2xl font-bold mt-4">{profile.firstName + " " + profile.lastName}</h1>
          )}

          {/* Editable Education Details */}
          {isEditing ? (
            <>
              <Input className="mt-2" placeholder="Degree" value={profile.education?.degree || ""} onChange={(e) => handleNestedInputChange("degree", e.target.value)} />
              <Input className="mt-2" placeholder="University" value={profile.education?.university || ""} onChange={(e) => handleNestedInputChange("university", e.target.value)} />
              <Input className="mt-2" placeholder="Graduation Year" value={profile.education?.graduationYear || ""} onChange={(e) => handleNestedInputChange("graduationYear", e.target.value)} />
            </>
          ) : (
            <>
              <p className="text-default-500">{profile.education?.degree} - {profile.education?.university}</p>
              <p className="text-default-500">Graduation: {profile.education?.graduationYear}</p>
            </>
          )}

          {/* Edit Profile Button */}
          <Button
            color={isEditing ? "success" : "primary"}
            variant="flat"
            startContent={!isEditing ? <Edit2 size={16} /> : undefined}
            onPress={handleEditToggle}
            className="mt-4"
          >
            {isEditing ? "Save Changes" : "Edit Profile"}
          </Button>
        </CardBody>
      </Card>

      <Tabs selectedKey={selectedTab} onSelectionChange={setSelectedTab} variant="underlined">
        {/* About Section */}
        <Tab key="about" title="About">
          <Card>
            <CardBody className="space-y-4">
              <Input label="Email" value={profile.email} readOnly />
              <Input label="Phone" value={profile.phone} readOnly={!isEditing} onChange={(e) => handleInputChange("phone", e.target.value)} />
              <Input label="Location" value={profile.location} readOnly={!isEditing} onChange={(e) => handleInputChange("location", e.target.value)} />
            </CardBody>
          </Card>
        </Tab>

        {/* Skills Section */}
        <Tab key="skills" title="Skills">
          <Card>
            <CardBody>
              <div className="flex flex-wrap gap-2">
                {(profile.skills || []).map((skill, index) => (
                  <Chip key={index} variant="flat" color="primary" className="flex items-center">
                    {skill}
                    {isEditing && (
                      <X
                        size={14}
                        className="ml-2 cursor-pointer"
                        onClick={() => removeSkill(skill)}
                      />
                    )}
                  </Chip>
                ))}
              </div>
              {isEditing && (
                <div className="flex items-center gap-2 mt-4">
                  <Input
                    className="w-full"
                    placeholder="Add a skill"
                    value={newSkill}
                    onChange={handleSkillChange}
                  />
                  <Button onPress={addSkill} isIconOnly color="primary">
                    <Plus size={18} />
                  </Button>
                </div>
              )}
            </CardBody>
          </Card>
        </Tab>

        {/* Resume Section */}
        <Tab key="resume" title="Resume">
          <Card>
            <CardBody>
              {isEditing ? (
                <Input
                  label="Resume Link"
                  value={profile.resumeLink}
                  onChange={(e) => handleInputChange("resumeLink", e.target.value)}
                />
              ) : (
                <a href={profile.resumeLink} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  View Resume
                </a>
              )}
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
}
