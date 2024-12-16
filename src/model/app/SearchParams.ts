interface SearchParams<T> {
  limit: number;
  skip: number;
  obj?: Partial<T>;
  tags?: string[];
  terms?: string[];
}

export default SearchParams;
