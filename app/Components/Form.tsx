import React from 'react';

interface FormProps {
  formData: {
    username: string;
    token: string;
    owner: string;
    repo: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onExecute: () => void;
}

const fields = ['username', 'token', 'owner', 'repo'] as const;


const fieldLabels: Record<typeof fields[number], string> = {
  username: 'Username',
  token: 'Token',
  owner: 'Owner',
  repo: 'Name',
};

export default function Form({ formData, onChange, onExecute }: FormProps) {
  return (
    <form className="form-group">
      {fields.map((field) => (
        <div className="mb-3" key={field}>
          <label htmlFor={field} className="form-label">
            {fieldLabels[field]}
          </label>
          <input
            id={field}
            name={field}
            className="form-control"
            value={formData[field]}
            onChange={onChange}
          />
        </div>
      ))}
      <button type="button" className="btn btn-success" onClick={onExecute}>
        Execute
      </button>
    </form>
  );
}
