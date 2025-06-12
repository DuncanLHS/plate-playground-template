// src/plugins/template/TemplatePlugin.ts
import { createPlatePlugin } from 'platejs/react';
import { TemplateBlockElement } from './components/template-block-element';
import { TemplateInlineElement } from './components/template-inline-element';
import type { TemplateField, TemplatePluginOptions } from './types';

// Create the template inline plugin
export const TemplateInlinePlugin = createPlatePlugin({
  key: 'template-inline',
  node: {
    isElement: true,
    isInline: true,
    isVoid: true,
  },
  options: {
    hotkey: ['mod+shift+f'],
  },
}).withComponent(TemplateInlineElement);

// Create the template block plugin
export const TemplateBlockPlugin = createPlatePlugin({
  key: 'template-block',
  node: {
    isElement: true,
    isVoid: true,
  },
}).withComponent(TemplateBlockElement);

// Create the main template plugin
export const TemplatePlugin = createPlatePlugin({
  key: 'template',
  plugins: [
    TemplateInlinePlugin,
    TemplateBlockPlugin,
  ],
  options: {
    fields: [] as TemplateField[],
  },
});

// Helper function to configure with fields
export const createTemplatePlugin = (options: Partial<TemplatePluginOptions> = {}) => {
  return TemplatePlugin.configure({
    options: {
      fields: options.fields || [],
    },
  });
};

// Plugin components export
export { TemplateDropdownMenu } from './components/template-dropdown-menu';
export { TemplateFieldButton } from './components/template-field-button';

// Transforms export
export { insertTemplateField } from './transforms/insert-template-field';

