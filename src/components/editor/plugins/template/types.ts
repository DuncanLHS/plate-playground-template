// src/plugins/template/types.ts
import { SlateRenderElementProps, TElement } from "@udecode/plate";

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
 * Template inline element structure
 */
export interface TemplateInlineElementType extends TElement {
  children: [{ text: string }];
  field: TemplateField;
  type: "template-inline";
}

/**
 * Template block element structure
 */
export interface TemplateBlockElementType extends TElement {
  children: [{ text: string }];
  field: TemplateField;
  type: "template-block";
}

/**
 * Base template element that may or may not have a field
 */
export type TemplateElementType =
  | TemplateBlockElementType
  | TemplateInlineElementType;

/**
 * Template element with optional field property for more flexible usage
 */
export interface BaseTemplateElement extends TElement {
  field?: TemplateField;
}

/**
 * Props for inline template field element
 */
export interface TemplateInlineElementProps extends SlateRenderElementProps {
  element: TemplateInlineElementType;
}

/**
 * Props for block template field element
 */
export interface TemplateBlockElementProps extends SlateRenderElementProps {
  element: TemplateBlockElementType;
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
