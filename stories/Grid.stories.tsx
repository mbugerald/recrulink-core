import React from 'react';
import { Meta, Story } from '@storybook/react';
import {Grid, GridItem, GridProps} from '../src';

const meta: Meta = {
  title: 'LAYOUTS/Grid',
  component: Grid,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
  },
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<GridProps> = args =>
    <Grid {...args}>
      <GridItem lg={6} style={{border: "1px dotted #000"}}>Grid Item Span 6</GridItem>
      <GridItem lg={6} style={{border: "1px dotted #000"}}>Grid Item Span 6</GridItem>
      <GridItem lg={4} style={{border: "1px dotted #000"}}>Grid Item Span 4</GridItem>
      <GridItem lg={4} style={{border: "1px dotted #000"}}>Grid Item Span 4</GridItem>
      <GridItem lg={4} style={{border: "1px dotted #000"}}>Grid Item Span 4</GridItem>
      <GridItem lg={12} style={{border: "1px dotted #000"}}>Grid Item Span 12</GridItem>
    </Grid>;

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {};