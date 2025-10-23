import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../services/useAuthCheck";
import axios from "axios";

export const SectionContext = React.createContext({
  setSelectedSection: () => {},
});

const DynamicSideBar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [permissionsData, setPermissionsData] = useState([]);
  const [userPermissions, setUserPermissions] = useState([]);

  // State for managing open/closed sections
  // const [openSections, setOpenSections] = useState({
  //   home: false,
  //   about: false,
  //   academic: false,
  //   user: false,
  //   research: false,
  //   department: false,
  //   departments: {
  //     "computer-engineering": false,
  //     "mechanical-engineering": false,
  //     extc: false,
  //     "electrical-engineering": false,
  //     "computer-science-and-engineering": false,
  //     "basic-science-and-humanities": false,
  //   },
  //   humanResource: false,
  //   hodDesk: false,
  //   iqac: false,
  // });

  // useEffect(() => {
  //   fetchPermissions();
  // }, []);

  // useEffect(() => {
  //   if (user) {
  //     fetchUserPermissions(user.role);
  //     console.log("user.role", user.role);
  //   }
  // }, [user, permissionsData]);

  // const fetchPermissions = async () => {
  //   try {
  //     const permissionRes = await axios.get(
  //       `${import.meta.env.VITE_admin_server}/api/fetchroles`
  //     );
  //     setPermissionsData(permissionRes.data);
  //     console.log("Permissions", permissionRes.data);
  //   } catch (error) {
  //     console.log("Error Fetching Permissions", error);
  //   }
  // };

  // const fetchUserPermissions = async (userRole) => {
  //   const roleData = permissionsData.find((role) => role.name === userRole);
  //   console.log("roleData", roleData);
  //   setUserPermissions(roleData ? roleData.permissions : []); // Set permissions based on role
  // };

  // const hasPermission = (permission) => {
  //   if (!userPermissions.length) return false;
  //   if (userPermissions.includes("all")) return true;
  //   return userPermissions.includes(permission);
  // };

  // const includePermission = (suffix) => {
  //   if (!userPermissions.length) return false;
  //   if (userPermissions.includes("all")) return true;
  //   const normalizedSuffix = suffix.toLowerCase(); // Normalize case
  //   return userPermissions.some((permission) =>
  //     permission
  //       .toLowerCase()
  //       .replace(/[^a-zA-Z0-9]/g, "")
  //       .endsWith(normalizedSuffix)
  //   );
  // };

  // const hasDepartmentAccess = () => {
  //   return Object.keys(PERMISSIONS_CONFIG).some(
  //     (perm) => perm.startsWith("departments.") && hasPermission(perm)
  //   );
  // };

  // const toggleSection = (section, department = null) => {
  //   if (department) {
  //     setOpenSections((prev) => ({
  //       ...prev,
  //       departments: {
  //         ...prev.departments,
  //         [department]: !prev.departments[department],
  //       },
  //     }));
  //   } else {
  //     setOpenSections((prev) => ({
  //       ...prev,
  //       [section]: !prev[section],
  //     }));
  //   }
  // };

  // const handleDepartmentSectionSelect = (deptName, section) => {
  //   // localStorage.setItem("departmentSection", `${deptName}/${section}`);
  //   navigate(
  //     `/department/${deptName}/${section.toLowerCase().replace(/ /g, "-")}`
  //   );
  //   setTimeout(() => {
  //     window.dispatchEvent(
  //       new CustomEvent("department-section-selected", {
  //         detail: { deptName, section },
  //       })
  //     );
  //   }, 50);
  // };

  if (!user) return null;

  return (
    <div className="bg-[#f4f4f4] mt-16 min-h-screen max-h-auto w-64 text-[#0C2340] pb-10 sticky top-0 z-0 border-r-2 border-gray-400">
      <div className="flex flex-col pt-9 pl-5 space-y-6 text-base font-light font-inter">
        {/* Dashboard - Always visible */}
        <Link to="/dashboard">
          <div className="mr-8 hover:border-b-[1px] border-gray-500">
            <p className="flex justify-between pb-3">Dashboard</p>
          </div>
        </Link>
        <Link to="/order-vm">
          <div className="mr-8 hover:border-b-[1px] border-gray-500">
            <p className="flex justify-between pb-3">Order VM</p>
          </div>
        </Link>
        <Link to="/my-vms">
          <div className="mr-8 hover:border-b-[1px] border-gray-500">
            <p className="flex justify-between pb-3">My VMs</p>
          </div>
        </Link>
        <Link to="/billing">
          <div className="mr-8 hover:border-b-[1px] border-gray-500">
            <p className="flex justify-between pb-3">Billing</p>
          </div>
        </Link>
        <Link to="/setting">
          <div className="mr-8 hover:border-b-[1px] border-gray-500">
            <p className="flex justify-between pb-3">Setting</p>
          </div>
        </Link>
        <Link to="/support">
          <div className="mr-8 hover:border-b-[1px] border-gray-500">
            <p className="flex justify-between pb-3">Support</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default DynamicSideBar;
