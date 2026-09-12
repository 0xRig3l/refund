export type RefundItemProps = {
  id: string;
  description: string;
  amount: number;
  category: CategoriesAPIEnum;
  categoryIcon: string;
  user: {
    name: string;
  };
};

type Props = React.ComponentProps<"a"> & {
  data: RefundItemProps;
};

export function RefundItem({ data, ...rest }: Props) {
  return (
    <a
      className=" flex items-center gap-3 hover:bg-green-100/5 p-2  rounded-md cursor-pointer"
      href=""
      {...rest}
    >
      <img
        className=" w-8 h-8"
        src={data.categoryIcon}
        alt={`${data.category} icon`}
      />

      <div className=" flex flex-col flex-1">
        <strong className="text-sm text-gray-100">{data.user.name}</strong>
        <span className="text-xs font-semibold text-gray-200">
          {data.description}
        </span>
      </div>

      <span className="text-md font-semibold text-gray-100">{data.amount}</span>
    </a>
  );
}
