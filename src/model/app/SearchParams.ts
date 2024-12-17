interface SearchParams<T> {
  limit: number;
  skip: number;
  obj?: Partial<T>;
  tags: string[];
}

export default SearchParams;
