export type TableHead<T> = {
  label: string;
  accessor: keyof T;
  sortable: true | false;
  searchable: true | false;
  align: 'start' | 'center' | 'end';
};
