import { MeasurementType } from '../prisma/generated/client/enums';
import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../prisma/generated/client/client';

function stringToMeasurementType(str: string): MeasurementType {
  return MeasurementType[
    str as keyof typeof MeasurementType
  ] as MeasurementType;
}
const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString: connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.ingredientMeasurement.upsert({
    where: { type: stringToMeasurementType('GRAMS') },
    update: {},
    create: { type: stringToMeasurementType('GRAMS') },
  });
  await prisma.ingredientMeasurement.upsert({
    where: { type: stringToMeasurementType('KGS') },
    update: {},
    create: { type: stringToMeasurementType('KGS') },
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
    where: { type: stringToMeasurementType('OTHER') },
    update: {},
    create: { type: stringToMeasurementType('OTHER') },
  });
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
