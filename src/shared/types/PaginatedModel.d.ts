declare module "PaginatedModel";

type PaginatedModel<T> = {
  limit: number;
  page: number;
  count: number;
  total: number;
  items: T[];
};

export default PaginatedModel;
