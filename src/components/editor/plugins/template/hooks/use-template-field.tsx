import { useCallback } from 'react';

import type { Path, TElement } from 'platejs';

import { useEditorRef } from 'platejs/react';

import { useTemplatePluginContext } from './use-template-plugin-context';

// More flexible type that accepts any element that might have a field property
type TemplateElement = TElement & { field?: any };

export function useTemplateField(element: TemplateElement) {
  const editor = useEditorRef();
  const { fields, removeField, updateField } = useTemplatePluginContext();
  // Extract field from element
  const fieldData = element.field;
  const field = fieldData ? 
    fields.find(f => f.key === fieldData.key) || fieldData : 
    null;

  const formatLabel = useCallback(() => {
    if (!field) return 'Unknown Field';
    return field.label || `{${field.key}}`;
  }, [field]);
  const handleEdit = useCallback(() => {
    // This would typically open a dialog to edit the field
    // For now, we'll just log the field
    console.log('Edit field:', field);
    
    // Example of updating the field display
    if (field) {
      // Find element path
      const path = editor.api.findPath(element as any);
      if (path) {
        // Update element properties
        editor.tf.setNodes(
          { field: { ...field, lastEdited: new Date().toISOString() } },
          { at: path }
        );
      }
    }
  }, [editor, element, field]);
  
  const handleRemove = useCallback(() => {
    if (field) {
      // Find element path
      const path = editor.api.findPath(element as any);
      if (path) {
        // Remove the node
        editor.tf.removeNodes({ at: path as Path });
      }
    }
  }, [editor, element, field]);

  return {
    field,
    formatLabel,
    handleEdit,
    handleRemove,
  };
}