import {
  doc,
  addDoc,
  updateDoc,
  getDoc,
  collection,
  Timestamp,
  query,
  where,
  getDocs,
  deleteDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db } from "../utils/firebase";

//get company by id
export const getCompanyById = async (companyId) => {
  try {
    const companyRef = doc(db, "companies", companyId);
    const companySnap = await getDoc(companyRef);

    if (companySnap.exists()) {
      return companySnap.data();
    } else {
      console.error("Company not found!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching company:", error);
    return null;
  }
};
//update company profile
export const updateCompanyProfile = async (companyId, updatedData) => {
  try {
    const companyRef = doc(db, "companies", companyId);
    const companySnap = await getDoc(companyRef);

    if (!companySnap.exists()) {
      console.error("Company does not exist. Cannot update.");
      return false;
    }

    await updateDoc(companyRef, updatedData);
    console.log("Company profile updated successfully!");
    return true;
  } catch (error) {
    console.error("Error updating company profile:", error);
    return false;
  }
};
//create job post
export const createJobPost = async (jobData, companyId) => {
  try {
    const newJob = {
      ...jobData,
      companyId: companyId,
      postedAt: Timestamp.now(),
      candidates: [],
      status: "Active",
    };

    const docRef = await addDoc(collection(db, "jobs"), newJob);
    console.log("Job posted successfully with ID:", docRef.id);

    return docRef.id;
  } catch (error) {
    console.error("Error posting job:", error);
    return null;
  }
};
//get all company jobs
export const getCompanyJobs = async (companyId) => {
  try {
    const jobsRef = collection(db, "jobs");
    const q = query(jobsRef, where("companyId", "==", companyId));
    const querySnapshot = await getDocs(q);

    const jobs = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return jobs;
  } catch (error) {
    console.error("Error fetching company jobs:", error);
    return [];
  }
};
//get job by job Id
export const getJobById = async (jobId) => {
  if (!jobId) return null;

  try {
    const jobDoc = await getDoc(doc(db, "jobs", jobId));

    if (jobDoc.exists()) {
      return { id: jobDoc.id, ...jobDoc.data() };
    } else {
      console.warn("Job not found!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching job:", error);
    throw error;
  }
};

// update the status of candidate
export const updateCandidateStatus = async (jobId, candidateId, status) => {
  try {
    const jobRef = doc(db, "jobs", jobId);
    const jobSnap = await getDoc(jobRef);

    if (!jobSnap.exists()) {
      console.error("Job post not found!");
      return false;
    }

    const jobData = jobSnap.data();
    const candidates = jobData.candidates || [];

    const updatedCandidates = candidates.map((candidate) =>
      candidate.id === candidateId
        ? { ...candidate, hiringStatus: status }
        : candidate
    );

    await updateDoc(jobRef, { candidates: updatedCandidates });

    console.log(`Candidate ${candidateId} has been ${status} successfully!`);
    return true;
  } catch (error) {
    console.error("Error updating candidate status:", error);
    return false;
  }
};
//delete a job post
export const deleteJobPost = async (jobId) => {
  try {
    const jobRef = doc(db, "jobs", jobId);
    await deleteDoc(jobRef);
    console.log("Job post deleted successfully!");
    return true;
  } catch (error) {
    console.error("Error deleting job post:", error);
    return false;
  }
};
//fetching the candidates who applied to a specific job
export const getJobCandidates = async (jobId) => {
  try {
    const jobRef = doc(db, "jobs", jobId);
    const jobSnap = await getDoc(jobRef);

    if (!jobSnap.exists()) {
      console.error("Job post not found!");
      return [];
    }

    return jobSnap.data().candidates || [];
  } catch (error) {
    console.error("Error fetching job candidates:", error);
    return [];
  }
};
//get percentage of profile completion
export const getCompanyProfileCompletion = async (companyId) => {
  try {
    const companyRef = doc(db, "companies", companyId);
    const companySnap = await getDoc(companyRef);

    if (!companySnap.exists()) {
      console.error("Company not found!");
      return 0;
    }

    const companyData = companySnap.data();

    const requiredFields = [
      "name",
      "size",
      "email",
      "location",
      "website",
      "phone",
      "benefits",
    ];

    const optionalFields = ["logo", "description", "linkedin", "twitter"];

    const isFilled = (field) => {
      const value = companyData[field];
      return Array.isArray(value) ? value.length > 0 : Boolean(value);
    };

    let filledRequired = requiredFields.filter(isFilled).length;
    let filledOptional = optionalFields.filter(isFilled).length;

    let requiredPercentage = (filledRequired / requiredFields.length) * 80;
    let optionalPercentage = (filledOptional / optionalFields.length) * 20;

    let totalPercentage = Math.round(requiredPercentage + optionalPercentage);
    return totalPercentage;
  } catch (error) {
    console.error("Error calculating profile completion:", error);
    return 0;
  }
};

export const addBenefit = async (companyId, benefit) => {
  try {
    const companyRef = doc(db, "companies", companyId);

    await updateDoc(companyRef, {
      benefits: arrayUnion(benefit),
    });

    console.log(`Benefit "${benefit}" added successfully.`);
    return true;
  } catch (error) {
    console.error("Error adding benefit:", error);
    return false;
  }
};
export const removeBenefit = async (companyId, benefit) => {
  try {
    const companyRef = doc(db, "companies", companyId);

    await updateDoc(companyRef, {
      benefits: arrayRemove(benefit),
    });

    console.log(`Benefit "${benefit}" removed successfully.`);
    return true;
  } catch (error) {
    console.error("Error removing benefit:", error);
    return false;
  }
};
export const getBenefits = async (companyId) => {
  try {
    const docRef = doc(db, "companies", companyId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data().benefits || [];
    }
  } catch (error) {
    console.error("Error fetching benefits:", error);
  }
  return [];
};
