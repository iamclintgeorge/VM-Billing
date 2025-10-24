import React, { useEffect, useState } from "react";
import SpecCard from "../../components/specCard";
import { CheckCircle, Cpu, Server, HardDrive } from "lucide-react";
import axios from "axios";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
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
      setStats(response.data.data);
      // console.log(response.data.data);
    } catch (err) {
      console.log("Error while fetching VM Stats:", err.message);
    }
  };

  const runningVMs = stats?.filter((vm) => vm.status === "running").length;
  const totalVMs = stats?.length;

  return (
    <>
      {!stats ? (
        <div className="flex w-[77vw] justify-center items-center">
          <p className="font-inter text-3xl font-normal pt-10 pl-5 mb-10 text-center">
            You don't have any active VMs!
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
              value={`${runningVMs} out of ${totalVMs}`}
              icon={CheckCircle}
            />
            <SpecCard title="Total VMs" value={totalVMs} icon={CheckCircle} />
          </div>

          <p className="font-inter text-3xl font-semibold mt-20 pl-5 mb-10 text-center">
            Your Virtual Machines
          </p>

          <div className="flex flex-wrap gap-y-10 gap-x-5 justify-evenly">
            {stats.map((vm) => (
              <div key={vm.vmid} className="w-[30%]">
                <SpecCard
                  title={vm.name} // VM name
                  value={`CPU: ${vm.cpu}%, RAM: ${
                    vm.mem / 1024 / 1024
                  } MB, Disk: ${vm.disk / 1024 / 1024 / 1024} GB`}
                  status={vm.status}
                  icon={Server}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
