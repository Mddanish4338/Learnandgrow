import { useEffect, useState } from "react";
import { getCompanyById } from "../../services/companyService";

const AppliedJobs = ({ jobs }) => {
  const [companyInfo, setCompanyInfo] = useState({});

  useEffect(() => {
    if (jobs.length > 0) {
      jobs.forEach(async (job) => {
        // console.log("Fetching company details for:", job.companyId);
        if (job.companyId) {
          try {
            const company = await getCompanyById(job.companyId);
            // console.log("Fetched company data:", company);
            // console.log(company.logo)
            setCompanyInfo((prev) => ({ ...prev, [job.companyId]: company }));
          } catch (error) {
            console.error("Error fetching company:", error);
          }
        }
      });
    }
  }, [jobs]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Applied Jobs</h2>
      {jobs.length === 0 ? (
        <p className="text-gray-500">No applied jobs yet.</p>
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => (
            <div key={job.id} className="p-4 border bg-gray-100 rounded-lg shadow-sm">
              <div className="flex items-center space-x-4">
                {companyInfo[job.companyId]?.logo ? (
                  <img
                    src={companyInfo[job.companyId].logo}
                    alt={companyInfo[job.companyId]?.name || "Company"}
                    className="w-10 h-10 object-contain rounded-full"
                  />
                ) : (
                  <div className="w-10 h-10 flex items-center justify-center bg-red-300 text-white rounded-full text-sm font-semibold">
                    {companyInfo[job.companyId]?.name?.slice(0, 2).toUpperCase() || "NA"}
                  </div>
                )}

                <div>
                  <h3 className="font-semibold">{job.jobTitle || "Job Title"}</h3>
                  <p className="text-gray-500">
                    {companyInfo[job.companyId]?.name || "Unknown Company"}
                  </p>
                  <p className="text-sm text-blue-600">{job.status || "Applied"}</p>
                </div>
              </div>

              {/* Applied Date Section */}
              <div className="mt-3">
                <p className="text-sm text-gray-500">
                  <span className="text-green-500 mr-1">Applied:</span>
                  {job.postedAt
                    ? new Date(job.postedAt.seconds * 1000).toLocaleDateString("en-GB")
                    : "N/A"}
                </p>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AppliedJobs;
