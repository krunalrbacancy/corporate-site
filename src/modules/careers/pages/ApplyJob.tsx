import { Link, useParams } from "react-router-dom";
import { currentOpenings } from "../data/jobs";
import { useState } from "react";

const EMPTYSTATE = {
  full_name: "",
  email: "",
  phone: "",
  resume: null,
  message: "",
};
type ApplyJobProps = {
  full_name: string;
  email: string;
  phone: string;
  resume: File | null;
  message: string;
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

  const [formData, setFormData] = useState<ApplyJobProps>(EMPTYSTATE);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    console.log(name);
    
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
        <form className="max-w-xl bg-white border rounded-lg p-6 space-y-5">
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
            />
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
              placeholder="john@example.com"
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-1">
              Phone (optional)
            </label>
            <input
              type="tel"
              id="phone"
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
              className="w-full"
              accept=".pdf,.doc,.docx"
            />
            <p className="text-xs text-gray-500 mt-1">
              Accepted formats: PDF, DOC, DOCX (Max 5MB)
            </p>
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
            type="button"
            className="cursor-pointer w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Submit Application
          </button>
        </form>
      </div>

    </div>
  );
};

export default ApplyJob;