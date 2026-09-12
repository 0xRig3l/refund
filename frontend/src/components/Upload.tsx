import { useState } from "react";

import uploadSvg from "../assets/upload.svg";
import { mergeTailwindClasses } from "../utils/mergeTailwindClasses";
import { truncateFilename } from "../utils/truncateFilename";

type Props = React.ComponentProps<"input"> & {
  legend?: string;
  filename?: string | null;
};

export function Upload({
  legend = "Comprovante",
  disabled = false,
  defaultValue,
  ...rest
}: Props) {
  const [filename, setFilename] = useState<string | null>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
    const files = e.target.files;

    if (!files || files.length === 0) {
      return setFilename(null);
    }

    if (!allowedTypes.includes(files[0].type)) {
      alert("Tipo de arquivo inválido. Envie uma imagem JPG, PNG ou GIF.");
      return setFilename(null);
    }

    setFilename(files[0].name);
  }

  return (
    <div>
      <legend className="uppercase text-xxs text-gray-200 mb-2">
        {legend}
      </legend>

      <div className="border border-gray-300 h-12 flex items-center rounded-lg text-sm text-gray-100 outline-none">
        <input
          className="hidden"
          disabled={disabled}
          type="file"
          id="upload"
          accept="image/*"
          onChange={handleFileChange}
          {...rest}
        />

        <span
          defaultValue={defaultValue}
          className={mergeTailwindClasses(
            "text-xs text-gray-100 flex-1 ml-4",
            !filename && "text-gray-200/60",
          )}
        >
          {filename
            ? truncateFilename(filename, 50)
            : "Selecione um arquivo para enviar"}
        </span>

        <label
          className={mergeTailwindClasses(
            "flex h-12 px-4 items-center bg-green-100 rounded-r-lg  disabled:opacity-50 cursor-pointer transition ease-linear",
            !disabled && "hover:bg-green-800",
            disabled && "cursor-not-allowed",
          )}
          htmlFor="upload"
        >
          <img src={uploadSvg} alt="Upload icon" />
        </label>
      </div>
    </div>
  );
}
