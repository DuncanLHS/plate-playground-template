'use client';

import { TemplateBlockElement } from './components/template-block-element';
import { TemplateInlineElement } from './components/template-inline-element';
import {
  TemplateBlockPlugin,
  TemplateInlinePlugin,
} from './template-plugin';

export const TemplateKit = [
  TemplateInlinePlugin.withComponent(TemplateInlineElement),
  TemplateBlockPlugin.withComponent(TemplateBlockElement),
];
