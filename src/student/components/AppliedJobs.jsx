import useAppliedJobs from "../../hooks/useAppliedJobs";

const AppliedJobs = ({ jobs }) => {
  // Fetch jobs from hook if not provided as props
  const appliedJobs = useAppliedJobs() || jobs;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Applied Jobs</h2>
      {appliedJobs.length === 0 ? (
        <p className="text-gray-500">No applied jobs yet.</p>
      ) : (
        <div className="space-y-4">
          {appliedJobs.map((job) => (
            <div
              key={job.id}
              className="p-4 border bg-gray-100 rounded-lg shadow-sm"
            >
              <div className="flex items-center space-x-4">
                {job.logo ? (
                  <img src={job.logo} alt={job.company} className="w-10 h-10" />
                ) : (
                  <div className="w-10 h-10 flex items-center justify-center bg-red-300 text-white rounded-full text-sm font-semibold">
                    {job.company?.slice(0, 2).toUpperCase()}
                  </div>
                )}
                <div>
                  <h3 className="font-semibold">{job.title}</h3>
                  <p className="text-gray-500">{job.company}</p>
                  {job.status ? (
                    <p className="text-sm text-blue-600">{job.status}</p>
                  ) : (
                    <p className="text-sm text-gray-400">
                      Status: Not available
                    </p>
                  )}
                </div>
              </div>

              {/* Applied Date Section */}
              <div className="mt-2">
                {job.appliedDate ? (
                  <p className="text-sm text-gray-500">
                    Applied: {job.appliedDate}
                  </p>
                ) : (
                  <p className="text-sm text-gray-400">
                    Applied date not available
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AppliedJobs;
