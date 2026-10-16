import app from "../src/app.js";

async function runContactTest() {
  console.log("🧪 Testing Contact Endpoints...");
  const server = app.listen(5092);
  try {
    const res = await fetch("http://localhost:5092/api/v1/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Test Recruiter",
        email: "recruiter@example.com",
        subject: "Full-Stack Opportunity",
        message: "Hi Simachew, great portfolio!",
      }),
    });
    const data = await res.json();
    if (res.status !== 201 || !data.success) {
      throw new Error(`POST /api/v1/contact failed: ${JSON.stringify(data)}`);
    }
    console.log("✓ POST /api/v1/contact passed successfully");
  } finally {
    server.close();
  }
}

runContactTest()
  .then(() => {
    setTimeout(() => process.exit(0), 100);
  })
  .catch((err) => {
    console.error("❌ Contact test error:", err);
    setTimeout(() => process.exit(1), 100);
  });
