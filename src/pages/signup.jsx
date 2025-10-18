// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function Signup() {
//   const navigate = useNavigate();
//   const [userName, setName] = useState("");
//   const [password, setPassword] = useState("");
//   const [emailId, setEmail] = useState("");
//   const [role, setRole] = useState("");

//   // Handle form submission
//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     const userData = {
//       emailId,
//       userName,
//       password,
//       role,
//     };

//     try {
//       const res = await axios.post(
//         "http://localhost:3663/api/signup",
//         userData,
//         {
//           withCredentials: true,
//         }
//       );
//       console.log("Hello Signup Response");
//       console.log(res);
//       navigate("/");
//     } catch (err) {
//       console.error("Signup failed:", err);
//     }
//   };

//   return (
//     <div className="flex flex-row justify-center items-center h-screen bg-[#0C2340]">
//       <div className="bg-white h-auto w-80 rounded-md">
//         <div className="flex flex-1 flex-col">
//           <div className="pl-7 pt-10">
//             <form onSubmit={handleSubmit}>
//               <h1 className="text-2xl font-semibold text-center mr-5 mb-14">
//                 CREATE USER
//               </h1>

//               <input
//                 className="bg-gray-200 pl-3 py-2 mb-3"
//                 type="text"
//                 name="name"
//                 placeholder="Username"
//                 value={userName}
//                 required
//                 onChange={(e) => setName(e.target.value)}
//               />
//               <input
//                 className="bg-gray-200 pl-3 py-2 mb-3"
//                 type="password"
//                 name="password"
//                 placeholder="Password"
//                 value={password}
//                 required
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//               <input
//                 className="bg-gray-200 pl-3 py-2 mb-3"
//                 type="email"
//                 name="email"
//                 placeholder="Email ID"
//                 value={emailId}
//                 required
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//               <select
//                 className="bg-gray-200 pl-3 pr-[5.7rem] py-2 mb-5"
//                 name="role"
//                 value={role}
//                 onChange={(e) => setRole(e.target.value)}
//               >
//                 <option value="" disabled>
//                   Select a role
//                 </option>
//                 <option value="superAdmin">Super Admin</option>
//                 <option value="hod">HOD</option>
//                 <option value="compHod">HOD (Computer)</option>
//                 <option value="mechHod">HOD (Mechanical)</option>
//                 <option value="extcHod">HOD (EXTC)</option>
//                 <option value="electricalHod">HOD (Electrical)</option>
//                 <option value="itHod">HOD (IT)</option>
//                 <option value="bshHod">HOD (BSH)</option>
//                 <option value="teach_staff">Teaching Staff</option>
//                 <option value="non_teach_staff">Non-Teaching Staff</option>
//                 <option value="principal">Principal</option>
//               </select>

//               <button
//                 className="bg-[#0C2340] text-white px-[6.7vw] py-2 rounded-[4px] mt-2 mb-14 flex-nowrap"
//                 type="submit"
//               >
//                 Create User
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Signup;

import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function DynamicSignup() {
  const navigate = useNavigate();
  const [userName, setName] = useState("");
  const [password, setPassword] = useState("");
  const [emailId, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [availableRoles, setAvailableRoles] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch available roles from backend
  useEffect(() => {
    fetchAvailableRoles();
  }, []);

  const fetchAvailableRoles = async () => {
    try {
      // This should be an API call to get all available roles
      const response = await axios.get(
        `${import.meta.env.VITE_admin_server}/api/roles`,
        {
          withCredentials: true,
        }
      );
      setAvailableRoles(response.data.roles);
    } catch (err) {
      console.error("Failed to fetch roles:", err);
      // Fallback to default roles if API fails
      setAvailableRoles([
        { id: "superAdmin", name: "superAdmin", displayName: "Super Admin" },
        { id: "compHod", name: "compHod", displayName: "HOD (Computer)" },
        { id: "mechHod", name: "mechHod", displayName: "HOD (Mechanical)" },
        { id: "extcHod", name: "extcHod", displayName: "HOD (EXTC)" },
        {
          id: "electricalHod",
          name: "electricalHod",
          displayName: "HOD (Electrical)",
        },
        { id: "itHod", name: "itHod", displayName: "HOD (IT)" },
        { id: "bshHod", name: "bshHod", displayName: "HOD (BSH)" },
        {
          id: "teach_staff",
          name: "teach_staff",
          displayName: "Teaching Staff",
        },
        {
          id: "non_teach_staff",
          name: "non_teach_staff",
          displayName: "Non-Teaching Staff",
        },
        { id: "principal", name: "principal", displayName: "Principal" },
        { id: "admin", name: "admin", displayName: "Admin" },
      ]);
    }
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const userData = {
      emailId,
      userName,
      password,
      role,
    };

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_admin_server}/api/signup`,
        userData,
        {
          withCredentials: true,
        }
      );
      console.log("Signup Response:", res);

      // Show success message
      alert(
        `User created successfully with role: ${
          availableRoles.find((r) => r.name === role)?.displayName || role
        }`
      );

      // Reset form
      setName("");
      setPassword("");
      setEmail("");
      setRole("");

      // Navigate back or to users list
      navigate("/dashboard");
    } catch (err) {
      console.error("Signup failed:", err);
      alert("Failed to create user. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    return userName && password && emailId && role;
  };

  return (
    <div className="flex flex-row justify-center items-center min-h-screen bg-[#0C2340] p-4">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg">
        <div className="flex flex-col p-8">
          <form onSubmit={handleSubmit}>
            <h1 className="text-2xl font-semibold text-center mb-8 text-gray-800">
              CREATE USER
            </h1>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <input
                  className="w-full bg-gray-100 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  type="text"
                  name="name"
                  placeholder="Enter username"
                  value={userName}
                  required
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  className="w-full bg-gray-100 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  value={password}
                  required
                  minLength="6"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email ID
                </label>
                <input
                  className="w-full bg-gray-100 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  type="email"
                  name="email"
                  placeholder="Enter email address"
                  value={emailId}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <select
                  className="w-full bg-gray-100 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  name="role"
                  value={role}
                  required
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="" disabled>
                    Select a role
                  </option>
                  {availableRoles.map((roleOption) => (
                    <option key={roleOption.id} value={roleOption.name}>
                      {roleOption.displayName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <button
                className={`w-full py-2 px-4 rounded-md text-white font-medium ${
                  validateForm() && !loading
                    ? "bg-[#0C2340] hover:bg-[#0a1d35] focus:ring-2 focus:ring-blue-500"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                type="submit"
                disabled={!validateForm() || loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Creating User...
                  </div>
                ) : (
                  "Create User"
                )}
              </button>

              <button
                type="button"
                onClick={() => navigate(-1)}
                className="w-full py-2 px-4 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 focus:ring-2 focus:ring-blue-500"
              >
                Cancel
              </button>
            </div>
          </form>

          {/* Role Information */}
          {role && (
            <div className="mt-6 p-4 bg-blue-50 rounded-md">
              <h3 className="text-sm font-medium text-blue-800 mb-2">
                Selected Role Information:
              </h3>
              <p className="text-sm text-blue-700">
                <strong>Role:</strong>{" "}
                {availableRoles.find((r) => r.name === role)?.displayName ||
                  role}
              </p>
              <p className="text-sm text-blue-700">
                <strong>Role ID:</strong> {role}
              </p>
            </div>
          )}

          {/* Instructions for SuperAdmin */}
          <div className="mt-4 p-4 bg-gray-50 rounded-md">
            <h3 className="text-sm font-medium text-gray-800 mb-2">Note:</h3>
            <p className="text-xs text-gray-600">
              • User permissions are managed through the Role Management system
            </p>
            <p className="text-xs text-gray-600">
              • Contact SuperAdmin to modify role permissions
            </p>
            <p className="text-xs text-gray-600">
              • New roles can be created from the Role Management panel
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DynamicSignup;
