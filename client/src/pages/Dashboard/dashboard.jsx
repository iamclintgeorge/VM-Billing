import React from "react";
import SpecCard from "../../components/specCard";
import { CheckCircle, Cpu, Server } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="">
      <p className="font-inter text-3xl font-semibold pt-10 pl-5 mb-10 text-center">
        Personal Account
      </p>
      <div className="flex flex-wrap gap-y-10 gap-x-5 justify-evenly">
        <SpecCard title="Running VMs" value={3} total={10} icon={CheckCircle} />
        <SpecCard title="Total VMs" value={3} total={10} icon={CheckCircle} />
        <SpecCard title="Balance" value={3} total={10} icon={CheckCircle} />
        <SpecCard
          title="Last Payment"
          value={3}
          total={10}
          icon={CheckCircle}
        />
        <SpecCard title="CPU Quota" value={8} total={16} icon={Cpu} />
        <SpecCard title="RAM Quota" value={8} total={16} icon={Cpu} />
        <SpecCard title="Disk Quota" value={8} total={16} icon={Cpu} />
        <SpecCard title="VM Quota" value={8} total={16} icon={Cpu} />
        <SpecCard title="Bonus Balance" value={8} total={16} icon={Cpu} />
      </div>
    </div>
  );
};

export default Dashboard;
