import { useParams, Link } from "react-router-dom"
import { currentOpenings } from "../data/jobs";

const CareerDetail = () => {
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
    )
  }
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-16 max-w-5xl">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <Link
            to="/careers"
            className="text-sm text-blue-600 hover:underline"
          >
            ← Back to Open Positions
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 my-4">
            {job.title}
          </h1>

          <div className="flex flex-wrap gap-3 mb-6">
            <span className="px-4 py-1 rounded-full text-sm bg-gray-100 text-gray-700" role="text">
              <span aria-hidden="true">📍</span> <span className="sr-only">Location:</span> {job.location}
            </span>
            <span className="px-4 py-1 rounded-full text-sm bg-gray-100 text-gray-700" role="text">
              <span aria-hidden="true">💼</span> <span className="sr-only">Experience:</span> {job.experience}
            </span>
            <span className="px-4 py-1 rounded-full text-sm bg-gray-100 text-gray-700" role="text">
              <span aria-hidden="true">⏱</span> <span className="sr-only">Type:</span> {job.type}
            </span>
          </div>

          <Link
            to={`/careers/${job.slug}/apply`}
            className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition"
          >
            Apply Now
          </Link>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-8">
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

          {/* Sidebar */}
          <div className="bg-white rounded-xl shadow-sm p-6 h-fit sticky top-24">
            <h4 className="text-lg font-semibold mb-4">
              Ready to apply?
            </h4>
            <p className="text-gray-600 mb-6">
              Take the next step in your career and apply for this role.
            </p>

            <Link
              to={`/careers/${job.slug}/apply`}
              className="block text-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition"
            >
              Apply Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CareerDetail