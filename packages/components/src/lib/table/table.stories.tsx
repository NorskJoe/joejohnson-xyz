import type { Meta, StoryObj } from '@storybook/react-vite';
import Table from './table';
import { TableProps } from './table.types';

const meta: Meta<typeof Table> = {
  component: Table,
  title: 'Table',
  argTypes: {
    caption: { control: 'text', description: 'Caption for the table' },
    headers: { control: 'object', description: 'Headers for the table' },
    minGradientLimit: {
      control: 'number',
      description: 'Minimum limit for gradient coloring',
      defaultValue: 0,
    },
    maxGradientLimit: {
      control: 'number',
      description: 'Maximum limit for gradient coloring',
      defaultValue: 100,
    },
    rowData: {
      control: 'object',
      description: 'Rows of the table, can be an array of arrays or an object',
      defaultValue: [
        ['Row 1 Col 1', 'Row 1 Col 2'],
        ['Row 2 Col 1', 'Row 2 Col 2'],
      ],
    },
  },
};

export default meta;
type Story = StoryObj<TableProps>;

export const Default: Story = {
  args: {
    caption: 'Sample Table',
    headers: ['Header 1', 'Header 2'],
    minGradientLimit: 0,
    maxGradientLimit: 100,
    rowData: [
      ['Row 1 Col 1', 'Row 1 Col 2'],
      ['Row 2 Col 1', 'Row 2 Col 2'],
      ['Row 3 Col 1', 'Row 3 Col 2'],
    ],
  },
};

export const RowHeader: Story = {
  args: {
    caption: 'Sample Table',
    headers: ['Header 1', 'Header 2', 'Header 3'],
    minGradientLimit: 0,
    maxGradientLimit: 100,
    rowData: {
      'Row 1': ['Value 1', 'Value 1.1', 'Value 1.2'],
      'Row 2': ['Value 2', 'Value 2.1', 'Value 2.2'],
      'Row 3': ['Value 3', 'Value 3.1', 'Value 3.2'],
    },
  },
};
