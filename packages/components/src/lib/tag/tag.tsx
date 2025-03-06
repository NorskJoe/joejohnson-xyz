import styles from './tag.module.scss';
import { TagProps } from './tag.types';

const Tag = ({ name }: TagProps) => {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Tag!</h1>
    </div>
  );
};

export default Tag;
