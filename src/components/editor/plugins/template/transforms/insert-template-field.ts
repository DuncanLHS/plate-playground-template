import { TElement } from "platejs";

import { TemplateField } from "../types";

export function insertTemplateField(editor: any, field: TemplateField) {
  const nodeType = field.isBlock ? "template-block" : "template-inline";

  // Create the element to insert
  const element: TElement = {
    children: [{ text: "" }],
    field,
    type: nodeType,
  };

  // Insert the node at the current selection
  editor.tf.insertNodes(editor, element);
}
