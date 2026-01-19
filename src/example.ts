import { prisma } from "./lib/prisma";

async function main() {
  // const newRacket = await prisma.racket.create({
  //   data: {
  //     brand: "HiQua",
  //     name: "Smasher 900",
  //     slug: "smasher-900",
  //     weight: "4U",
  //   },
  // });
  // console.log("Created racket:", newRacket);

  const allRackets = await prisma.racket.findMany();

  // Fetch all users with their posts
  console.log(allRackets);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
