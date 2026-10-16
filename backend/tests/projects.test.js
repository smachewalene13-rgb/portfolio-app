import app from "../src/app.js";

async function runProjectsTest() {
  console.log("🧪 Testing Projects Endpoints...");
  const server = app.listen(5091);
  try {
    const res = await fetch("http://localhost:5091/api/v1/projects");
    const data = await res.json();
    if (res.status !== 200 || !Array.isArray(data)) {
      throw new Error(`GET /api/v1/projects failed with status ${res.status}`);
    }
    console.log(`✓ GET /api/v1/projects passed (${data.length} projects retrieved)`);
  } finally {
    server.close();
  }
}

runProjectsTest()
  .then(() => {
    setTimeout(() => process.exit(0), 100);
  })
  .catch((err) => {
    console.error("❌ Projects test error:", err);
    setTimeout(() => process.exit(1), 100);
  });
