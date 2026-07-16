import React from 'react';
import {
  Accordion, ArrowLink, Badge, Breadcrumb, Button, Checkbox, CheckboxGroup,
  FormField, Input, Logo, MediaCard, Modal, NavigationBar, Radio, RadioGroup,
  SectionHeader, Select, SocialLink, Stat, Tabs, Tag, Textarea, Toast,
} from '../components/core/index';

/** Minimal renderable element for every component in the library. */
export const CASES = [
  ['Accordion', <Accordion items={[{ q: 'Q1', a: 'A1' }]} />],
  ['ArrowLink', <ArrowLink href="#talks">All talks</ArrowLink>],
  ['Badge', <Badge label="New" />],
  ['Breadcrumb', <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Talks' }]} />],
  ['Button', <Button>Get tickets</Button>],
  ['Checkbox', <Checkbox label="Subscribe" checked={false} />],
  ['CheckboxGroup', (
    <CheckboxGroup legend="Topics">
      <Checkbox label="Design" checked={false} />
    </CheckboxGroup>
  )],
  ['FormField', <FormField label="Email" htmlFor="fx-email"><input id="fx-email" /></FormField>],
  ['Input', <Input label="Email" />],
  ['Logo', <Logo />],
  ['MediaCard', <MediaCard title="Talk title" />],
  ['Modal', <Modal isOpen onClose={() => {}} title="Dialog title">Body</Modal>],
  ['NavigationBar', <NavigationBar links={[{ label: 'Home', href: '/' }]} />],
  ['Radio', <Radio name="fx-r1" legend="Pick one" options={[{ value: 'a', label: 'A' }]} />],
  ['RadioGroup', (
    <RadioGroup name="fx-rg1" legend="Pick one" value="a" onChange={() => {}}>
      <RadioGroup.Option value="a" label="A" />
    </RadioGroup>
  )],
  ['SectionHeader', <SectionHeader title="Section title" />],
  ['Select', <Select label="City" options={[{ value: 'ams', label: 'Amsterdam' }]} />],
  ['SocialLink', <SocialLink network="linkedin" label="LinkedIn" />],
  ['Stat', <Stat value="2009" label="Founded" />],
  ['Tabs', <Tabs tabs={[{ label: 'One', content: 'First' }]} />],
  ['Tag', <Tag>EVENT</Tag>],
  ['Textarea', <Textarea label="Message" />],
  ['Toast', <Toast message="Saved" duration={0} />],
];
