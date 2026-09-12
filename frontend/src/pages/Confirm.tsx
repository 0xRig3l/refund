import { Navigate, useLocation } from "react-router";

import okSvg from "../assets/ok.svg";

export function Confirm() {
  const location = useLocation();

  if (!location.state || !location.state.fromSubmit) {
    return <Navigate to="/" />;
  }

  return (
    <div className="bg-gray-500 lg:w-lg rounded-xl flex flex-col items-center p-10 gap-6">
      <h1 className="text-2xl font-bold text-center text-green-100">
        Solicitação enviada!
      </h1>

      <img className="w-28" src={okSvg} alt="Sucesso" />

      <p className="text-sm text-gray-200 text-center">
        Sua solicitação foi enviada com sucesso. Aguarde o processamento.
      </p>

      <a
        href="/"
        className="bg-green-100 hover:bg-green-800 text-white font-bold py-2 px-4 rounded transition ease-linear duration-200"
      >
        Nova solicitação
      </a>
    </div>
  );
}
