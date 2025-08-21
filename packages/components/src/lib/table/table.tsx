import styles from './table.module.scss';
import { TableProps } from './table.types';

const Table = ({
  caption,
  headers,
  minGradientLimit,
  maxGradientLimit,
  rowData,
}: TableProps) => {
  const hasRowHeaders = Array.isArray(rowData) ? false : true;
  return (
    <div className={styles['container']}>
      {caption && <caption className={styles['caption']}>{caption}</caption>}
      <table>
        {headers && (
          <thead>
            <tr>
              {hasRowHeaders && <th className={styles['header']}></th>}
              {headers.map((header, index) => (
                <th key={index} className={styles['header']}>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {Array.isArray(rowData)
            ? rowData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex} className={styles['cell']}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))
            : Object.entries(rowData).map(
                ([rowHeader, rowValues], rowIndex) => (
                  <tr key={rowIndex}>
                    <th className={styles['row-header']}>{rowHeader}</th>
                    {rowValues.map((cell, cellIndex) => (
                      <td key={cellIndex} className={styles['cell']}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                )
              )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
