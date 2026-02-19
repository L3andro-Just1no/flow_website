export default function AdminMediaPage() {
  return (
    <div className="px-4 py-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Biblioteca de Média</h1>
        <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800">
          Upload de Ficheiro
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="text-center py-12">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            Sem ficheiros
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Faça upload de imagens para começar
          </p>
        </div>
      </div>
    </div>
  );
}
