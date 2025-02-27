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
import { Edit2, Plus, Trash2, X } from "lucide-react";
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
        setProfile({
          ...data,
          education: Array.isArray(data.education) ? data.education : [], // Ensure it's an array
          experience: Array.isArray(data.experience) ? data.experience : [], // Ensure it's an array
        });
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
      await updateStudentProfile(user.uid, profile); // Ensure profile updates with education and experience
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

  const handleArrayChange = (field, index, key, value) => {
    setProfile((prev) => {
      const updatedArray = [...prev[field]];
      updatedArray[index] = { ...updatedArray[index], [key]: value };
      return { ...prev, [field]: updatedArray };
    });
  };

  // Handle Education Changes
  const addEducation = () => {
    setProfile((prev) => ({
      ...prev,
      education: [...prev.education, { degree: "", university: "", graduationYear: "" }],
    }));
  };

  // Handle Experience Changes
  const addExperience = () => {
    setProfile((prev) => ({
      ...prev,
      experience: [...prev.experience, { title: "", company: "", years: "" }],
    }));
  };

  const deleteEducation = (index) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      education: prevProfile.education.filter((_, i) => i !== index),
    }));
  };

  const deleteExperience = (index) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      experience: prevProfile.experience.filter((_, i) => i !== index),
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

          {/* Display Latest Education Details (No Direct Editing) */}
          {profile.education.length > 0 ? (
            <>
              <p className="text-default-500">
                {profile.education[profile.education.length - 1]?.degree} - {profile.education[profile.education.length - 1]?.university}
              </p>
              <p className="text-default-500">
                Graduation: {profile.education[profile.education.length - 1]?.graduationYear}
              </p>
            </>
          ) : (
            <p className="text-default-500">No education details available.</p>
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

        <Tab key="education" title="Education">
          <Card>
            <CardBody className="space-y-4">
              {profile.education.length > 0 ? (
                profile.education.map((edu, index) => (
                  <div key={index} className="mb-4 p-3 border rounded-lg flex items-center gap-2">
                    {isEditing ? (
                      <>
                        <div className="flex flex-col w-full">
                          <Input
                            placeholder="Degree"
                            value={edu.degree}
                            onChange={(e) => handleArrayChange("education", index, "degree", e.target.value)}
                          />
                          <Input
                            placeholder="University"
                            value={edu.university}
                            onChange={(e) => handleArrayChange("education", index, "university", e.target.value)}
                          />
                          <Input
                            placeholder="Graduation Year"
                            value={edu.graduationYear}
                            onChange={(e) => handleArrayChange("education", index, "graduationYear", e.target.value)}
                          />
                        </div>
                        {/* Delete Button */}
                        <Button
                          onClick={() => deleteEducation(index)}
                          className="bg-red-500 text-white p-2 rounded-lg"
                          aria-label="Delete education"
                        >
                          🗑️
                        </Button>
                      </>
                    ) : (
                      <p className="text-default-500">
                        {edu.degree} - {edu.university} ({edu.graduationYear})
                      </p>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-default-500">No education details added.</p>
              )}

              {isEditing && (
                <Button onClick={addEducation} className="mt-2" startContent={<Plus size={16} />}>
                  Add Education
                </Button>
              )}
            </CardBody>
          </Card>
        </Tab>

        {/* Experience Section */}
        <Tab key="experience" title="Experience">
          <Card>
            <CardBody>
              {profile.experience.length > 0 ? (
                profile.experience.map((exp, index) => (
                  <div key={index} className="mb-4 p-3 border rounded-lg flex items-center gap-2">
                    {isEditing ? (
                      <>
                        <div className="flex flex-col w-full">
                          <Input
                            placeholder="Job Title"
                            value={exp.title}
                            onChange={(e) => handleArrayChange("experience", index, "title", e.target.value)}
                          />
                          <Input
                            placeholder="Company"
                            value={exp.company}
                            onChange={(e) => handleArrayChange("experience", index, "company", e.target.value)}
                          />
                          <Input
                            placeholder="Enter Year and Months you have been worked for!"
                            value={exp.years}
                            onChange={(e) => handleArrayChange("experience", index, "", e.target.value)}
                          />
                        </div>
                        {/* Delete Button */}
                        <Button
                          onClick={() => deleteExperience(index)}
                          className="bg-red-500 text-white p-2 rounded-lg"
                          aria-label="Delete experience"
                        >
                          🗑️
                        </Button>
                      </>
                    ) : (
                      <p className="text-default-500">
                        {exp.title} at {exp.company} ({exp.years})
                      </p>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-default-500">No experience details added.</p>
              )}

              {isEditing && (
                <Button onClick={addExperience} className="mt-2" startContent={<Plus size={16} />}>
                  Add Experience
                </Button>
              )}
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
