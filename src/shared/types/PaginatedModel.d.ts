declare module "PaginatedModel";

type PaginatedModel<T> = {
  page: number;
  count: number;
  items: T[];
};

export default PaginatedModel;
