export function NotFound() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="flex flex-col items-center">
        <h1 className="text-gray-100 font-semibold text-2xl mb-10">
          Página não encontrada.
        </h1>
        <a
          href="/"
          className="font-semibold text-green-200 hover:text-green-800 transition ease-linear duration-200"
        >
          Voltar para o início
        </a>
      </div>
    </div>
  );
}
