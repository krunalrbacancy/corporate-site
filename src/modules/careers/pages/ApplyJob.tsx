import { Link, useParams } from "react-router-dom";
import { currentOpenings } from "../data/jobs";
import { useRef, useState } from "react";
import { MAX_FILE_SIZE } from "../../../utils/utils";
import type { ApplyJobErrors, ApplyJobFormData } from "../types/applyJob.types";

const EMPTY_FORM: ApplyJobFormData = {
  full_name: "",
  email: "",
  phone: "",
  message: "",
  resume: null,
};

const EMPTY_ERRORS: ApplyJobErrors = {
  full_name: "",
  email: "",
  phone: "",
  message: "",
  resume: "",
};

const ApplyJob = () => {
  const { slug } = useParams();
  const job = currentOpenings.find((job) => job.slug === slug);
  
  if (!job) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-semibold">
          This position is no longer available.
        </h2>

        <Link to="/careers" className="text-blue-600 mt-4 inline-block">
          View all openings
        </Link>
      </div>
    );
  }

  const [formData, setFormData] = useState<ApplyJobFormData>(EMPTY_FORM);
  const [error, setError] = useState<ApplyJobErrors>(EMPTY_ERRORS);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const hasError = error.full_name !== "" || error.email !== "";
  const isFormIncomplete = 
    formData.full_name.trim() === "" ||
    formData.email.trim() === "" ||
    formData.resume === null;

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case "full_name":
        return value.trim() ? "" : "Full name is required"

      case "email":
        if (!value.trim()) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return "Invalid email address";
        }
        return "";
        
      default:
        return "";
    }
  }

  const validateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setError(prev => ({
      ...prev,
      [name]: validateField(name, value)
    }));
    
    return ""
  }
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files?.[0];

    if (!files) return;

    // Reset previous error
    setError(prev => ({ ...prev, resume: "" }));

    // ❌ File size validation
    if (files.size > MAX_FILE_SIZE) {
      setError((prev) => ({
        ...prev,
        resume: "File must be less than 5MB"
      }))
      return;
    }

    setFormData(prev => ({
      ...prev,
      resume: files,
    }));
  };

  const formHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(isFormIncomplete || hasError) return

    
    try {
      setIsLoading(true);

      const fd = new FormData();
      fd.append("full_name", formData.full_name);
      fd.append("email", formData.email);
      fd.append("phone", formData.phone);
      fd.append("message", formData.message);
      fd.append("job_slug", job.slug);

      if (formData.resume) {
        fd.append("resume", formData.resume);
      }
      
      const response = await fetch(
        `${import.meta.env.VITE_APP_URL}/careers/apply`, 
        {
          method: "POST",
          body: fd,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong. Please try again.");
      }

      console.log("Success:", data);
      
      setIsSuccess(true);
      setFormData(EMPTY_FORM);
      setError(EMPTY_ERRORS);
      fileInputRef.current && (fileInputRef.current.value = "");
    } catch (error: any) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  
  return (
    <div className="container mx-auto px-4 py-16">
      <Link
        to={`/careers/${job.slug}`}
        className="text-sm text-blue-600 hover:underline"
      >
        ← Back to Job Details
      </Link>
      <h1 className="text-3xl font-bold mt-2 mb-6">
        Apply for {job.title}
      </h1>

      <div className="grid md:grid-cols-2 gap-10 mb-10">
        <div>
          <p className="text-gray-600 mb-8">
            {job.location} · {job.type}
          </p>
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Role Overview:
          </h3>
          <p className="text-gray-700 leading-relaxed mb-8">
            {job.roleOverview}
          </p>

          {/* Optional sections (if you have them later) */}
          {job.keyResponsibilities && (
            <>
              <h3 className="text-xl font-semibold mb-3">
                Key Responsibilities:
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-8">
                {job.keyResponsibilities.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </>
          )}

          {job.requiredSkillsExperience && (
            <>
              <h3 className="text-xl font-semibold mb-3">
                Required Skills & Experience:
              </h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                {job.requiredSkillsExperience.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </>
          )}
        </div>
        <div>
          {isSuccess && <h2 className="text-lg text-green-600 mb-4">Thanks for applying! We will review your application and get back to you soon. 
            <button 
              type="button"
              onClick={() => setIsSuccess(false)}
              className="ml-2 inline-flex items-center justify-center w-6 h-6 bg-green-100 text-green-600 hover:bg-green-200 cursor-pointer rounded-full transition-colors"
              aria-label="Close success message"
            >
              <svg 
                className="w-4 h-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              </svg>
            </button>
          </h2>
          }

          <form onSubmit={formHandler} className="max-w-xl bg-white border rounded-lg p-6 space-y-5">
            {/* Full Name */}
            <div>
              <label htmlFor="full_name" className="block text-sm font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="full_name"
                name="full_name"
                className="w-full border rounded px-3 py-2"
                placeholder="John Doe"
                value={formData.full_name}
                onChange={handleChange}
                onBlur={validateInput}
              />
              {error.full_name && (
                <p className="text-red-600 mt-1 text-sm">{error.full_name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full border rounded px-3 py-2"
                value={formData.email}
                onChange={handleChange}
                onBlur={validateInput}
                autoComplete="on"
                placeholder="john@example.com"
              />
              {error.email && (
                <p className="text-red-600 mt-1 text-sm">{error.email}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-1">
                Phone (optional)
              </label>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                name="phone"
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                placeholder="+1 987 654 3210"
              />
            </div>

            {/* Resume */}
            <div>
              <label htmlFor="resume" className="block text-sm font-medium mb-1">
                Resume
              </label>
              <input
                type="file"
                id="resume"
                className="w-full border rounded px-3 py-2"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                ref={fileInputRef}
              />
              <p className="text-xs text-gray-500 mt-1">
                Accepted formats: PDF, DOC, DOCX (Max 5MB)
              </p>
              {formData.resume && (
                <p className="text-sm text-gray-600 mt-1">
                  Selected file: {formData.resume.name}
                </p>
              )}
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1">
                Message (optional)
              </label>
              <textarea
                rows={4}
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                placeholder="Tell us briefly why you're a good fit"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className={`${isFormIncomplete || hasError || isLoading ? 'cursor-not-allowed opacity-30' : 'hover:bg-blue-700 cursor-pointer'} w-full bg-blue-600 text-white py-2 rounded`}
              disabled={isFormIncomplete || hasError || isLoading}
            >
              Submit Application
            </button>
          </form>
        </div>
      </div>

    </div>
  );
};

export default ApplyJob;