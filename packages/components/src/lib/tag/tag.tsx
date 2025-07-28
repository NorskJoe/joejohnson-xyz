import styles from './tag.module.scss';
import { TagProps } from './tag.types';

const Tag = ({ name, size }: TagProps) => {
  const classname = `tag-${size}`;
  return (
    <div className={`${styles['tag']} ${styles[classname]}`}>
      <p className={styles['tag-text']}>{name}</p>
    </div>
  );
};

export default Tag;
