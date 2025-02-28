import { useNavigate } from "react-router-dom";

function SignUpButton() {
  const navigate = useNavigate();

  const handleClick = () => {
    // Check if user is logged in (Assuming you store auth state in localStorage or context)
    const isLoggedIn = localStorage.getItem("userToken"); // Change this as per your auth logic

    if (isLoggedIn) {
      navigate("/courses"); // If logged in, go to Find Courses
    } else {
      navigate("/auth/login"); // If not logged in, go to Signup/Login page
    }
  };

  return (
    <div className="flex gap-4 justify-center items-center self-center mt-8 text-2xl font-bold tracking-wide leading-none text-white">
      <button
        onClick={handleClick}
        className="hover:border-white hover:bg-gray-600 cursor-pointer flex justify-center items-center self-stretch px-6 py-5 my-auto bg-[#7096D1] rounded-lg border-2 border-[#7096D1] border-solid max-md:px-5"
      >
        <span className="self-stretch px-6 my-auto max-md:px-8">Find Courses</span>
      </button>
    </div>
  );
}

export default SignUpButton;
