import { MeasurementType } from '../../prisma/generated/client/enums';

export const stringToMeasurementType = (str: string): MeasurementType => {
  return MeasurementType[
    str as keyof typeof MeasurementType
  ] as MeasurementType;
};

export const titleSlugify = (title: string): string => {
  return title.toLowerCase().replace(/\s+/g, '-');
};
