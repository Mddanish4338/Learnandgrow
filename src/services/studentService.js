import { db } from "../utils/firebase";
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  Timestamp,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

//get student by ID
export const getStudentById = async (studentId) => {
  try {
    const studentRef = doc(db, "students", studentId);
    const studentSnap = await getDoc(studentRef);

    if (studentSnap.exists()) {
      return studentSnap.data();
    } else {
      console.error("Student profile not found!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching student profile:", error);
    return null;
  }
};
//update profile of student
export const updateStudentProfile = async (studentId, updatedData) => {
  try {
    const studentRef = doc(db, "students", studentId);
    await updateDoc(studentRef, updatedData);
    console.log("Student profile updated successfully!");
    return true;
  } catch (error) {
    console.error("Error updating student profile:", error);
    return false;
  }
};
//apply for a job
export const applyForJob = async (jobId, studentId, applicationData) => {
  try {
    const studentRef = doc(db, "students", studentId);
    const studentSnap = await getDoc(studentRef);

    if (!studentSnap.exists()) {
      console.error("Student profile not found!");
      return false;
    }

    const studentData = studentSnap.data();
    const candidateData = {
      id: studentId,
      name: studentData.name,
      email: studentData.email,
      status: "applied",
      skills: studentData.skills || [],
      profilePic: studentData.profilePic || "",
      appliedAt: new Date().toISOString(),
      coverLetter: applicationData.coverLetter || "",
      resume: applicationData.resume || "",
      linkedinProfile: applicationData.linkedinProfile || "",
    };

    const jobRef = doc(db, "jobs", jobId);
    await updateDoc(jobRef, {
      candidates: arrayUnion(candidateData),
    });

    console.log("Student applied for the job successfully!");
    return true;
  } catch (error) {
    console.error("Error applying for job:", error);
    return false;
  }
};
//fetch all applied jobs
export const getAppliedJobs = async (studentId) => {
  try {
    const jobsRef = collection(db, "jobs");
    const q = query(
      jobsRef,
      where("candidates", "array-contains", { id: studentId })
    );
    const querySnapshot = await getDocs(q);

    const appliedJobs = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return appliedJobs;
  } catch (error) {
    console.error("Error fetching applied jobs:", error);
    return [];
  }
};
//withdraw job application
export const withdrawJobApplication = async (jobId, studentId) => {
  try {
    const jobRef = doc(db, "jobs", jobId);
    const jobSnap = await getDoc(jobRef);

    if (!jobSnap.exists()) {
      console.error("Job post not found!");
      return false;
    }

    const jobData = jobSnap.data();
    const updatedCandidates = jobData.candidates.filter(
      (candidate) => candidate.id !== studentId
    );

    await updateDoc(jobRef, { candidates: updatedCandidates });

    console.log("Student withdrew application successfully!");
    return true;
  } catch (error) {
    console.error("Error withdrawing job application:", error);
    return false;
  }
};
//enroll in a course
export const enrollInCourse = async (courseId, studentId) => {
  try {
    const studentRef = doc(db, "students", studentId);
    const studentSnap = await getDoc(studentRef);

    if (!studentSnap.exists()) {
      console.error("Student not found!");
      return false;
    }

    const studentData = studentSnap.data();
    const enrollmentData = {
      id: studentId,
      name: studentData.name,
      email: studentData.email,
      enrolledAt: Timestamp.now(),
    };

    const courseRef = doc(db, "courses", courseId);
    await updateDoc(courseRef, {
      students: arrayUnion(enrollmentData),
    });

    console.log("Student enrolled successfully!");
    return true;
  } catch (error) {
    console.error("Error enrolling in course:", error);
    return false;
  }
};
//withdraw from a course
export const withdrawFromCourse = async (courseId, studentId) => {
  try {
    const courseRef = doc(db, "courses", courseId);
    const courseSnap = await getDoc(courseRef);

    if (!courseSnap.exists()) {
      console.error("Course not found!");
      return false;
    }

    const courseData = courseSnap.data();
    const studentToRemove = courseData.students.find(
      (student) => student.id === studentId
    );

    if (!studentToRemove) {
      console.error("Student is not enrolled in this course!");
      return false;
    }

    await updateDoc(courseRef, {
      students: arrayRemove(studentToRemove),
    });

    console.log("Student withdrawn from course successfully!");
    return true;
  } catch (error) {
    console.error("Error withdrawing from course:", error);
    return false;
  }
};
//get all enrolled courses
export const getEnrolledCourses = async (studentId) => {
  try {
    const coursesRef = collection(db, "courses");
    const q = query(
      coursesRef,
      where("students", "array-contains", { id: studentId })
    );
    const querySnapshot = await getDocs(q);

    const courses = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return courses;
  } catch (error) {
    console.error("Error fetching enrolled courses:", error);
    return [];
  }
};
//get course details
export const getCourseDetails = async (courseId) => {
  try {
    const courseRef = doc(db, "courses", courseId);
    const courseSnap = await getDoc(courseRef);

    if (!courseSnap.exists()) {
      console.error("Course not found!");
      return null;
    }

    return { id: courseSnap.id, ...courseSnap.data() };
  } catch (error) {
    console.error("Error fetching course details:", error);
    return null;
  }
};
//get all jobs
export const getAllJobs = async () => {
  try {
    const jobsRef = collection(db, "jobs");
    const querySnapshot = await getDocs(jobsRef);

    const jobs = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return jobs;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return [];
  }
};
//get all courses
export const getAllCourses = async () => {
  try {
    const coursesRef = collection(db, "courses");
    const querySnapshot = await getDocs(coursesRef);

    const courses = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return courses;
  } catch (error) {
    console.error("Error fetching courses:", error);
    return [];
  }
};
