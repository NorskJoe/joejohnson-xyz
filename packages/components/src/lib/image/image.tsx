import { createWriteStream } from 'fs';
import { ImageType } from '../shared/shared.types';
import styles from './image.module.scss';
import { ImageProps } from './image.types';

const Image = ({ imageUrl, imageType, altText }: ImageProps) => {
  console.log(imageType);
  if (imageType) {
    const imageClass = `image-${ImageType[imageType]}`.toLowerCase();
    console.log(imageClass);
  }
  return (
    <div className={styles['container']}>
      <img src={imageUrl} alt={altText} />
    </div>
  );
};

export default Image;
