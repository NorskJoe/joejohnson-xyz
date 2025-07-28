import { ImageType } from '../shared/shared.types';
import styles from './image.module.scss';
import { ImageProps } from './image.types';

const Image = ({ imageUrl, imageType, altText }: ImageProps) => {
  let imageClass = 'image';
  if (imageType) {
    imageClass += `-${ImageType[imageType]}`.toLowerCase();
  }
  return (
    <div className={styles['container']}>
      <img className={styles[imageClass]}src={imageUrl} alt={altText} />
    </div>
  );
};

export default Image;
