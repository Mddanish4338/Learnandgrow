import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const THeader = ({ profileImage, onLogout }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white p-4 flex justify-between items-center shadow-md">
      <h2 className="text-2xl font-bold">Trainer Dashboard</h2>
    </div>
  );
};

export default THeader;