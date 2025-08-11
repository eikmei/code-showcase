import React from 'react';
import BalanceSheetReport from '../components/BalanceSheetReport';
import {
  BalanceSheetHTMLPayload,
  ColumnDef,
  ProjectList,
  DisplayOption,
  ReportPeriod,
  GroupLevel,
} from '../types/balance-sheet';

// Sample data
const samplePayload: BalanceSheetHTMLPayload = {
  title: 'Balance Sheet Report',
  subtitle: '',
  userID: 'john.doe@company.com',
  companyEntityName: 'Sample Corporation Ltd.',
  dateFrom: '01/01/2024',
  dateTo: '31/12/2024',
  reportDate: '11/08/2025',
  reportTime: '2:30 PM',
  totalCount: 25,
  data: [
    {
      asAtDate: new Date('2024-12-31'),
      financialPeriod: '2024/12',
      financialYear: 2024,
      totalYtd: 1000000,
      groups: [
        {
          title: 'Assets',
          totalTitle: 'TOTAL ASSETS',
          amount: 1000000,
          ytd: { total: 1000000, blanks: 0 },
          subgroups: [
            {
              title: 'Current Assets',
              totalTitle: 'TOTAL CURRENT ASSETS',
              amount: 600000,
              ytd: { total: 600000, blanks: 0 },
              accountCategory: [
                {
                  title: 'Current Assets',
                  totalTitle: 'SUBTOTAL OF CURRENT ASSETS',
                  amount: 600000,
                  ytd: { total: 600000, blanks: 0 },
                  level1Group: [
                    {
                      title: '',
                      totalTitle: '',
                      amount: 600000,
                      ytd: { total: 600000, blanks: 0 },
                      level2Group: [
                        {
                          title: '',
                          totalTitle: '',
                          amount: 600000,
                          ytd: { total: 600000, blanks: 0 },
                          coaGroup: [
                            {
                              title: 'Cash and Cash Equivalents',
                              totalTitle: '',
                              amount: 250000,
                              ytd: { total: 250000, blanks: 0 },
                              items: [
                                {
                                  accountCode: '1001',
                                  accountName: 'Cash at Bank',
                                  amount: 150000,
                                  ytd: { total: 150000, blanks: 0 },
                                  isActive: true,
                                  isControl: false,
                                },
                                {
                                  accountCode: '1002',
                                  accountName: 'Petty Cash',
                                  amount: 5000,
                                  ytd: { total: 5000, blanks: 0 },
                                  isActive: true,
                                  isControl: false,
                                },
                                {
                                  accountCode: '1003',
                                  accountName: 'Short-term Deposits',
                                  amount: 95000,
                                  ytd: { total: 95000, blanks: 0 },
                                  isActive: true,
                                  isControl: false,
                                },
                              ],
                            },
                            {
                              title: 'Accounts Receivable',
                              totalTitle: '',
                              amount: 200000,
                              ytd: { total: 200000, blanks: 0 },
                              items: [
                                {
                                  accountCode: '1100',
                                  accountName: 'Trade Debtors',
                                  amount: 180000,
                                  ytd: { total: 180000, blanks: 0 },
                                  isActive: true,
                                  isControl: true,
                                },
                                {
                                  accountCode: '1110',
                                  accountName: 'Other Receivables',
                                  amount: 20000,
                                  ytd: { total: 20000, blanks: 0 },
                                  isActive: true,
                                  isControl: false,
                                },
                              ],
                            },
                            {
                              title: 'Inventory',
                              totalTitle: '',
                              amount: 150000,
                              ytd: { total: 150000, blanks: 0 },
                              items: [
                                {
                                  accountCode: '1200',
                                  accountName: 'Raw Materials',
                                  amount: 80000,
                                  ytd: { total: 80000, blanks: 0 },
                                  isActive: true,
                                  isControl: false,
                                },
                                {
                                  accountCode: '1210',
                                  accountName: 'Finished Goods',
                                  amount: 70000,
                                  ytd: { total: 70000, blanks: 0 },
                                  isActive: true,
                                  isControl: false,
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              title: 'Non-Current Assets',
              totalTitle: 'TOTAL NON-CURRENT ASSETS',
              amount: 400000,
              ytd: { total: 400000, blanks: 0 },
              accountCategory: [
                {
                  title: 'Non-Current Assets',
                  totalTitle: 'SUBTOTAL OF NON-CURRENT ASSETS',
                  amount: 400000,
                  ytd: { total: 400000, blanks: 0 },
                  level1Group: [
                    {
                      title: '',
                      totalTitle: '',
                      amount: 400000,
                      ytd: { total: 400000, blanks: 0 },
                      level2Group: [
                        {
                          title: '',
                          totalTitle: '',
                          amount: 400000,
                          ytd: { total: 400000, blanks: 0 },
                          coaGroup: [
                            {
                              title: 'Property, Plant & Equipment',
                              totalTitle: '',
                              amount: 400000,
                              ytd: { total: 400000, blanks: 0 },
                              items: [
                                {
                                  accountCode: '1500',
                                  accountName: 'Land and Buildings',
                                  amount: 300000,
                                  ytd: { total: 300000, blanks: 0 },
                                  isActive: true,
                                  isControl: false,
                                },
                                {
                                  accountCode: '1510',
                                  accountName: 'Equipment',
                                  amount: 100000,
                                  ytd: { total: 100000, blanks: 0 },
                                  isActive: true,
                                  isControl: false,
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          title: 'Liabilities',
          totalTitle: 'TOTAL LIABILITIES',
          amount: 300000,
          ytd: { total: 300000, blanks: 0 },
          subgroups: [
            {
              title: 'Current Liabilities',
              totalTitle: 'TOTAL CURRENT LIABILITIES',
              amount: 200000,
              ytd: { total: 200000, blanks: 0 },
              accountCategory: [
                {
                  title: 'Current Liabilities',
                  totalTitle: 'SUBTOTAL OF CURRENT LIABILITIES',
                  amount: 200000,
                  ytd: { total: 200000, blanks: 0 },
                  level1Group: [
                    {
                      title: '',
                      totalTitle: '',
                      amount: 200000,
                      ytd: { total: 200000, blanks: 0 },
                      level2Group: [
                        {
                          title: '',
                          totalTitle: '',
                          amount: 200000,
                          ytd: { total: 200000, blanks: 0 },
                          coaGroup: [
                            {
                              title: 'Trade Payables',
                              totalTitle: '',
                              amount: 150000,
                              ytd: { total: 150000, blanks: 0 },
                              items: [
                                {
                                  accountCode: '2001',
                                  accountName: 'Accounts Payable',
                                  amount: 120000,
                                  ytd: { total: 120000, blanks: 0 },
                                  isActive: true,
                                  isControl: true,
                                },
                                {
                                  accountCode: '2002',
                                  accountName: 'Accrued Expenses',
                                  amount: 30000,
                                  ytd: { total: 30000, blanks: 0 },
                                  isActive: true,
                                  isControl: false,
                                },
                              ],
                            },
                            {
                              title: 'Other Current Liabilities',
                              totalTitle: '',
                              amount: 50000,
                              ytd: { total: 50000, blanks: 0 },
                              items: [
                                {
                                  accountCode: '2100',
                                  accountName: 'Short-term Loans',
                                  amount: 50000,
                                  ytd: { total: 50000, blanks: 0 },
                                  isActive: true,
                                  isControl: false,
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              title: 'Non-Current Liabilities',
              totalTitle: 'TOTAL NON-CURRENT LIABILITIES',
              amount: 100000,
              ytd: { total: 100000, blanks: 0 },
              accountCategory: [
                {
                  title: 'Non-Current Liabilities',
                  totalTitle: 'SUBTOTAL OF NON-CURRENT LIABILITIES',
                  amount: 100000,
                  ytd: { total: 100000, blanks: 0 },
                  level1Group: [
                    {
                      title: '',
                      totalTitle: '',
                      amount: 100000,
                      ytd: { total: 100000, blanks: 0 },
                      level2Group: [
                        {
                          title: '',
                          totalTitle: '',
                          amount: 100000,
                          ytd: { total: 100000, blanks: 0 },
                          coaGroup: [
                            {
                              title: 'Long-term Debt',
                              totalTitle: '',
                              amount: 100000,
                              ytd: { total: 100000, blanks: 0 },
                              items: [
                                {
                                  accountCode: '2500',
                                  accountName: 'Bank Loan',
                                  amount: 100000,
                                  ytd: { total: 100000, blanks: 0 },
                                  isActive: true,
                                  isControl: false,
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          title: 'Equity',
          totalTitle: 'TOTAL EQUITY',
          amount: 700000,
          ytd: { total: 700000, blanks: 0 },
          subgroups: [
            {
              title: 'Share Capital',
              totalTitle: 'TOTAL SHARE CAPITAL',
              amount: 500000,
              ytd: { total: 500000, blanks: 0 },
              accountCategory: [
                {
                  title: 'Share Capital',
                  totalTitle: 'SUBTOTAL OF SHARE CAPITAL',
                  amount: 500000,
                  ytd: { total: 500000, blanks: 0 },
                  level1Group: [
                    {
                      title: '',
                      totalTitle: '',
                      amount: 500000,
                      ytd: { total: 500000, blanks: 0 },
                      level2Group: [
                        {
                          title: '',
                          totalTitle: '',
                          amount: 500000,
                          ytd: { total: 500000, blanks: 0 },
                          coaGroup: [
                            {
                              title: 'Paid-up Capital',
                              totalTitle: '',
                              amount: 500000,
                              ytd: { total: 500000, blanks: 0 },
                              items: [
                                {
                                  accountCode: '3001',
                                  accountName: 'Ordinary Shares',
                                  amount: 500000,
                                  ytd: { total: 500000, blanks: 0 },
                                  isActive: true,
                                  isControl: false,
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              title: 'Retained Earnings',
              totalTitle: 'TOTAL RETAINED EARNINGS',
              amount: 200000,
              ytd: { total: 200000, blanks: 0 },
              accountCategory: [
                {
                  title: 'Retained Earnings',
                  totalTitle: 'SUBTOTAL OF RETAINED EARNINGS',
                  amount: 200000,
                  ytd: { total: 200000, blanks: 0 },
                  level1Group: [
                    {
                      title: '',
                      totalTitle: '',
                      amount: 200000,
                      ytd: { total: 200000, blanks: 0 },
                      level2Group: [
                        {
                          title: '',
                          totalTitle: '',
                          amount: 200000,
                          ytd: { total: 200000, blanks: 0 },
                          coaGroup: [
                            {
                              title: 'Accumulated Earnings',
                              totalTitle: '',
                              amount: 200000,
                              ytd: { total: 200000, blanks: 0 },
                              items: [
                                {
                                  accountCode: 'B/F',
                                  accountName: 'Retained Earnings B/F',
                                  amount: 120000,
                                  ytd: { total: 120000, blanks: 0 },
                                  isActive: true,
                                  isControl: false,
                                },
                                {
                                  accountCode: 'CURRENT',
                                  accountName: 'Current Profit / (Loss)',
                                  amount: 80000,
                                  ytd: { total: 80000, blanks: 0 },
                                  isActive: true,
                                  isControl: false,
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

const sampleProjectColumns: ProjectList[] = [];

const sampleDisplayOption: DisplayOption = {
  reportPeriod: ReportPeriod.CurrentYTD,
  groupLevel: GroupLevel.ChartOfAccount,
  showAccountCode: true,
  showControlAccount: true,
  showSubtotalAmount: true,
  showInactiveAccount: false,
  includeZeroBalance: true,
  selectedFinancialYear: '2024',
  selectedFinancialPeriod: '2024/12',
};

const sampleColumns: ColumnDef[] = [
  ...(sampleDisplayOption.showAccountCode
    ? [
        {
          key: 'accountCode',
          header: 'Account Code',
          currency: false,
          align: 'left',
          accessor: (item) => item.accountCode,
        } as ColumnDef,
      ]
    : []),
  {
    key: 'accountName',
    header: 'Account Category / Account Name',
    currency: false,
    align: 'left',
    accessor: (item) => item.accountName,
  },
  ...(sampleDisplayOption.showControlAccount
    ? [
        {
          key: 'isControlAccount',
          header: 'Control account',
          currency: false,
          align: 'left',
          accessor: (item) => item.isControlAccount,
        } as ColumnDef,
      ]
    : []),
  {
    key: 'current_year',
    header: '2024',
    currency: true,
    align: 'right',
    summary: true,
    accessor: (item) => item.thisYear,
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <BalanceSheetReport
          payload={samplePayload}
          columns={sampleColumns}
          projectColumns={sampleProjectColumns}
          display={sampleDisplayOption}
        />
      </div>
    </main>
  );
}
