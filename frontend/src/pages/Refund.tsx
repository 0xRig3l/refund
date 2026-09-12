import z from "zod";
import { useActionState } from "react";
import {
  useLoaderData,
  useNavigate,
  useParams,
  type LoaderFunctionArgs,
} from "react-router";

import { api } from "../services/api";
import fileSvg from "../assets/file.svg";
import { Input } from "../components/Input";
import { Select } from "../components/Select";
import { Upload } from "../components/Upload";
import { Button } from "../components/Button";
import { handleError } from "../utils/handleError";
import { CATEGORIES, CATEGORIES_KEYS } from "../utils/categories";
import { currencyFormatter } from "../utils/handleCurrencyFormat";
import { truncateFilename } from "../utils/truncateFilename";
import { AxiosError } from "axios";

const CategoriesEnum = z.enum([
  "food",
  "others",
  "services",
  "transport",
  "accommodation",
]);

const refundSchema = z.object({
  description: z
    .string()
    .trim()
    .min(3, "A descrição deve ter pelo menos 3 caracteres")
    .max(70, "A descrição pode ter no máximo 70 caracteres"),
  category: CategoriesEnum,
  amount: z
    .number("Digite um valor válido")
    .positive("O valor deve ser maior que zero"),
  filename: z.string().min(20),
});

export async function refundLoader({ params }: LoaderFunctionArgs) {
  if (!params.id) return null;

  try {
    const data = (await api.get(`/refunds/${params.id}`))
      .data as RefundsAPIResponse;

    return data;
  } catch (error: any) {
    if (error instanceof AxiosError && error.response?.status === 404) {
      throw new Response("Reembolso não encontrado", { status: 404 });
    }
    throw error;
  }
}

export function Refund() {
  const refund = useLoaderData() as RefundsAPIResponse | null;
  const [state, formAction, isLoading] = useActionState(onRefund, null);

  const navigate = useNavigate();
  const params = useParams<{ id: string }>();

  const isReadonly = Boolean(params.id);

  const formatter = new Intl.NumberFormat(navigator.language, {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 2,
  });
  const formatCurrency = currencyFormatter();

  async function onRefund(_: unknown, formData: FormData) {
    if (isReadonly) {
      return navigate(-1);
    }

    try {
      const description = formData.get("description");
      const category = formData.get("category");
      const amount = formData.get("amount");
      const file = formData.get("filename") as File;

      const rawAmount = formatCurrency(amount).value;

      const fileUploadForm = new FormData();
      fileUploadForm.append("file", file);

      const uploadsRes = await api.post("/uploads", fileUploadForm);

      const data = refundSchema.parse({
        description,
        category,
        amount: rawAmount,
        filename: uploadsRes.data.filename,
      });

      await api.post("/refunds", data);

      navigate("/confirm", { state: { fromSubmit: true } });
    } catch (error) {
      return handleError(error);
    }
  }

  return (
    <form
      className="bg-gray-500 w-full rounded-xl flex flex-col p-10 gap-6 lg:min-w-lg"
      action={formAction}
    >
      <header>
        <h1 className="text-xl font-bold text-gray-100">
          Solicitação de reembolso
        </h1>
        <p className="text-sm text-gray-200 mt-2 mb-4">
          Preencha os detalhes da despesa abaixo
        </p>
      </header>

      <Input
        required
        readOnly={isReadonly}
        placeholder="Estou insatisfeito com..."
        name="description"
        defaultValue={refund?.description ?? ""}
        maxLength={70}
        legend="Descrição da solicitação"
      />

      <div className="flex gap-4">
        <Select
          required
          name="category"
          defaultValue={refund?.category ?? ""}
          disabled={isReadonly}
          legend="Categoria"
        >
          <option value="" disabled hidden>
            Selecione
          </option>

          {CATEGORIES_KEYS.map((key) => (
            <option key={key} value={key}>
              {CATEGORIES[key].name}
            </option>
          ))}
        </Select>

        <Input
          required
          readOnly={isReadonly}
          name="amount"
          defaultValue={refund?.amount ?? ""}
          legend="Valor"
          placeholder="R$ 0,00"
          onChange={(e) => {
            const digits = e.target.value.replace(/\D/g, "");
            e.target.value = formatter.format(Number(digits) / 100);
          }}
        />
      </div>

      {isReadonly ? (
        <div className="flex flex-col bg-gray-300 p-4 rounded-lg">
          <p className="text-xxs text-gray-200 uppercase font-semibold">
            Comprovante anexado
          </p>

          <a
            href={`${import.meta.env.VITE_API_URL}/uploads/${refund?.filename}`}
            target="_blank"
            className="flex gap-1 w-fit items-center justify-start text-sm text-green-100 hover:text-green-800 transition ease-linear hover:underline mt-1"
          >
            <img src={fileSvg} alt="File icon" />
            <span>{truncateFilename(refund?.filename!, 30) ?? ""}</span>
          </a>
        </div>
      ) : (
        <Upload
          name="filename"
          defaultValue={refund?.filename ?? ""}
          required
          disabled={isReadonly}
        />
      )}

      {(state as { message: string })?.message && (
        <p className="text-center text-xs font-semibold text-red-500">
          {(state as { message: string })?.message}
        </p>
      )}

      {isReadonly ? (
        <Button isLoading={isLoading} onClick={() => navigate(-1)}>
          Voltar
        </Button>
      ) : (
        <Button isLoading={isLoading} type="submit">
          Enviar solicitação
        </Button>
      )}
    </form>
  );
}
