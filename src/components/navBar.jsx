import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../services/useAuthCheck";
import SearchBar from "./searchBar";
import { toast } from "react-toastify";

const NavBar = () => {
  const [isUserOpen, setIsUserOpen] = useState(false);
  const [facultyName, setFacultyName] = useState("Loading..."); // Initial state
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.id) {
      setFacultyName("Guest"); // Fallback if no user
      return;
    }

    const fetchFacultyName = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_admin_server}/api/profile/${user.id}`,
          { withCredentials: true }
        );
        setFacultyName(response.data.name || "Unknown"); // Set name or fallback
      } catch (error) {
        console.error("Fetch faculty name error:", error);
        setFacultyName("Undefined");
      }
    };

    fetchFacultyName();
  }, [user]); // Re-run if user changes

  const handleUserClick = () => {
    setIsUserOpen((prevstate) => !prevstate);
  };

  const handleSignout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_admin_server}/api/signout`,
        {},
        { withCredentials: true }
      );
      console.log("Successfully Logged Out");
      navigate("/login");
    } catch (error) {
      console.log("Logout Error:", error);
      toast.error("Error signing out");
    }
  };

  if (!user) {
    return null;
  }

  console.log(user.role);

  return (
    <>
      <div className="z-10 fixed w-full">
        <div className="bg-[#AE9142] h-[3px] w-full top-0"></div>
        <div className="bg-[#f4f4f4] h-16 w-full top-[3px] bottom-0 border-b-[0.5px] border-[#888888]">
          <div className="flex flex-row justify-between">
            <Link to="/">
              <div className="pl-9 pt-4 text-[#0C2340] font-playfair text-2xl">
                VM-Billing
                {/* <p className="font-playfair text-[13px] font-[350] tracking-[0.5px] leading-6">
                  FR. CONCEICAO RODRIGUES
                </p>
                <p className="font-playfair font-thin text-[9px] tracking-[2.7px]">
                  INSTITUTE OF TECHNOLOGY
                </p> */}
              </div>
            </Link>
            {/* {user.role == "superAdmin" && (
              <div className="hidden md:block">
                <SearchBar />
              </div>
            )} */}
            <div className="text-[#0C2340] flex flex-row text-sm pr-10">
              {/* <p
                className="cursor-pointer mr-5 pt-[22px] font-light font-inter"
                onClick={handleUserClick}
              >
                {facultyName || "Undefined"}
              </p> */}
              <p
                className="cursor-pointer mr-5 pt-[22px] font-light font-inter"
                onClick={handleUserClick}
              >
                {user.role === "superAdmin" ? "SuperAdmin" : facultyName}
              </p>
              <div className="relative inline-block">
                <button
                  className="text-xs pt-6 pb-5 pr-6"
                  onClick={handleUserClick}
                >
                  ▼
                </button>
                {isUserOpen && (
                  <div className="absolute left-16 transform -translate-x-full py-4 px-5 space-y-4 bg-[#AE9142] text-nowrap">
                    {user.role !== "superAdmin" && (
                      <Link to="/profile">
                        <p className="mb-5">Edit Profile</p>
                      </Link>
                    )}

                    {/* <Link to="/profile">
                      <p>Edit Profile</p>
                    </Link> */}
                    <Link to="/change_password">
                      <p>Edit Account</p>
                    </Link>
                    {/* {(user.role === "hod" || user.role === "superAdmin") && (
                      <Link to="/hoddesk">
                        <p className="mt-5">HOD's Desk</p>
                      </Link>
                    )}
                    {(user.role === "principal" ||
                      user.role === "superAdmin") && (
                      <Link to="/principaldesk">
                        <p className="mt-5">Principal's Desk</p>
                      </Link>
                    )} */}
                    <Link to="/login">
                      <p className="mt-5">Switch User</p>
                    </Link>
                    <button onClick={handleSignout}>Sign Out</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
