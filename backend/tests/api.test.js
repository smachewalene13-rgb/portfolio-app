import app from "../src/app.js";

async function runSmokeTests() {
  console.log("🧪 Starting backend API smoke tests...\n");
  const server = app.listen(5099);

  try {
    const baseUrl = "http://localhost:5099/api/v1";

    // Test 1: Health
    console.log("1. Testing GET /api/v1/health");
    let res = await fetch(`${baseUrl}/health`);
    let data = await res.json();
    if (res.status !== 200 || data.status !== "ok") throw new Error("Health check failed");
    console.log("   ✓ Health check passed:", data.status);

    // Test 2: Profile
    console.log("2. Testing GET /api/v1/profile");
    res = await fetch(`${baseUrl}/profile`);
    data = await res.json();
    if (res.status !== 200 || !data.name) throw new Error("Get profile failed");
    console.log("   ✓ Profile retrieved:", data.name, "-", data.title);

    // Test 3: Projects
    console.log("3. Testing GET /api/v1/projects");
    res = await fetch(`${baseUrl}/projects`);
    data = await res.json();
    if (res.status !== 200 || !Array.isArray(data)) throw new Error("Get projects failed");
    console.log(`   ✓ Projects retrieved (${data.length} items)`);

    // Test 4: Skills
    console.log("4. Testing GET /api/v1/skills");
    res = await fetch(`${baseUrl}/skills`);
    data = await res.json();
    if (res.status !== 200 || !Array.isArray(data)) throw new Error("Get skills failed");
    console.log(`   ✓ Skills retrieved (${data.length} items)`);

    // Test 5: Experience
    console.log("5. Testing GET /api/v1/experience");
    res = await fetch(`${baseUrl}/experience`);
    data = await res.json();
    if (res.status !== 200 || !Array.isArray(data)) throw new Error("Get experience failed");
    console.log(`   ✓ Experience retrieved (${data.length} items)`);

    // Test 6: Education
    console.log("6. Testing GET /api/v1/education");
    res = await fetch(`${baseUrl}/education`);
    data = await res.json();
    if (res.status !== 200 || !Array.isArray(data)) throw new Error("Get education failed");
    console.log(`   ✓ Education retrieved (${data.length} items)`);

    // Test 7: Contact Submission
    console.log("7. Testing POST /api/v1/contact");
    res = await fetch(`${baseUrl}/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Test Recruiter",
        email: "recruiter@example.com",
        subject: "Interview Invitation",
        message: "Hello Simachew, we loved your portfolio!",
      }),
    });
    data = await res.json();
    if (res.status !== 201 || !data.success) throw new Error("Contact submission failed");
    console.log("   ✓ Contact message submitted successfully");

    // Test 8: Admin Login
    console.log("8. Testing POST /api/v1/auth/login");
    res = await fetch(`${baseUrl}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "smachewalene13@gmail.com",
        password: "admin1234",
      }),
    });
    data = await res.json();
    if (res.status !== 200 || !data.token) throw new Error("Admin login failed");
    console.log("   ✓ Admin logged in successfully! Token received.");

    console.log("\n🎉 ALL 8 BACKEND API TESTS PASSED SUCCESSFULLY!");
  } catch (err) {
    console.error("\n❌ Smoke test failed:", err.message);
    process.exitCode = 1;
  } finally {
    server.close();
  }
}

runSmokeTests().then(() => {
  setTimeout(() => process.exit(process.exitCode || 0), 500);
});
