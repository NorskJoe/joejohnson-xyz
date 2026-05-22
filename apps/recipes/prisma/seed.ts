import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../prisma/generated/client/client';
import { stringToMeasurementType } from '../src/libs/utils';

const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString: connectionString });
const prisma = new PrismaClient({ adapter });

async function seedMeasurementType() {
  await prisma.ingredientMeasurement.upsert({
    where: { type: stringToMeasurementType('GRAM') },
    update: {},
    create: { type: stringToMeasurementType('GRAM') },
  });
  await prisma.ingredientMeasurement.upsert({
    where: { type: stringToMeasurementType('KG') },
    update: {},
    create: { type: stringToMeasurementType('KG') },
  });
  await prisma.ingredientMeasurement.upsert({
    where: { type: stringToMeasurementType('TBSP') },
    update: {},
    create: { type: stringToMeasurementType('TBSP') },
  });
  await prisma.ingredientMeasurement.upsert({
    where: { type: stringToMeasurementType('TSP') },
    update: {},
    create: { type: stringToMeasurementType('TSP') },
  });
  await prisma.ingredientMeasurement.upsert({
    where: { type: stringToMeasurementType('CUP') },
    update: {},
    create: { type: stringToMeasurementType('CUP') },
  });
  await prisma.ingredientMeasurement.upsert({
    where: { type: stringToMeasurementType('ML') },
    update: {},
    create: { type: stringToMeasurementType('ML') },
  });
  await prisma.ingredientMeasurement.upsert({
    where: { type: stringToMeasurementType('LITRE') },
    update: {},
    create: { type: stringToMeasurementType('LITRE') },
  });
  await prisma.ingredientMeasurement.upsert({
    where: { type: stringToMeasurementType('PIECE') },
    update: {},
    create: { type: stringToMeasurementType('PIECE') },
  });
  await prisma.ingredientMeasurement.upsert({
    where: { type: stringToMeasurementType('OTHER') },
    update: {},
    create: { type: stringToMeasurementType('OTHER') },
  });
}

async function main() {
  await seedMeasurementType();
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
