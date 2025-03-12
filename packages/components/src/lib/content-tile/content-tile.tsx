import { ContentTileProps } from './content-tiles.types';
import styles from './content-tiles.module.scss';
import Tag from '../tag/tag';
import Image from '../image/image';

const ContentTile = ({
  title,
  imageUrl,
  imageType,
  subTitle,
  summary,
  bodyText,
  tags,
}: ContentTileProps) => {
  return (
    <div className={styles['container']}>
      <h1>{title}</h1>
      {imageUrl && (
        <Image
          imageUrl={imageUrl}
          imageType={imageType}
          altText="placeholder"
        />
      )}
      <h2>{subTitle}</h2>
      <h3>{summary}</h3>
      <div className={styles['detail-content']}>
        <p className={styles['body-text']}>{bodyText}</p>
        {tags &&
          tags.map((tag, index) => (
            <Tag key={index} name={tag.name} size={tag.size} />
          ))}
      </div>
    </div>
  );
};

export default ContentTile;
