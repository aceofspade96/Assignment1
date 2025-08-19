'use client';

import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import HamburgerMenu from './Components/HamburgerMenu';

export default function Home() {
  const [formData, setFormData] = useState({
    username: '',
    token: '',
    owner: '',
    repo: '',
  });

  const [output, setOutput] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Apply dark mode class to body
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

  return (
            <div className="d-flex flex-column min-vh-100">
              <header className="d-flex align-items-center justify-content-between px-3 py-2 sticky-top themed-header">
          <HamburgerMenu />

          <div className="position-absolute start-50 translate-middle-x fw-bold">
            HOME
          </div>

          <div className="d-flex align-items-center gap-3 ms-auto">
            <span className="fw-bold">Student ID: 22239026</span>
            <div className="form-check form-switch mb-0">
              <input
                className="form-check-input"
                type="checkbox"
                id="themeToggle"
                checked={darkMode}
                onChange={() => setDarkMode(prev => !prev)}
              />
              <label className="form-check-label" htmlFor="themeToggle">
                {darkMode ? 'Dark' : 'Light'}
              </label>
            </div>
          </div>
        </header>


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

      <footer className="text-center py-3 mt-auto border-top themed-header">
        &copy; {new Date().getFullYear()} Shishir Poudel - Student ID: 22239026
      </footer>
    </div>
  );
}
