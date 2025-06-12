import { TElement } from "platejs";
import { type PlateEditor } from "platejs/react";

import { TemplateField } from "../types";

export function insertTemplateField(editor: PlateEditor, field: TemplateField) {
  const nodeType = field.isBlock ? "template-block" : "template-inline";
  // Create the element to insert with field data as properties and label as editable children
  const element: TElement = {
    children: [{ text: field.label || field.key }],
    field,
    type: nodeType,
  };
  // Insert the node at the current selection
  editor.tf.insertNodes(element);
}
