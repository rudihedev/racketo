import { prisma } from "../src/lib/prisma";
import { dataRackets } from "../src/modules/racket/data";

async function main() {
  for (const brand of dataBrands) {
    // TODO...
  }

  for (const racket of dataRackets) {
    await prisma.racket.upsert({
      where: { slug: racket.slug },
      update: {
        name: racket.name,
        slug: racket.slug,
        weight: racket.weight,
        brand: {
          connect: {
            slug: racket.brandSlug,
          },
        },
      },
      create: {
        name: racket.name,
        slug: racket.slug,
        weight: racket.weight,
        brand: {
          connect: {
            slug: racket.brandSlug,
          },
        },
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
