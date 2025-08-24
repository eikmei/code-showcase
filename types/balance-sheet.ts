export enum ReportPeriod {
  CurrentYTD = 'CurrentYTD',
  CurrentPTD = 'CurrentPTD',
  ComparisonYear = 'ComparisonYear',
  ComparisonPeriod = 'ComparisonPeriod',
}

export enum GroupLevel {
  ChartOfAccount = 'ChartOfAccount',
  GroupLevel1 = 'GroupLevel1',
  GroupLevel2 = 'GroupLevel2',
  AccountCategory = 'AccountCategory',
}

export enum AccountType {
  Assets = 'Assets',
  Liabilities = 'Liabilities',
  Capital = 'Capital',
  RetainedEarnings = 'RetainedEarnings',
}

export enum AccountStatus {
  Active = 'Active',
  Inactive = 'Inactive',
}

export enum JournalStatus {
  Approved = 'Approved',
  Draft = 'Draft',
}

export enum ReportProject {
  Blanks = 'blanks',
}

export interface Projects {
  [projectID: string]: number;
}

export interface AccountItems {
  accountCode: string;
  accountName: string;
  ytd: Projects;
  amount: number;
  isControl: boolean;
  isActive: boolean;
}

export interface COAGroup {
  title: string;
  totalTitle: string;
  items: AccountItems[];
  amount: number;
  ytd: Projects;
}

export interface Level2Group {
  title: string;
  totalTitle: string;
  coaGroup: COAGroup[];
  amount: number;
  ytd: Projects;
}

export interface Level1Group {
  title: string;
  totalTitle: string;
  level2Group: Level2Group[];
  amount: number;
  ytd: Projects;
}

export interface AccountCategoryGroup {
  title: string;
  totalTitle: string;
  level1Group: Level1Group[];
  amount: number;
  ytd: Projects;
}

export interface Subgroup {
  title: string;
  totalTitle: string;
  accountCategory: AccountCategoryGroup[];
  amount: number;
  ytd: Projects;
}

export interface Group {
  title: string;
  totalTitle: string;
  subgroups: Subgroup[];
  amount: number;
  ytd: Projects;
}

export interface ReportData {
  financialPeriod: string;
  financialYear: number;
  groups: Group[];
  totalYtd: number;
}

export interface BalanceSheetHTMLPayload {
  title: string;
  subtitle: string;
  userID: string;
  companyEntityName: string;
  dateFrom: string;
  dateTo: string;
  reportDate: string;
  reportTime: string;
  data: ReportData[];
  totalCount: number;
}

export interface BalanceSheetColumns {
  accountCode: string;
  accountName: string;
  thisYear: string;
  lastYear: string;
  thisPeriod: string;
  lastPeriod: string;
  isControlAccount: string;
  isActiveAccount: string;
}

export interface ColumnDef {
  key: string;
  header: string;
  align: 'left' | 'right' | 'center';
  currency: boolean;
  summary?: boolean;
  accessor: (item: BalanceSheetColumns) => React.ReactNode;
}

export interface DisplayOption {
  reportPeriod: ReportPeriod;
  groupLevel: GroupLevel;
  showAccountCode: boolean;
  showControlAccount: boolean;
  showSubtotalAmount: boolean;
  showInactiveAccount: boolean;
  includeZeroBalance: boolean;
  selectedFinancialYear: string | undefined;
  selectedFinancialPeriod: string | undefined;
}

export interface ProjectList {
  id: string;
  label: string;
}

export interface JournalDetailFullSummary {
  journalID: string;
  journalDetailID: string;
  journalDate: Date;
  accountID: string;
  accountCode: string;
  accountName: string;
  accountStatus: AccountStatus;
  accountType: AccountType;
  accountCategoryName: string;
  accountGroupLevel1Name: string;
  accountGroupLevel2Name: string;
  accountDescription: string;
  debitAmount: number;
  creditAmount: number;
  financialPeriodStartAt: Date;
  financialPeriodEndAt: Date;
  accountIsControl: boolean;
  analysis1ProjectID?: string;
  analysis2ProjectID?: string;
  analysis3ProjectID?: string;
  analysis4ProjectID?: string;
  analysis5ProjectID?: string;
}
