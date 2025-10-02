export default function ObjBlock({
  title,
  obj,
}: {
  title: string;
  obj: unknown;
}) {
  return (
    <div className="flex flex-col gap-2 rounded-2xl border p-4">
      <p className="mb-2 border-b pb-3 font-bold">{title}</p>
      <pre className="overflow-x-auto whitespace-pre-wrap break-all text-xs">
        {JSON.stringify(obj, null, 2)}
      </pre>
    </div>
  );
}
