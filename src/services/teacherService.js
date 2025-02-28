import { db } from "../utils/firebase";
<<<<<<< Updated upstream
import {
  Timestamp,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
=======
import { collection, addDoc, Timestamp, doc, updateDoc, where, setDoc, deleteDoc, query, getDocs,getDoc } from "firebase/firestore";
>>>>>>> Stashed changes
//create course
export const createCourse = async (courseData) => {
  try {
    const newCourse = {
      ...courseData,
      createdAt: Timestamp.now(),
      students: [],
    };

    const docRef = await addDoc(collection(db, "courses"), newCourse);
    console.log("Course created with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error creating course:", error);
    return null;
  }
};
//update course details
export const updateCourse = async (courseId, updatedData) => {
  try {
    const courseRef = doc(db, "courses", courseId);
    await updateDoc(courseRef, updatedData);
    console.log("Course updated successfully!");
    return true;
  } catch (error) {
    console.error("Error updating course:", error);
    return false;
  }
};
//delete a course
export const deleteCourse = async (courseId) => {
  try {
    const courseRef = doc(db, "courses", courseId);
    await deleteDoc(courseRef);
    console.log("Course deleted successfully!");
    return true;
  } catch (error) {
    console.error("Error deleting course:", error);
    return false;
  }
};
//get all courses by a teacher
export const getTeacherCourses = async (teacherId) => {
  try {
    const coursesRef = collection(db, "courses");
    const q = query(coursesRef, where("teacherId", "==", teacherId));
    const querySnapshot = await getDocs(q);

    const courses = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return courses;
  } catch (error) {
    console.error("Error fetching teacher's courses:", error);
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
//get student enrolled in a course
export const getEnrolledStudents = async (courseId) => {
  try {
    const courseRef = doc(db, "courses", courseId);
    const courseSnap = await getDoc(courseRef);

    if (!courseSnap.exists()) {
      console.error("Course not found!");
      return [];
    }

    return courseSnap.data().students || [];
  } catch (error) {
    console.error("Error fetching enrolled students:", error);
    return [];
  }
};
//update teacher's profile
// export const updateTeacherProfile = async (teacherId, updatedData) => {
//   try {
//     const teacherRef = doc(db, "trainers", teacherId);
//     const teacherSnap = await getDoc(teacherRef);

//     if (!teacherSnap.exists()) {
//       console.error("Teacher profile not found!");
//       return false;
//     }

//     await updateDoc(teacherRef, updatedData);
//     console.log("Teacher profile updated successfully!");
//     return true;
//   } catch (error) {
//     console.error("Error updating teacher profile:", error);
//     return false;
//   }
// };


export const updateTeacherProfile = async (teacherId, updatedData) => {
  try {
    const teacherRef = doc(db, "trainers", teacherId);
    const teacherSnap = await getDoc(teacherRef);

    if (!teacherSnap.exists()) {
      console.error("Teacher profile not found!");
      return false;
    }

    // Filter out undefined fields
    const filteredData = Object.fromEntries(
      Object.entries(updatedData).filter(([_, value]) => value !== undefined)
    );

    await updateDoc(teacherRef, filteredData);
    console.log("Teacher profile updated successfully!");
    return true;
  } catch (error) {
    console.error("Error updating teacher profile:", error);
    return false;
  }
};


//get teacher's profile
export const getTeacherProfile = async (teacherId) => {
  try {
    const teacherRef = doc(db, "trainers", teacherId);
    const teacherSnap = await getDoc(teacherRef);

    if (!teacherSnap.exists()) {
      console.error("Teacher profile not found!");
      return null;
    }

    return { id: teacherSnap.id, ...teacherSnap.data() };
  } catch (error) {
    console.error("Error fetching teacher profile:", error);
    return null;
  }
};
