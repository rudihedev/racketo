import { prisma } from "../src/lib/prisma";
import { dataRackets } from "../src/modules/racket/data";

async function main() {
  for (const racket of dataRackets) {
    await prisma.racket.upsert({
      where: { slug: racket.slug },
      update: {
        brand: racket.brand,
        name: racket.name,
        slug: racket.slug,
        weight: racket.weight,
      },
      create: {
        brand: racket.brand,
        name: racket.name,
        slug: racket.slug,
        weight: racket.weight,
      },
    });

    console.log(`🏸 Racket: ${racket.name}`);
  }
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
