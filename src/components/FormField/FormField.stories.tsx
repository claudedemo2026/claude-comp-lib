import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button';
import { Checkbox } from '../Checkbox';
import { Input } from '../Input';
import { Radio, RadioGroup } from '../Radio';
import { Select } from '../Select';
import { Switch } from '../Switch';
import { TextArea } from '../TextArea';
import { FormField } from './FormField';

const meta = {
  title: 'Components/FormField',
  component: FormField,
  tags: ['autodocs'],
  args: {
    label: 'Project name',
    hint: 'Lowercase letters, numbers and dashes.',
    children: <Input placeholder="my-project" />,
  },
  argTypes: { children: { control: false } },
  decorators: [(Story) => <div style={{ maxWidth: 400 }}><Story /></div>],
} satisfies Meta<typeof FormField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const WithError: Story = {
  args: { error: 'That name is already taken.', required: true },
};

export const CompleteForm: Story = {
  args: { label: '', children: null },
  parameters: { controls: { disable: true } },
  render: () => (
    <form
      onSubmit={(e) => e.preventDefault()}
      style={{ display: 'flex', flexDirection: 'column', gap: 24 }}
    >
      <FormField label="Name" required>
        <Input placeholder="Ada Lovelace" autoComplete="name" />
      </FormField>
      <FormField label="Email" hint="We'll never share your email." required>
        <Input type="email" placeholder="ada@example.com" autoComplete="email" />
      </FormField>
      <FormField label="Role">
        <Select placeholder="Select a role">
          <option value="eng">Engineering</option>
          <option value="design">Design</option>
          <option value="product">Product</option>
        </Select>
      </FormField>
      <RadioGroup label="Team size" defaultValue="small" orientation="horizontal">
        <Radio value="solo" label="Just me" />
        <Radio value="small" label="2–10" />
        <Radio value="large" label="11+" />
      </RadioGroup>
      <FormField label="Anything else?">
        <TextArea placeholder="Tell us about your project" rows={3} />
      </FormField>
      <Switch label="Subscribe to product updates" defaultChecked />
      <Checkbox label="I agree to the terms of service" required />
      <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
        <Button variant="ghost" type="reset">Reset</Button>
        <Button type="submit">Create account</Button>
      </div>
    </form>
  ),
};
