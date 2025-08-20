// Uncomment this line to use CSS modules
// import styles from './app.module.scss';
import { Route, Routes } from 'react-router-dom';
import Gears from '../pages/gears';
import BlogHome from '../pages/blog/blog-home';

export function App() {
  return (
    <div>
      <Routes>
        <Route path="gears" element={<Gears />} />
        <Route path="blog" element={<BlogHome />}>
          {/* blog posts here? */}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
