// import React from "react";

// const Profile = ({ trainer, profileImage, onFileChange }) => {
//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
//         {/* Trainer Details */}
//         {trainer ? (
//           <div>
//             <h3 className="text-2xl font-bold mb-6">Trainer Profile</h3>
//             <div className="flex flex-col items-center text-center mb-8">
//               <img
//                 src={profileImage}
//                 alt="Profile"
//                 className="w-32 h-32 rounded-full border-4 border-white shadow-lg"
//               />
//               <h1 className="text-3xl font-bold mt-4">
//                 {trainer.firstName} {trainer.lastName}
//               </h1>
//               <p className="text-gray-600">{trainer.role}</p>
//             </div>

//             <div className="space-y-4">
//               <div>
//                 <span className="font-medium">First Name:</span> {trainer.firstName}
//               </div>
//               <div>
//                 <span className="font-medium">Last Name:</span> {trainer.lastName}
//               </div>
//               <div>
//                 <span className="font-medium">Email:</span> {trainer.email}
//               </div>
//               <div>
//                 <span className="font-medium">Phone Number:</span> {trainer.phoneNumber}
//               </div>
//               <div>
//                 <span className="font-medium">Role:</span> {trainer.role}
//               </div>
//             </div>

//             {/* Profile Image Upload */}
//             <div className="mt-8">
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={onFileChange}
//                 className="hidden"
//                 id="upload"
//               />
//               <label
//                 htmlFor="upload"
//                 className="block bg-blue-600 text-white px-4 py-2 text-center rounded-lg cursor-pointer"
//               >
//                 Upload Profile Image
//               </label>
//             </div>
//           </div>
//         ) : (
//           <p className="text-gray-700">No trainer data found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Profile;
















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
import React, { useState } from "react";

export default function MentorProfile() {
  const [selectedTab, setSelectedTab] = useState("about");
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: "John Doe",
    expertise: "Software Engineering, AI, and Machine Learning",
    experience: "10+ years",
    location: "San Francisco, CA",
    website: "www.johndoe.com",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    about:
      "John Doe is a seasoned software engineer with over 10 years of experience in building scalable systems and mentoring aspiring developers. He specializes in AI, machine learning, and cloud computing.",
    availability: ["Monday", "Wednesday", "Friday"],
    certifications: [
      "AWS Certified Solutions Architect",
      "Google Professional Data Engineer",
      "Microsoft Certified Azure Developer",
    ],
    socialLinks: {
      facebook: "facebook.com/johndoe",
      twitter: "twitter.com/johndoe",
      linkedin: "linkedin.com/in/johndoe",
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
              alt="Mentor cover"
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
              <p className="text-indigo-600 font-medium">{profile.expertise}</p>
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

              <div className="bg-indigo-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 text-indigo-700">
                  Availability
                </h3>
                <div className="flex flex-wrap gap-2">
                  {profile.availability.map((day, index) => (
                    <Chip
                      key={index}
                      variant="flat"
                      className="bg-indigo-100 text-indigo-700 font-medium"
                    >
                      {day}
                    </Chip>
                  ))}
                </div>
              </div>

              <div className="bg-indigo-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 text-indigo-700">
                  Certifications
                </h3>
                <div className="flex flex-wrap gap-2">
                  {profile.certifications.map((certification, index) => (
                    <Chip
                      key={index}
                      variant="flat"
                      className="bg-indigo-100 text-indigo-700 font-medium"
                    >
                      {certification}
                    </Chip>
                  ))}
                </div>
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




// import React, { useState, useEffect } from "react";
// import {
//   Avatar,
//   Button,
//   Card,
//   CardBody,
//   Chip,
//   Image,
//   Input,
//   Tab,
//   Tabs,
//   Textarea,
// } from "@nextui-org/react";
// import {
//   Briefcase,
//   Camera,
//   Edit2,
//   Facebook,
//   Globe,
//   Linkedin,
//   Mail,
//   MapPin,
//   Phone,
//   Twitter,
//   User,
//   Award,
// } from "lucide-react";
// import { getTeacherProfile, updateTeacherProfile } from "../../services/teacherService"; // Import the functions

// export default function MentorProfile({ teacherId }) {
//   const [selectedTab, setSelectedTab] = useState("about");
//   const [isEditing, setIsEditing] = useState(false);
//   const [profile, setProfile] = useState({
//     name: "",
//     expertise: "",
//     experience: "",
//     location: "",
//     website: "",
//     email: "",
//     phone: "",
//     about: "",
//     availability: [],
//     certifications: [],
//     socialLinks: {
//       facebook: "",
//       twitter: "",
//       linkedin: "",
//     },
//   });

//   // Fetch teacher profile on component mount
//   useEffect(() => {
//     const fetchProfile = async () => {
//       const teacherProfile = await getTeacherProfile(teacherId);
//       if (teacherProfile) {
//         setProfile({
//           name: teacherProfile.name || "",
//           expertise: teacherProfile.expertise || "",
//           experience: teacherProfile.experience || "",
//           location: teacherProfile.location || "",
//           website: teacherProfile.website || "",
//           email: teacherProfile.email || "",
//           phone: teacherProfile.phone || "",
//           about: teacherProfile.about || "",
//           availability: teacherProfile.availability || [],
//           certifications: teacherProfile.certifications || [],
//           socialLinks: {
//             facebook: teacherProfile.socialLinks?.facebook || "",
//             twitter: teacherProfile.socialLinks?.twitter || "",
//             linkedin: teacherProfile.socialLinks?.linkedin || "",
//           },
//         });
//       }
//     };

//     fetchProfile();
//   }, [teacherId]);

//   // Handle toggling edit mode and saving changes
//   const handleEditToggle = async () => {
//     if (isEditing) {
//       // Save changes
//       const updatedData = {
//         name: profile.name,
//         expertise: profile.expertise,
//         experience: profile.experience,
//         location: profile.location,
//         website: profile.website,
//         email: profile.email,
//         phone: profile.phone,
//         about: profile.about,
//         availability: profile.availability,
//         certifications: profile.certifications,
//         socialLinks: {
//           facebook: profile.socialLinks.facebook,
//           twitter: profile.socialLinks.twitter,
//           linkedin: profile.socialLinks.linkedin,
//         },
//       };

//       const success = await updateTeacherProfile(teacherId, updatedData);
//       if (success) {
//         console.log("Profile updated successfully!");
//       } else {
//         console.error("Failed to update profile.");
//       }
//     }
//     setIsEditing(!isEditing);
//   };

//   // Handle input changes
//   const handleInputChange = (field, value) => {
//     setProfile((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   // Handle social link changes
//   const handleSocialChange = (platform, value) => {
//     setProfile((prev) => ({
//       ...prev,
//       socialLinks: {
//         ...prev.socialLinks,
//         [platform]: value,
//       },
//     }));
//   };

//   const gradientStyle = {
//     background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
//   };

//   return (
//     <div className="max-w-7xl p-4 md:p-6 space-y-6 bg-gray-50 rounded-xl">
//       <Card className="w-full border-none shadow-lg overflow-visible">
//         <CardBody className="relative p-0">
//           <div className="relative h-56 rounded-t-xl overflow-hidden mb-16">
//             <div
//               className="absolute inset-0 z-10 opacity-70"
//               style={gradientStyle}
//             ></div>
//             <Image
//               src="/api/placeholder/1200/400"
//               alt="Mentor cover"
//               classNames={{
//                 img: "object-cover w-full h-full",
//               }}
//             />
//             <Button
//               isIconOnly
//               className="absolute top-4 right-4 z-20 bg-white/30 backdrop-blur-md"
//               variant="flat"
//               size="sm"
//             >
//               <Camera size={16} className="text-white" />
//             </Button>
//           </div>

//           <div className="absolute top-36 left-6 flex items-end gap-4 z-20">
//             <Avatar
//               className="w-28 h-28 text-large border-4 border-white shadow-lg"
//               src="/api/placeholder/150/150"
//             />
//             <div className="mb-2">
//               <h1 className="text-2xl font-bold text-gray-800">
//                 {profile.name}
//               </h1>
//               <p className="text-indigo-600 font-medium">{profile.expertise || "Add your expertise"}</p>
//             </div>
//           </div>

//           <div className="flex justify-end mt-4 p-4">
//             <Button
//               color={isEditing ? "success" : "primary"}
//               variant={isEditing ? "solid" : "flat"}
//               startContent={isEditing ? undefined : <Edit2 size={16} />}
//               onPress={handleEditToggle}
//               className={
//                 isEditing ? "bg-emerald-500" : "bg-indigo-500 text-white"
//               }
//             >
//               {isEditing ? "Save Changes" : "Edit Profile"}
//             </Button>
//           </div>
//         </CardBody>
//       </Card>

//       <Tabs
//         selectedKey={selectedTab}
//         onSelectionChange={setSelectedTab}
//         variant="underlined"
//         classNames={{
//           tabList: "gap-6",
//           cursor: "w-full bg-indigo-500",
//           tab: "data-[selected=true]:text-indigo-500 font-medium",
//         }}
//       >
//         <Tab
//           key="about"
//           title={
//             <div className="flex items-center gap-2">
//               <User size={16} />
//               <span>About</span>
//             </div>
//           }
//         >
//           <Card className="mt-4 shadow-md border-none">
//             <CardBody className="space-y-6 p-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div className="space-y-4">
//                   <Input
//                     label="Full Name"
//                     value={profile.name}
//                     onChange={(e) => handleInputChange("name", e.target.value)}
//                     readOnly={!isEditing}
//                     variant="bordered"
//                     className="bg-white"
//                     classNames={{
//                       label: "text-indigo-600 font-medium",
//                       input: "text-gray-800",
//                     }}
//                     startContent={<User className="text-indigo-400" size={16} />}
//                   />
//                   <Input
//                     label="Expertise"
//                     value={profile.expertise}
//                     onChange={(e) =>
//                       handleInputChange("expertise", e.target.value)
//                     }
//                     readOnly={!isEditing}
//                     variant="bordered"
//                     className="bg-white"
//                     classNames={{
//                       label: "text-indigo-600 font-medium",
//                       input: "text-gray-800",
//                     }}
//                     startContent={
//                       <Briefcase className="text-indigo-400" size={16} />
//                     }
//                     placeholder="Add your expertise"
//                   />
//                   <Input
//                     label="Location"
//                     value={profile.location}
//                     onChange={(e) =>
//                       handleInputChange("location", e.target.value)
//                     }
//                     readOnly={!isEditing}
//                     variant="bordered"
//                     className="bg-white"
//                     classNames={{
//                       label: "text-indigo-600 font-medium",
//                       input: "text-gray-800",
//                     }}
//                     startContent={
//                       <MapPin className="text-indigo-400" size={16} />
//                     }
//                     placeholder="Add your location"
//                   />
//                 </div>
//                 <div className="space-y-4">
//                   <Input
//                     label="Experience"
//                     value={profile.experience}
//                     onChange={(e) =>
//                       handleInputChange("experience", e.target.value)
//                     }
//                     readOnly={!isEditing}
//                     variant="bordered"
//                     className="bg-white"
//                     classNames={{
//                       label: "text-indigo-600 font-medium",
//                       input: "text-gray-800",
//                     }}
//                     startContent={<Award className="text-indigo-400" size={16} />}
//                   />
//                   <Input
//                     label="Email"
//                     value={profile.email}
//                     onChange={(e) => handleInputChange("email", e.target.value)}
//                     readOnly={!isEditing}
//                     variant="bordered"
//                     className="bg-white"
//                     classNames={{
//                       label: "text-indigo-600 font-medium",
//                       input: "text-gray-800",
//                     }}
//                     startContent={
//                       <Mail className="text-indigo-400" size={16} />
//                     }
//                   />
//                   <Input
//                     label="Phone"
//                     value={profile.phone}
//                     onChange={(e) => handleInputChange("phone", e.target.value)}
//                     readOnly={!isEditing}
//                     variant="bordered"
//                     className="bg-white"
//                     classNames={{
//                       label: "text-indigo-600 font-medium",
//                       input: "text-gray-800",
//                     }}
//                     startContent={
//                       <Phone className="text-indigo-400" size={16} />
//                     }
//                   />
//                 </div>
//               </div>

//               <Textarea
//                 label="About Mentor"
//                 value={profile.about}
//                 onChange={(e) => handleInputChange("about", e.target.value)}
//                 readOnly={!isEditing}
//                 variant="bordered"
//                 className="bg-white"
//                 classNames={{
//                   label: "text-indigo-600 font-medium",
//                   input: "text-gray-800",
//                 }}
//                 minRows={4}
//                 placeholder="Add a description about yourself"
//               />

//               <div className="bg-indigo-50 p-4 rounded-lg">
//                 <h3 className="text-lg font-semibold mb-3 text-indigo-700">
//                   Availability
//                 </h3>
//                 <div className="flex flex-wrap gap-2">
//                   {profile.availability.length > 0 ? (
//                     profile.availability.map((day, index) => (
//                       <Chip
//                         key={index}
//                         variant="flat"
//                         className="bg-indigo-100 text-indigo-700 font-medium"
//                       >
//                         {day}
//                       </Chip>
//                     ))
//                   ) : (
//                     <p className="text-gray-500">Add your availability</p>
//                   )}
//                 </div>
//               </div>

//               <div className="bg-indigo-50 p-4 rounded-lg">
//                 <h3 className="text-lg font-semibold mb-3 text-indigo-700">
//                   Certifications
//                 </h3>
//                 <div className="flex flex-wrap gap-2">
//                   {profile.certifications.length > 0 ? (
//                     profile.certifications.map((certification, index) => (
//                       <Chip
//                         key={index}
//                         variant="flat"
//                         className="bg-indigo-100 text-indigo-700 font-medium"
//                       >
//                         {certification}
//                       </Chip>
//                     ))
//                   ) : (
//                     <p className="text-gray-500">Add your certifications</p>
//                   )}
//                 </div>
//               </div>
//             </CardBody>
//           </Card>
//         </Tab>

//         <Tab
//           key="social"
//           title={
//             <div className="flex items-center gap-2">
//               <Globe size={16} />
//               <span>Social</span>
//             </div>
//           }
//         >
//           <Card className="mt-4 shadow-md border-none">
//             <CardBody className="space-y-4 p-6">
//               <Input
//                 label="Facebook"
//                 value={profile.socialLinks.facebook}
//                 onChange={(e) => handleSocialChange("facebook", e.target.value)}
//                 readOnly={!isEditing}
//                 variant="bordered"
//                 className="bg-white"
//                 classNames={{
//                   label: "text-indigo-600 font-medium",
//                   input: "text-gray-800",
//                 }}
//                 startContent={<Facebook className="text-blue-500" size={16} />}
//                 placeholder="Add your Facebook profile"
//               />
//               <Input
//                 label="Twitter"
//                 value={profile.socialLinks.twitter}
//                 onChange={(e) => handleSocialChange("twitter", e.target.value)}
//                 readOnly={!isEditing}
//                 variant="bordered"
//                 className="bg-white"
//                 classNames={{
//                   label: "text-indigo-600 font-medium",
//                   input: "text-gray-800",
//                 }}
//                 startContent={<Twitter className="text-sky-500" size={16} />}
//                 placeholder="Add your Twitter profile"
//               />
//               <Input
//                 label="LinkedIn"
//                 value={profile.socialLinks.linkedin}
//                 onChange={(e) => handleSocialChange("linkedin", e.target.value)}
//                 readOnly={!isEditing}
//                 variant="bordered"
//                 className="bg-white"
//                 classNames={{
//                   label: "text-indigo-600 font-medium",
//                   input: "text-gray-800",
//                 }}
//                 startContent={<Linkedin className="text-blue-700" size={16} />}
//                 placeholder="Add your LinkedIn profile"
//               />
//             </CardBody>
//           </Card>
//         </Tab>
//       </Tabs>
//     </div>
//   );
// }