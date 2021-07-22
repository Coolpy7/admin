export type TableListItem = {
  current: number;
  ruleid: string;
  rule_name: string;
  rule_desc: string;
  salience: number;
  success: boolean;
  rulename: string;
  key: number;
  disabled?: boolean;
  href: string;
  avatar: string;
  name: string;
  owner: string;
  desc: string;
  callNo: number;
  status: string;
  updatedAt: Date;
  createdAt: Date;
  progress: number;
};

export type TableListPagination = {
  total: number;
  pageSize: number;
  current: number;
};

export type TableListData = {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
};

export type TableListParams = {
  _id?: string;
  ruleName: string;
  ruledesc?: string;
  current: number;
  ruleid: string;
  rule_name: string;
  rule_desc: string;
  salience: number;
  success: boolean;
  status?: string;
  name?: string;
  desc?: string;
  key?: number;
  pageSize?: number;
  currentPage?: number;
  filter?: Record<string, any[]>;
  sorter?: Record<string, any>;
};
