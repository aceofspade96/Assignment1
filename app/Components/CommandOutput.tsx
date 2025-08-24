interface CommandOutputProps {
  output: string | null;
}

export default function CommandOutput({ output }: CommandOutputProps) {
  if (!output) return null;

  return (
    <div className="mt-4">
      <h5>Executed Command:</h5>
      <pre className="bg-dark text-light p-3 rounded">
        <code>{output}</code>
      </pre>
    </div>
  );
}
