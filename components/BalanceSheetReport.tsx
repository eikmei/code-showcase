import React from 'react';
import { formatCurrency } from '@/lib/utils';
import { GroupLevel } from '@/types/balance-sheet';
import {
  BalanceSheetHTMLPayload,
  ColumnDef,
  ProjectList,
  DisplayOption,
  Group,
  Subgroup,
  AccountCategoryGroup,
  Level1Group,
  Level2Group,
  COAGroup,
} from '@/types/balance-sheet';
import { cn } from '@/lib/utils';
import { formatLabel } from '@/lib/utils';

interface BalanceSheetReportProps {
  payload: BalanceSheetHTMLPayload;
  columns: ColumnDef[];
  projectColumns: ProjectList[];
  display: DisplayOption;
}

const BalanceSheetReport: React.FC<BalanceSheetReportProps> = ({
  payload,
  columns,
  projectColumns,
  display,
}) => {
  const renderHeaderCells = () => {
    const cells: JSX.Element[] = [];
    columns.forEach((column) => {
      cells.push(
        <th
          key={column.key}
          className={cn(
            'text-black border border-gray-300 px-4 py-2 font-semibold',
            {
              'text-left': column.align === 'left' || !column.align,
              'text-right': column.align === 'right',
              'text-center': column.align === 'center',
            }
          )}
        >
          {column.header}
        </th>
      );
    });

    return cells;
  };

  const renderAccountItems = (coaGroup: COAGroup, level: number = 0) => {
    if (display.groupLevel === GroupLevel.ChartOfAccount) {
      return coaGroup.items.map((item, index) => (
        <tr key={`${item.accountCode}-${index}`} className="border-b">
          {display.showAccountCode && (
            <td className="px-4 py-2 text-left">{item.accountCode}</td>
          )}
          <td className={`px-4 py-2 text-left pl-${level * 4}`}>
            {item.accountName}
          </td>
          {display.showControlAccount && (
            <td className="px-4 py-2 text-center">
              {item.isControl ? 'Yes' : 'No'}
            </td>
          )}
          {display.showInactiveAccount && (
            <td className="px-4 py-2 text-center">
              {item.isActive ? 'Yes' : 'No'}
            </td>
          )}
          <td className="px-4 py-2 text-right">
            {formatCurrency(item.amount)}
          </td>
        </tr>
      ));
    }
    return null;
  };

  const renderCOAGroups = (coaGroups: COAGroup[], level: number = 0) => {
    return coaGroups.map((coaGroup, index) => (
      <React.Fragment key={`coa-${index}`}>
        {display.groupLevel !== GroupLevel.ChartOfAccount && (
          <tr className="bg-gray-50 font-semibold">
            {display.showAccountCode && <td className="px-4 py-2"></td>}
            <td className={`px-4 py-2 text-left pl-${level * 4}`}>
              {coaGroup.title}
            </td>
            {display.showControlAccount && <td className="px-4 py-2"></td>}
            {display.showInactiveAccount && <td className="px-4 py-2"></td>}
            <td className="px-4 py-2 text-right">
              {formatCurrency(coaGroup.amount)}
            </td>
          </tr>
        )}
        {renderAccountItems(coaGroup, level + 1)}
      </React.Fragment>
    ));
  };

  const renderLevel2Groups = (
    level2Groups: Level2Group[],
    level: number = 0
  ) => {
    return level2Groups.map((level2, index) => (
      <React.Fragment key={`level2-${index}`}>
        {level2.title && display.groupLevel === GroupLevel.GroupLevel2 && (
          <tr className="bg-blue-50 font-semibold">
            {display.showAccountCode && <td className="px-4 py-2"></td>}
            <td className={`px-4 py-2 text-left pl-${level * 4}`}>
              {level2.title}
            </td>
            {display.showControlAccount && <td className="px-4 py-2"></td>}
            {display.showInactiveAccount && <td className="px-4 py-2"></td>}
            <td className="px-4 py-2 text-right">
              {formatCurrency(level2.amount)}
            </td>
          </tr>
        )}
        {renderCOAGroups(level2.coaGroup, level + 1)}
        {display.showSubtotalAmount && level2.totalTitle && (
          <tr className="bg-blue-100 font-bold">
            {display.showAccountCode && <td className="px-4 py-2"></td>}
            <td className={`px-4 py-2 text-left pl-${level * 4}`}>
              {level2.totalTitle}
            </td>
            {display.showControlAccount && <td className="px-4 py-2"></td>}
            {display.showInactiveAccount && <td className="px-4 py-2"></td>}
            <td className="px-4 py-2 text-right">
              {formatCurrency(level2.amount)}
            </td>
          </tr>
        )}
      </React.Fragment>
    ));
  };

  const renderLevel1Groups = (
    level1Groups: Level1Group[],
    level: number = 0
  ) => {
    return level1Groups.map((level1, index) => (
      <React.Fragment key={`level1-${index}`}>
        {level1.title && display.groupLevel === GroupLevel.GroupLevel1 && (
          <tr className="bg-green-50 font-semibold">
            {display.showAccountCode && <td className="px-4 py-2"></td>}
            <td className={`px-4 py-2 text-left pl-${level * 4}`}>
              {level1.title}
            </td>
            {display.showControlAccount && <td className="px-4 py-2"></td>}
            {display.showInactiveAccount && <td className="px-4 py-2"></td>}
            <td className="px-4 py-2 text-right">
              {formatCurrency(level1.amount)}
            </td>
          </tr>
        )}
        {renderLevel2Groups(level1.level2Group, level + 1)}
        {display.showSubtotalAmount && level1.totalTitle && (
          <tr className="bg-green-100 font-bold">
            {display.showAccountCode && <td className="px-4 py-2"></td>}
            <td className={`px-4 py-2 text-left pl-${level * 4}`}>
              {level1.totalTitle}
            </td>
            {display.showControlAccount && <td className="px-4 py-2"></td>}
            {display.showInactiveAccount && <td className="px-4 py-2"></td>}
            <td className="px-4 py-2 text-right">
              {formatCurrency(level1.amount)}
            </td>
          </tr>
        )}
      </React.Fragment>
    ));
  };

  const renderAccountCategoryGroups = (
    accountCategories: AccountCategoryGroup[],
    level: number = 0
  ) => {
    return accountCategories.map((category, index) => (
      <React.Fragment key={`category-${index}`}>
        {category.title &&
          display.groupLevel === GroupLevel.AccountCategory && (
            <tr className="bg-yellow-50 font-semibold">
              {display.showAccountCode && <td className="px-4 py-2"></td>}
              <td className={`px-4 py-2 text-left pl-${level * 4}`}>
                {category.title}
              </td>
              {display.showControlAccount && <td className="px-4 py-2"></td>}
              {display.showInactiveAccount && <td className="px-4 py-2"></td>}
              <td className="px-4 py-2 text-right">
                {formatCurrency(category.amount)}
              </td>
            </tr>
          )}
        {renderLevel1Groups(category.level1Group, level + 1)}
        {display.showSubtotalAmount && category.totalTitle && (
          <tr className="font-bold">
            {display.showAccountCode && <td className="px-4 py-2"></td>}
            <td className={`px-4 py-2 text-left pl-${level * 4}`}>
              {category.totalTitle}
            </td>
            {display.showControlAccount && <td className="px-4 py-2"></td>}
            {display.showInactiveAccount && <td className="px-4 py-2"></td>}
            <td className="px-4 py-2 text-right">
              {formatCurrency(category.amount)}
            </td>
          </tr>
        )}
      </React.Fragment>
    ));
  };

  const renderSubgroups = (subgroups: Subgroup[], level: number = 0) => {
    return subgroups.map((subgroup, index) => (
      <React.Fragment key={`subgroup-${index}`}>
        <tr className="bg-gray-100 font-bold">
          {display.showAccountCode && <td className="px-4 py-2"></td>}
          <td className={`px-4 py-2 text-left pl-${level * 4}`}>
            {subgroup.title}
          </td>
          {display.showControlAccount && <td className="px-4 py-2"></td>}
          {display.showInactiveAccount && <td className="px-4 py-2"></td>}
          <td className="px-4 py-2 text-right">
            {formatCurrency(subgroup.amount)}
          </td>
        </tr>
        {renderAccountCategoryGroups(subgroup.accountCategory, level + 1)}
        {display.showSubtotalAmount && (
          <tr className="bg-gray-200 font-bold">
            {display.showAccountCode && <td className="px-4 py-2"></td>}
            <td className={`px-4 py-2 text-left pl-${level * 4}`}>
              {subgroup.totalTitle}
            </td>
            {display.showControlAccount && <td className="px-4 py-2"></td>}
            {display.showInactiveAccount && <td className="px-4 py-2"></td>}
            <td className="px-4 py-2 text-right">
              {formatCurrency(subgroup.amount)}
            </td>
          </tr>
        )}
      </React.Fragment>
    ));
  };

  const renderGroup = (group: Group) => {
    return (
      <React.Fragment>
        <tr className="bg-indigo-100 font-bold text-sm">
          {display.showAccountCode && <td className="px-4 py-3"></td>}
          <td className="px-4 py-3 text-left">{group.title.toUpperCase()}</td>
          {display.showControlAccount && <td className="px-4 py-3"></td>}
          {display.showInactiveAccount && <td className="px-4 py-3"></td>}
          <td className="px-4 py-3 text-right">
            {formatCurrency(group.amount)}
          </td>
        </tr>
        {renderSubgroups(group.subgroups, 1)}
        <tr className="bg-indigo-200 font-bold text-sm border-t-2 border-indigo-300">
          {display.showAccountCode && <td className="px-4 py-3"></td>}
          <td className="px-4 py-3 text-right">{group.totalTitle}</td>
          {display.showControlAccount && <td className="px-4 py-3"></td>}
          {display.showInactiveAccount && <td className="px-4 py-3"></td>}
          <td className="px-4 py-3 text-right">
            {formatCurrency(group.amount)}
          </td>
        </tr>
      </React.Fragment>
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          {payload.title}
        </h1>
        <h2 className="text-lg text-gray-600 mb-2">{payload.subtitle}</h2>
        <div className="text-sm text-gray-500">
          <p>{payload.companyEntityName}</p>
          <p>
            Period: {payload.dateFrom} to {payload.dateTo}
          </p>
          <p>
            Generated by: {payload.userID} on {payload.reportDate} at{' '}
            {payload.reportTime}
          </p>
          <p>Total Accounts: {payload.totalCount}</p>
        </div>
      </div>

      {projectColumns.length > 0 && (
        <div className="mb-6 p-4 bg-blue-50 rounded">
          <h3 className="font-semibold mb-2">Project Filters:</h3>
          <div className="flex flex-wrap gap-2">
            {projectColumns.map((project) => (
              <span
                key={project.id}
                className="bg-blue-200 px-2 py-1 rounded text-sm"
              >
                {project.label}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Balance Sheet Table */}
      {payload.data.map((reportData, reportIndex) => (
        <div key={reportIndex} className="mb-8">
          <h4 className="text-lg font-semibold mb-4">
            Financial Year: {reportData.financialYear}
            {reportData.financialPeriod &&
              ` - Period: ${reportData.financialPeriod}`}
            <span className="text-sm text-gray-500 ml-2">
              (As at: {reportData.asAtDate.toDateString()})
            </span>
          </h4>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 text-sm">
              <thead>
                <tr className="bg-gray-100">{renderHeaderCells()}</tr>
              </thead>
              <tbody>
                {reportData.groups.map((group, groupIndex) => (
                  <React.Fragment key={`group-${groupIndex}`}>
                    {renderGroup(group)}
                    {groupIndex < reportData.groups.length - 1 && (
                      <tr>
                        <td colSpan={columns.length} className="py-2"></td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}

                {/* Total Row */}
                <tr className="bg-gray-800 text-white font-bold text-sm">
                  {display.showAccountCode && <td className="px-4 py-3"></td>}
                  <td className="px-4 py-3 text-right">
                    TOTAL EQUITY AND LIABILITIES
                  </td>
                  {display.showControlAccount && (
                    <td className="px-4 py-3"></td>
                  )}
                  {display.showInactiveAccount && (
                    <td className="px-4 py-3"></td>
                  )}
                  <td className="px-4 py-3 text-right">
                    {formatCurrency(reportData.totalYtd)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ))}

      {/* Report Options */}
      <div className="mb-6 p-4 bg-gray-50 rounded">
        <h3 className="font-semibold mb-2">Report Options:</h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>Group Level: {formatLabel(display.groupLevel)}</div>
          <div>Show Account Code: {display.showAccountCode ? 'Yes' : 'No'}</div>
          <div>
            Show Control Account: {display.showControlAccount ? 'Yes' : 'No'}
          </div>
          <div>Show Subtotal: {display.showSubtotalAmount ? 'Yes' : 'No'}</div>
          <div>Show Inactive: {display.showInactiveAccount ? 'Yes' : 'No'}</div>
          <div>
            Include Zero Balance: {display.includeZeroBalance ? 'Yes' : 'No'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalanceSheetReport;
