export const buildSqlParamsForUpdate = (obj: any) => {
  const resultArr: Array<any> = [];
  const entries = Object.entries(obj);
  entries.forEach(entry => {
    resultArr.push(`${entry[0]} = "${entry[1]}"`);
  });
  return resultArr.join(', ');
};

export const updateBuilder = (inquiryId: number, data: any, table: string) => {
  const query = `
    UPDATE ${table} SET ${buildSqlParamsForUpdate(
    data
  )} WHERE id = ${inquiryId};`;
  return query;
};
