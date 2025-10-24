import React, { useEffect, useState } from "react";
import SpecCard from "../../components/specCard";
import { CheckCircle, Cpu, Server } from "lucide-react";
import axios from "axios";

const Dashboard = () => {
  const [stats, setStats] = useState();
  const nodeName = "clint-george";

  useEffect(() => {
    fetchVMStats();
  }, []);
  const fetchVMStats = async () => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_admin_server
        }/api/proxmox/fetchVMStats/${nodeName}`,
        { withCredentials: true }
      );
      setStats(response);
      console.log(response);
    } catch (err) {
      console.log("Error while fetching VM Stats:", err.message);
    }
  };
  return (
    <>
      {!stats ? (
        <div className="flex w-[77vw] justify-center items-center">
          <p className="font-inter text-3xl font-normal pt-10 pl-5 mb-10 text-center">
            You don't have any VMs!
          </p>
        </div>
      ) : (
        <div className="w-[77vw]">
          <p className="font-inter text-3xl font-semibold pt-10 pl-5 mb-10 text-center">
            Quick Stats
          </p>
          <div className="flex flex-wrap gap-y-10 gap-x-5 justify-evenly">
            <SpecCard
              title="Running VMs"
              value={3}
              total={10}
              icon={CheckCircle}
            />
            <SpecCard
              title="Total VMs"
              value={3}
              total={10}
              icon={CheckCircle}
            />
            {/* <SpecCard title="CPU Quota" value={8} total={16} icon={Cpu} />
            <SpecCard title="RAM Quota" value={8} total={16} icon={Cpu} />
            <SpecCard title="Disk Quota" value={8} total={16} icon={Cpu} />
            <SpecCard title="VM Quota" value={8} total={16} icon={Cpu} /> */}
          </div>

          <p className="font-inter text-3xl font-semibold mt-20 pl-5 mb-10 text-center">
            Your Virtual Machines
          </p>
        </div>
      )}
    </>
  );
};

export default Dashboard;
