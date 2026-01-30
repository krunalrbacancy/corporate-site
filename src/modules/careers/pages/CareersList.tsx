import Meta from "../../../components/common/Meta";
import JobCard from "../components/JobCard";
import { currentOpenings } from "../data/jobs";

const CareersList = () => {
  return (
    <>
      <Meta title="Corporate | Careers" />
      <section className="my-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-semibold text-center mb-8">Open Positions</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {currentOpenings.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default CareersList;
