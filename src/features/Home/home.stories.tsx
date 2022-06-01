import { ComponentMeta, ComponentStory } from '@storybook/react';

import Home from './index';


export default {
    title: 'COMPONENTS | Home',
    component: Home,
  } as ComponentMeta<typeof Home>;
  

const Template: ComponentStory<typeof Home> = () => <Home />;

export const Primary = Template.bind({});