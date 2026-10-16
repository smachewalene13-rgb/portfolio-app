import app from "../src/app.js";

async function runAuthTest() {
  console.log("🧪 Testing Auth Endpoints...");
  const server = app.listen(5093);
  try {
    const res = await fetch("http://localhost:5093/api/v1/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "smachewalene13@gmail.com",
        password: "admin1234",
      }),
    });
    const data = await res.json();
    if (res.status !== 200 || !data.token) {
      throw new Error(`POST /api/v1/auth/login failed: ${JSON.stringify(data)}`);
    }
    console.log("✓ POST /api/v1/auth/login passed successfully (token received)");
  } finally {
    server.close();
  }
}

runAuthTest()
  .then(() => {
    setTimeout(() => process.exit(0), 100);
  })
  .catch((err) => {
    console.error("❌ Auth test error:", err);
    setTimeout(() => process.exit(1), 100);
  });
