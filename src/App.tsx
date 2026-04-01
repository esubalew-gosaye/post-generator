import { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import Editor from './components/Editor';

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', onLocationChange);

    return () => {
      window.removeEventListener('popstate', onLocationChange);
    };
  }, []);

  const navigateTo = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {currentPath === '/editor' ? (
        <Editor onBack={() => navigateTo('/')} />
      ) : (
        <LandingPage onStart={() => navigateTo('/editor')} />
      )}
    </div>
  );
}
