import { MeasurementType } from '@generated/enums';

export const stringToMeasurementType = (str: string): MeasurementType => {
  return MeasurementType[
    str as keyof typeof MeasurementType
  ] as MeasurementType;
};

export const measurementTypeToString = (type: MeasurementType): string => {
  return type === MeasurementType.OTHER ? '' : type.toString().toLowerCase();
};

export const titleSlugify = (title: string): string => {
  return title.toLowerCase().replace(/\s+/g, '-');
};
