const rules = [
  "No stolen or reposted assets — only upload work you made or have rights to distribute.",
  "No explicit, hateful, or otherwise prohibited content. This is enforced automatically and cannot be appealed for extreme cases.",
  "No malware in uploaded files. Archives may be scanned before download.",
  "Be accurate — describe what your asset is and what software it needs.",
  "Report anything that looks off using the report button on the asset page.",
];

export default function RulesPage() {
  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-16 sm:px-6">
      <h1 className="text-2xl font-semibold">Community rules</h1>
      <ol className="mt-6 flex flex-col gap-4">
        {rules.map((rule, i) => (
          <li key={i} className="flex gap-3 text-sm text-muted">
            <span className="font-medium text-foreground">{i + 1}.</span>
            {rule}
          </li>
        ))}
      </ol>
    </div>
  );
}
