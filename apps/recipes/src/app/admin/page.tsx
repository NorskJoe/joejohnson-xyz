import Link from 'next/link';
import styles from './admin.module.scss';

const AdminLandingPage = () => {
  return (
    <div className={styles['container']}>
      <Link href="/admin/add" passHref>
        <button>Add Recipe</button>
      </Link>
      <Link href="/admin/edit" passHref>
        <button>Edit Recipe</button>
      </Link>
    </div>
  );
};

export default AdminLandingPage;
