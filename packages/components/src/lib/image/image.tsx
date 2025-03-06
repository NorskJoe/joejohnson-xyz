import styles from './image.module.scss';
import { ImageProps } from './image.types';

export function Image({imageUrl, imageType, altText}: ImageProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Image!</h1>
    </div>
  );
}

export default Image;
