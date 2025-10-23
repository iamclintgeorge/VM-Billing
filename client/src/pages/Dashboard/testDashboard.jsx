import React from "react";

const TestDashboard = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#FF0000",
        padding: "50px",
        color: "#FFFFFF",
        fontSize: "24px",
      }}
    >
      <h1 style={{ fontSize: "48px", marginBottom: "20px" }}>
        TEST DASHBOARD - IF YOU SEE THIS, RENDERING WORKS!
      </h1>
      <p>This is a simple test dashboard with inline styles.</p>
      <p>Background should be RED.</p>
      <p>Text should be WHITE.</p>
      <div
        style={{
          backgroundColor: "#0000FF",
          padding: "20px",
          marginTop: "20px",
          borderRadius: "10px",
        }}
      >
        <p>This box should be BLUE</p>
      </div>
    </div>
  );
};

export default TestDashboard;
