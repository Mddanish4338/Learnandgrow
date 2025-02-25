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
import React, { useState } from "react";

export default function StudentProfile() {
  const [selectedTab, setSelectedTab] = useState("about");
  const [isEditing, setIsEditing] = useState(false);
  const [newSkill, setNewSkill] = useState("");

  const [profile, setProfile] = useState({
    studentId: "student_001",
    name: "John Doe",
    email: "johndoe@example.com",
    profileImage: "https://avatar.iran.liara.run/public/38",
    phone: "+91 9876543210",
    location: "Mumbai, India",
    education: {
      university: "IIT Bombay",
      degree: "B.Tech in Computer Science",
      graduationYear: 2025,
    },
    skills: ["React.js", "Node.js", "Firebase", "MongoDB"],
    resumeLink: "https://example.com/resume.pdf",
  });

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (field, value) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSkillChange = (e) => setNewSkill(e.target.value);

  const addSkill = () => {
    if (newSkill.trim() !== "") {
      setProfile((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill],
      }));
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove) => {
    setProfile((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  const handleLogout = () => {
    console.log("User logged out"); // Replace with actual logout logic
    // Example: Clear token, redirect to login, etc.
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 space-y-6">
      <Card>
        <CardBody className="text-center">
          <Avatar className="w-24 h-24 mx-auto" src={profile.profileImage} />
          {isEditing ? (
            <Input
              className="mt-3"
              value={profile.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
          ) : (
            <h1 className="text-2xl font-bold mt-4">{profile.name}</h1>
          )}
          <p className="text-default-500">
            {profile.education.degree} - {profile.education.university}
          </p>
          <p className="text-default-500">Graduation: {profile.education.graduationYear}</p>
          <Button
            color={isEditing ? "success" : "primary"}
            variant="flat"
            startContent={!isEditing ? <Edit2 size={16} /> : undefined}
            onPress={handleEditToggle}
            className="mt-4"
          >
            {isEditing ? "Save Changes" : "Edit Profile"}
          </Button>

          <Button
            color="danger"
            variant="flat"
            className="mt-4"
            onPress={handleLogout}
          >
            Logout
          </Button>

          
        </CardBody>
        
      </Card>

      <Tabs selectedKey={selectedTab} onSelectionChange={setSelectedTab} variant="underlined">
        <Tab key="about" title="About">
          <Card>
            <CardBody className="space-y-4">
              <Input
                label="Email"
                value={profile.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                readOnly={!isEditing}
              />
              <Input
                label="Phone"
                value={profile.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                readOnly={!isEditing}
              />
              <Input
                label="Location"
                value={profile.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                readOnly={!isEditing}
              />
            </CardBody>
          </Card>
        </Tab>

        <Tab key="skills" title="Skills">
          <Card>
            <CardBody>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill, index) => (
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
