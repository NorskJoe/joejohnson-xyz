import styles from './app.module.scss';

import { Route, Routes } from 'react-router-dom';
import Projects from '../pages/projects/projects';
import Experience from '../pages/experience/experience';
import Home from '../pages/home/home';

export function App() {
  return (
    <div className={styles['body']}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/experience" element={<Experience />} />
      </Routes>
    </div>
  );
}

export default App;
