'use client';

import { useEffect, useState } from 'react';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Form from './Components/Form';
import CommandOutput from './Components/CommandOutput';
import { getCookie, setCookie, checkCookie } from './utlis/Cookies';

export default function Home() {
  const [formData, setFormData] = useState({
    username: '',
    token: '',
    owner: '',
    repo: '',
  });

  const [output, setOutput] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState(16);

  // Load cookies on mount
  useEffect(() => {
    const savedFontSize = getCookie('fontSize');
    const savedDarkMode = getCookie('darkMode');

    if (savedFontSize) setFontSize(parseInt(savedFontSize, 10));
    if (savedDarkMode) setDarkMode(savedDarkMode === 'true');

    
    // checkCookie('section');
  }, []);

  // Update fontSize cookie
  useEffect(() => {
    setCookie('fontSize', fontSize.toString(), 30);
  }, [fontSize]);

  // Update darkMode cookie and apply class
  useEffect(() => {
    setCookie('darkMode', darkMode.toString(), 30);
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleExecute = () => {
    const { username, token, owner, repo } = formData;

    if (!username || !token || !owner || !repo) {
      setOutput('Please fill in all fields.');
      return;
    }

    const command = `
git config --global user.name "${username}"
git config --global user.token "${token}"
git remote set-url origin https://github.com/${owner}/${repo}.git
echo "# Updated Readme" >> README.md
git add .
git commit -m "Updated Readme via Next.js form"
git push
    `.trim();

    setOutput(command);
  };

  const increaseFontSize = () => setFontSize(prev => Math.min(prev + 2, 24));
  const decreaseFontSize = () => setFontSize(prev => Math.max(prev - 2, 12));

  return (
    <div className="d-flex flex-column min-vh-100" style={{ fontSize: `${fontSize}px` }}>
      <Header
        darkMode={darkMode}
        toggleDarkMode={() => setDarkMode(prev => !prev)}
        increaseFontSize={increaseFontSize}
        decreaseFontSize={decreaseFontSize}
      />

      <main className="container my-4 flex-grow-1">
        <h1 className="mb-4">Homepage</h1>
        <Form formData={formData} onChange={handleChange} onExecute={handleExecute} />
        <CommandOutput output={output} />
      </main>

      <Footer />
    </div>
  );
}
