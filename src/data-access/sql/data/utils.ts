function prepareValStatement (key: string, val: any): string {
  const res: string = '';
  if (typeof val === 'string' || val instanceof Date) val = `${key}='${val}'`;
  else if (typeof val === 'number') val = `${key}=${val}`;
  return res;
}

function parseObjToStrCrit (obj: any): string {
  const list = Object.entries(obj);
  const strList = list.map(([k,
    v]) => prepareValStatement(k, v));
  return strList.join(' AND ');
}

function prepareInsertStatement (obj: any): [string, string] {
  const keys = Object.keys(obj);
  const values = Object.entries(obj).map(([k,
    v]) => prepareValStatement(k, v));
  const keysStr = keys.join(',');
  const valuesStr = values.join(',');
  return [keysStr,
    valuesStr];
}

export {
  prepareValStatement,
  parseObjToStrCrit,
  prepareInsertStatement
};
