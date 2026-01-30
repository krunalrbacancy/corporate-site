import { Link, useNavigate, useParams } from "react-router-dom";
import { currentOpenings } from "../data/jobs";

const ApplyJob = () => {
  const navigate = useNavigate();
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
  
  return (
    <div className="container mx-auto px-4 py-16">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="text-sm text-blue-600 hover:underline"
      >
        ← Back to Job Details
      </button>
      <h1 className="text-3xl font-bold mt-2 mb-6">
        Apply for {job.title}
      </h1>

      <p className="text-gray-600 mb-8">
        {job.location} · {job.type}
      </p>

      {/* FORM COMES LATER */}
      <div className="border rounded-lg p-6 text-gray-500">
        Application form will go here
      </div>
    </div>
  );
};

export default ApplyJob;