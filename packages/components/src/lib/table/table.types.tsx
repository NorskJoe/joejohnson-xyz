export interface TableProps {
  caption?: string;
  headers?: string[];
  minGradientLimit?: number;
  maxGradientLimit?: number;
  rowData: { [heading: string]: string[] } | string[][];
}
