import { ImageType } from '../shared/shared.types';

export interface ImageProps {
  imageUrl: string;
  imageType: ImageType;
  altText: string;
}
