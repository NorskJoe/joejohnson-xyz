import { ContentTileProps } from './content-tiles.types';
import styles from './content-tiles.module.scss';
import Tag from '../tag/tag';
import Image from '../image/image';

export function ContentTile({
  title,
  imageUrl,
  imageType,
  subTitle,
  summary,
  bodyText,
  tags,
}: ContentTileProps) {
  return (
    <div>
      <h1>{title}</h1>
      {imageUrl && imageType && <Image imageUrl={imageUrl} imageType={imageType} altText='placeholder' />}
      <h2>{subTitle}</h2>
      <h3>{summary}</h3>
      <p>{bodyText}</p>
      {tags && tags.map((tag, index) => <Tag key={index} name={tag.name} />)}
    </div>
  );
}

export default ContentTile;
