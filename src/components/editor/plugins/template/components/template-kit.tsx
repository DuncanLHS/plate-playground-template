'use client';

import {
  TemplateBlockPlugin,
  TemplateInlinePlugin,
} from '../template-plugin';
import { TemplateBlockElement } from './template-block-element';
import { TemplateInlineElement } from './template-inline-element';

export const TemplateKit = [
  TemplateInlinePlugin.withComponent(TemplateInlineElement),
  TemplateBlockPlugin.withComponent(TemplateBlockElement),
];
