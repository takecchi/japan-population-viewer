import type { Meta, StoryObj } from '@storybook/react';
import Graph from './Graph';
import { createMock } from 'storybook-addon-module-mock';
import * as getPopulation from '@/app/_utils/get-population';
import * as queryPrameter from '@/app/_utils/query-parameter';

const meta: Meta<typeof Graph> = {
  title: 'Layout/Graph',
  component: Graph,
  tags: ['autodocs'],
} satisfies Meta<typeof Graph>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DisplayAfter5s: Story = {
  args: {},
  parameters: {
    moduleMock: {
      mock: () => {
        const mockGetPopulation = createMock(
          getPopulation,
          'getPopulationData',
        );
        mockGetPopulation.mockReturnValue(
          new Promise((resolve) => {
            setTimeout(() => {
              resolve({
                years: [
                  1960, 1965, 1970, 1975, 1980, 1985, 1990, 1995, 2000, 2005,
                  2010, 2015, 2020, 2025, 2030, 2035, 2040, 2045,
                ],
                prefectures: [
                  {
                    color: 'red',
                    name: '[TEST]東京都',
                    prefCode: 'TEST',
                    data: [
                      9683802, 10869244, 11408071, 11673554, 11618281, 11829363,
                      11855563, 11773605, 12064101, 12576601, 13159388,
                      13515271, 14047594, 13845936, 13882538, 13851782,
                      13758624, 13606683,
                    ],
                  },
                ],
              });
            }, 5000);
          }),
        );
        const mockQueryParameter = createMock(queryPrameter, 'getPrefCodes');
        mockQueryParameter.mockReturnValue(['TEST']);
        return [mockQueryParameter, mockGetPopulation];
      },
    },
  },
};
