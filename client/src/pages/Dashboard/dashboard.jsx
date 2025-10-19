import React from "react";
import SpecCard from "../../components/specCard";

const Dashboard = () => {
  return (
    <div className="">
      <p className="font-inter text-3xl font-semibold pt-10 pl-5 mb-10 text-center">
        Personal Account
      </p>
      <div className="flex flex-wrap gap-y-10 gap-x-5 justify-evenly">
        <SpecCard title="Running VMs" />
        <SpecCard title="Total VMs" />
        <SpecCard title="Balance" />
        <SpecCard title="Last Payment" />
        <SpecCard title="CPU Quota" />
        <SpecCard title="RAM Quota" />
        <SpecCard title="Disk Quota" />
        <SpecCard title="VM Quota" />
        <SpecCard title="Bonus Balance" />
      </div>
    </div>
  );
};

export default Dashboard;
