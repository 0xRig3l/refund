import { useEffect, useState } from "react";

import searchSvg from "../assets/search.svg";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { RefundItem, type RefundItemProps } from "../components/RefundItem";
import { CATEGORIES } from "../utils/categories";
import { Pagination } from "../components/Pagination";
import { api } from "../services/api";
import { handleError } from "../utils/handleError";

const PER_PAGE = 2;

export function Dashboard() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [refunds, setRefunds] = useState<RefundItemProps[]>([]);
  const [name, setName] = useState("");

  async function fetchRefunds() {
    try {
      const data = (
        await api.get<RefundsPaginationAPIResponse>(`/refunds`, {
          params: { name, page: currentPage, perPage: PER_PAGE },
        })
      ).data;

      setRefunds(
        data.refunds.map((refund) => ({
          id: refund.id,
          user: { name: refund.user.name },
          description: refund.description,
          amount: refund.amount,
          category: CATEGORIES[refund.category].name as CategoriesAPIEnum,
          categoryIcon: CATEGORIES[refund.category].icon,
        })),
      );
      setTotalPages(data.pagination.totalPages);
      setName("");
    } catch (error) {
      console.log(handleError(error));
    }
  }

  function handlePagination(action: "next" | "previous") {
    if (action === "next" && currentPage < totalPages) {
      setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    } else if (action === "previous" && currentPage > 1) {
      setCurrentPage((prev) => Math.max(prev - 1, 1));
    }
  }

  useEffect(() => {
    fetchRefunds();
  }, [currentPage]);

  return (
    <div className="bg-gray-500 rounded-xl p-10 md:min-w-3xl">
      <h1 className="text-gray-100 font-bold text-xl flex-1">Solicitações</h1>

      <form
        action={fetchRefunds}
        className="flex flex-1 items-center justify-between pb-6 border-b border-b-gray-400 gap-2 mt-6"
      >
        <Input
          name="name"
          placeholder="Buscar por nome"
          onChange={(e) => setName(e.target.value)}
        />

        <Button type="submit" variant="icon">
          <img src={searchSvg} alt="Search icon" />
        </Button>
      </form>

      <div className=" flex flex-col gap-4 max-h-85.5 overflow-y-scroll bg-gray-300/10 p-2 my-6 rounded-lg">
        {refunds.length ? (
          refunds.map((refund) => (
            <RefundItem
              key={refund.id}
              data={refund}
              href={`/refunds/${refund.id}`}
            />
          ))
        ) : (
          <p className="py-8 text-center text-sm text-gray-200">
            Nenhuma solicitação encontrada.
          </p>
        )}
      </div>

      <Pagination
        current={currentPage}
        total={totalPages}
        onNext={() => handlePagination("next")}
        onPrevious={() => handlePagination("previous")}
      />
    </div>
  );
}
