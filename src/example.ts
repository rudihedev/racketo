import { prisma } from "./lib/prisma";

async function main() {
  const newRacket = await prisma.racket.create({
    data: {
      brand: "Flypower",
      name: "Tornado 800",
      slug: "tornado-800",
      weight: "3U",
    },
  });
  console.log("Created racket:", newRacket);
}

// Fetch all users with their posts
//   const allUsers = await prisma.user.findMany({
//     include: {
//       posts: true,
//     },
//   });
//   console.log("All users:", JSON.stringify(allUsers, null, 2));
// }

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
