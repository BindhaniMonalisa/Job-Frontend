import axios from "axios";
import Swal from "sweetalert2"; // ✅ Import SweetAlert2

const API_URL = "/api";

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

// ✅ Attach token for protected routes
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ----------------------------------------------------------
// FETCH ALL JOBS
// ----------------------------------------------------------
export const getJobs = async (opts = {}) => {
  try {
    const url = opts.showExpired ? "jobs?showExpired=true" : "jobs";
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    Swal.fire({
      icon: "error",
      title: "Failed to load jobs",
      text: "An error occurred while fetching the job list.",
    });
    throw error;
  }
};

// ----------------------------------------------------------
// FETCH SINGLE JOB
// ----------------------------------------------------------
export const getJobById = async (id) => {
  try {
    const response = await api.get(`jobs/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching job by id:", error);
    Swal.fire({
      icon: "error",
      title: "Error loading job",
      text: "Could not fetch job details.",
    });
    throw error;
  }
};

// ----------------------------------------------------------
// CREATE JOB
// ----------------------------------------------------------
export const createJob = async (formData) => {
  try {
    const payload = {
      ...formData,
      lastDate: formData.lastDate ? formData.lastDate : null,
    };
    const response = await api.post("admin/jobs", payload);

    Swal.fire({
      icon: "success",
      title: "Job Created!",
      text: "Your new job has been added successfully.",
      timer: 1500,
      showConfirmButton: false,
    });

    return response.data;
  } catch (error) {
    console.error("Error creating job:", error);
    Swal.fire({
      icon: "error",
      title: "Creation Failed",
      text: "Unable to create the job. Please try again.",
    });
    throw error;
  }
};

// ----------------------------------------------------------
// UPDATE JOB
// ----------------------------------------------------------
export const updateJob = async (jobId, formData) => {
  try {
    const payload = {
      ...formData,
      lastDate: formData.lastDate === "" ? null : formData.lastDate,
    };
    const response = await api.put(`admin/jobs/${jobId}`, payload);

    Swal.fire({
      icon: "success",
      title: "Job Updated!",
      text: "Job details have been updated successfully.",
      timer: 1500,
      showConfirmButton: false,
    });

    return response.data;
  } catch (error) {
    console.error("Error updating job:", error);
    Swal.fire({
      icon: "error",
      title: "Update Failed",
      text: "Unable to update the job. Please try again.",
    });
    throw error;
  }
};

// ----------------------------------------------------------
// DELETE JOB (uses SweetAlert2 confirmation)
// ----------------------------------------------------------
export const deleteJob = async (jobId) => {
  try {
    // ✅ Show confirmation modal
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This job will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });

    // ❌ If user cancels
    if (!result.isConfirmed) {
      Swal.fire({
        icon: "info",
        title: "Cancelled",
        text: "The job was not deleted.",
        timer: 1200,
        showConfirmButton: false,
      });
      return { success: false, message: "Cancelled by user" };
    }

    // ✅ Proceed with deletion
    const response = await api.delete(`admin/jobs/${jobId}`);

    if (response.data.success) {
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "The job has been removed successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Deletion Failed",
        text: "The server did not confirm deletion.",
      });
    }

    return response.data;
  } catch (error) {
    console.error("Error deleting job:", error);
    Swal.fire({
      icon: "error",
      title: "Delete Failed",
      text: "An unexpected error occurred while deleting the job.",
    });
    throw error;
  }
};

// ----------------------------------------------------------
// APPLY FOR JOB (frontend public users)
// ----------------------------------------------------------
export const applyForJob = async (jobId, formData) => {
  try {
    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    if (formData.resume) data.append("resume", formData.resume);

    const response = await axios.post(`${API_URL}/apply/${jobId}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    Swal.fire({
      icon: "success",
      title: "Application Submitted!",
      text: "Your application has been received successfully.",
      timer: 2000,
      showConfirmButton: false,
    });

    return response.data;
  } catch (error) {
    console.error("Error applying for job:", error);
    Swal.fire({
      icon: "error",
      title: "Application Failed",
      text: "Unable to submit your application. Please try again later.",
    });
    throw error;
  }
};
