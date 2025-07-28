import { render } from '@testing-library/react';

import ContentTile from './content-tile';

describe('Lib', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ContentTile />);
    expect(baseElement).toBeTruthy();
  });
});
