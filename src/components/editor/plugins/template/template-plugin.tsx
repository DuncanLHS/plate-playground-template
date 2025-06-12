// src/plugins/template/TemplatePlugin.ts
import { createPlatePlugin } from 'platejs/react';
import { TemplateBlockElement } from './components/template-block-element';
import { TemplateInlineElement } from './components/template-inline-element';

// Define the structure for template field options
export interface TemplateField {
  label: string;      // Friendly name shown in the UI
  key: string;        // Unique identifier for the field
  path: string;       // JSON path to value in the data object
  type: string;       // Data type (string, number, date, array, etc.)
  isBlock?: boolean;  // Whether field is inline or a block element
  options?: Record<string, any>; // Field-specific configuration
}

// Define the structure for template plugin options
export interface TemplatePluginOptions {
  fields: TemplateField[];
}

// Define types for the template elements
export interface TemplateInlineElement {
  children: [{ text: '' }];
  field: TemplateField;
  type: 'template-inline';
}

export interface TemplateBlockElement {
  type: 'template-block';
  field: TemplateField;
  children: [{ text: '' }];
}

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

