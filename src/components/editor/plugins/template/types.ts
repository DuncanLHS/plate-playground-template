// src/plugins/template/types.ts

/**
 * Template field data structure
 */
export interface TemplateField {
  /** Friendly name shown in the UI */
  label: string;

  /** Unique identifier for the field */
  key: string;

  /** JSON path to value in the data object */
  path: string;

  /** Data type (string, number, date, array, etc.) */
  type: string;

  /** Whether field is inline or a block element */
  isBlock?: boolean;

  /** Field-specific configuration */
  options?: Record<string, any>;
}

/**
 * Template plugin options
 */
export interface TemplatePluginOptions {
  /** Template fields available in the editor */
  fields: TemplateField[];
}

/**
 * Interface for template plugin context
 */
export interface TemplatePluginContextValue {
  /** Editor reference */
  editor: any;

  /** Available template fields */
  fields: TemplateField[];

  /** Add a new template field */
  addField: (field: TemplateField) => void;

  /** Remove a template field by key */
  removeField: (key: string) => void;

  /** Update an existing template field */
  updateField: (key: string, field: Partial<TemplateField>) => void;
}

/**
 * Data types supported by template fields
 */
export type TemplateFieldType =
  | "array"
  | "date"
  | "number"
  | "object"
  | "string";

/**
 * Function to parse template content and replace fields with actual data
 */
export type TemplateParser = (
  editorValue: any[],
  templateData: Record<string, any>,
  fields: TemplateField[],
) => string;
