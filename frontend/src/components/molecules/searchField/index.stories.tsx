import { Meta, StoryFn } from "@storybook/react";
import SearchField from ".";
import React from "react";

export default { 
    title:"molecules/SearchField",
    component: SearchField
} as Meta<typeof SearchField>

const Template : StoryFn<typeof SearchField> = (args) => <SearchField {...args}/>

export const Default  = Template.bind({})
Default.args = {
    value:"",
    onChange:()=>{
        console.log("Search Field ")
    }
}
