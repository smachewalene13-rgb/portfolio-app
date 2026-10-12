import "dotenv/config";
import bcrypt from "bcryptjs";
import prisma from "./prisma.js";

async function main() {
  const email = "admin@example.com";
  const plainPassword = "admin1234"; // change this to something strong
  const name = "Admin";

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    console.log(`User ${email} already exists. Skipping.`);
    return;
  }

  const hash = await bcrypt.hash(plainPassword, 10);

  const user = await prisma.user.create({
    data: { email, password: hash, name },
  });

  console.log(`✓ Created user: ${user.email}`);
  console.log(`  Email:    ${email}`);
  console.log(`  Password: ${plainPassword}`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());