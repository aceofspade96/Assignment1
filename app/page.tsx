'use client';

import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import Header from './Components/Header';
import Footer from './Components/Footer';

export default function Home() {
  const [formData, setFormData] = useState({
    username: '',
    token: '',
    owner: '',
    repo: '',
  });

  const [output, setOutput] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState(16); // Default font size in px

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
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

  const increaseFontSize = () => {
    setFontSize(prev => Math.min(prev + 2, 24));
  };

  const decreaseFontSize = () => {
    setFontSize(prev => Math.max(prev - 2, 12));
  };

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

        <form className="form-group">
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input name="username" className="form-control" onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">Token</label>
            <input name="token" className="form-control" onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">Owner</label>
            <input name="owner" className="form-control" onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">Repo</label>
            <input name="repo" className="form-control" onChange={handleChange} />
          </div>
          <button type="button" className="btn btn-success" onClick={handleExecute}>
            Execute
          </button>
        </form>

        {output && (
          <div className="mt-4">
            <h5>Executed Command:</h5>
            <pre className="bg-dark text-light p-3 rounded">
              <code>{output}</code>
            </pre>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
