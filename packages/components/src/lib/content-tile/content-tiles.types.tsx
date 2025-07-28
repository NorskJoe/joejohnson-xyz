import { ImageType } from '../shared/shared.types';
import { TagProps } from '../tag/tag.types';

export interface ContentTileProps {
  imageUrl?: string;
  imageType?: ImageType;
  title: string;
  subTitle?: string;
  bodyText: string;
  ctaUrl?: string;
  summary?: string;
  tags?: TagProps[];
}
