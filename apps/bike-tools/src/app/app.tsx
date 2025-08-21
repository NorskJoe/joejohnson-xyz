import styles from './app.module.scss';

import { Route, Routes } from 'react-router-dom';
import Gears from '../pages/gears';
import BlogHome from '../pages/blog/blog-home';

export function App() {
  return (
    <div className={styles['body']}>
      <Routes>
        {/* TODO: Home or Landing page */}
        <Route path="/" element={<div>Welcome to Bike Tools!</div>} />
        {/* TODO: Tools landing page */}
        <Route path="gears" element={<Gears />} />
        <Route path="blog" element={<BlogHome />}>
          {/* TODO: blog posts here? */}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
