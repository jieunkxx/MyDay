const camelToUnderscore = (key: string) => {
  return key.replace(/([A-Z])/g, '_$1').toLowerCase();
};

const convertObjKeysToSnakeCase = (obj: any) => {
  const newObj: any = {};
  for (const camel in obj) {
    if (obj[camel] !== null) {
      newObj[camelToUnderscore(camel)] = obj[camel];
    }
  }
  return newObj;
};

const biuldSqlParamsForInsert = (obj: any) => {
  const convertedObj = convertObjKeysToSnakeCase(obj);
  const setParams: Array<any> = [];
  const setValues: Array<any> = [];
  const entries = Object.entries(convertedObj);
  entries.forEach(entry => {
    setParams.push(`${entry[0]}`);
  });
  entries.forEach(entry => {
    setValues.push(`"${entry[1]}"`);
  });
  setParams.join(`,`);
  setValues.join(`,`);
  return setParams + ') VALUES (' + setValues;
};

const buildSqlParamsForUpdate = (obj: any) => {
  const convertedObj = convertObjKeysToSnakeCase(obj);
  const resultArr: Array<any> = [];
  const entries = Object.entries(convertedObj);
  entries.forEach(entry => {
    resultArr.push(`${entry[0]} = "${entry[1]}"`);
  });
  return resultArr.join(', ');
};

const buildSqlParamsForDelete = (obj: any, condition: string) => {
  const convertedObj = convertObjKeysToSnakeCase(obj);
  const resultArr: Array<any> = [];
  const entries = Object.entries(convertedObj);
  entries.forEach(entry => {
    resultArr.push(`${entry[0]} = "${entry[1]}"`);
  });
  if (condition === 'AND' || condition === 'OR') {
    resultArr.join(`${condition}`);
  }
  return resultArr;
};

export const insertBuilder = (data: any, table: string) => {
  const query = `
    INSERT INTO ${table} (
      ${biuldSqlParamsForInsert(data)}
    );
  `;
  return query;
};

export const updateBuilder = (inquiryId: number, data: any, table: string) => {
  const query = `
    UPDATE ${table} SET ${buildSqlParamsForUpdate(
    data
  )} WHERE id = ${inquiryId};`;
  console.log(query);
  return query;
};

export const deleteBuilder = (data: any, table: string, condition: string) => {
  const query = `
    DELETE FROM ${table} WHERE ${buildSqlParamsForDelete(data, condition)};
  `;
  return query;
};
