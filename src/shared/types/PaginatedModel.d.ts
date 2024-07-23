declare module "PaginatedModel";

type PaginatedModel<T> = {
  total: number;
  page: number;
  count: number;
  items: T[];
};

export default PaginatedModel;
