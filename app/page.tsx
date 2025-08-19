'use client';

import { useState } from 'react';
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
      <header className="d-flex align-items-center justify-content-between px-3 py-2 bg-light sticky-top position-relative">
        {/* Left side: HamburgerMenu */}
        <div>
          <HamburgerMenu />
        </div>

        {/* Centered: HOME */}
        <div className="position-absolute start-50 translate-middle-x fw-bold">
          HOME
        </div>

        {/* Right side: Student ID */}
        <div className="fw-bold">
          Student ID: 22239026
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
            <h5>Generated Git Commands:</h5>
            <pre className="bg-dark text-light p-3 rounded">
              <code>{output}</code>
            </pre>
          </div>
        )}
      </main>

      <footer className="text-center py-3 mt-auto border-top">
        &copy; {new Date().getFullYear()} Your Name - Student ID: 22239026
      </footer>
    </div>
  );
}
