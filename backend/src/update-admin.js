import "dotenv/config";
import bcrypt from "bcryptjs";
import prisma from "./prisma.js";

async function main() {
  const currentEmail = "admin@example.com";    // the email the seed created
  const newEmail = "simachewalene13@gmail.com";
  const newPassword = "sami1234";
  const newName = "Simachew";

  const user = await prisma.user.findUnique({ where: { email: currentEmail } });
  if (!user) {
    console.error(`✗ User ${currentEmail} not found`);
    process.exit(1);
  }

  const hash = await bcrypt.hash(newPassword, 10);

  const updated = await prisma.user.update({
    where: { id: user.id },
    data: { email: newEmail, password: hash, name: newName },
  });

  console.log("✓ Admin updated");
  console.log("  Email:    ", updated.email);
  console.log("  Name:     ", updated.name);
  console.log("  Password:  (updated, hidden)");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());