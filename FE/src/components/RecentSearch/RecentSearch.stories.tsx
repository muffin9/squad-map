import { ComponentStory, ComponentMeta } from '@storybook/react';

import RecentSearch from './index';

export default {
  title: 'RecentSearch',
  component: RecentSearch,
} as ComponentMeta<typeof RecentSearch>;

const Template: ComponentStory<typeof RecentSearch> = () => <RecentSearch />;

export const Default = Template.bind({});

Default.parameters = {
  docs: {
    description: {
      story: '`검색창에서 텍스트 입력시 아래에 나오는 최근검색어 창 입니다.`',
    },
  },
};
