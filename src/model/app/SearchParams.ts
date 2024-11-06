interface SearchParams<T> {
  limit: number;
  skip: number;
  obj?: T;
  tags?: string[];
  terms?: string[];
}

export default SearchParams;
