import JsonTreeEditor from "../components/JsonTreeEditor";

export default function AdminEditor() {
  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-10">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
          Election Data Admin Panel
        </h1>

        <JsonTreeEditor />

      </div>
    </div>
  );
}