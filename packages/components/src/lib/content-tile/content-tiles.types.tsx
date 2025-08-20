import { ImageType } from '../shared/shared.types';
import { TagProps } from '../tag/tag.types';

export interface ContentTileProps {
  bodyText: string;
  ctaUrl?: string;
  imageType?: ImageType;
  imageUrl?: string;
  subTitle?: string;
  summary?: string;
  tags?: TagProps[];
  title: string;
}
