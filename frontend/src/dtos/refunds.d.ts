type RefundsAPIResponse = {
  id: string;
  description: string;
  filename: string;
  category: CategoriesAPIEnum;
  currency?: string;
  amount: number;
  userId: string;
  user: {
    name: string;
  };
};

type RefundsPaginationAPIResponse = {
  refunds: RefundsAPIResponse[];
  pagination: {
    page: number;
    perPage: number;
    totalPages: number;
    totalRecords: number;
  };
};
