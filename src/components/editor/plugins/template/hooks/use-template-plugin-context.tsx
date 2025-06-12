import React, { createContext, useContext, useState } from 'react';

import { useEditorRef, type PlateEditor } from 'platejs/react';

import type { TemplateField, TemplatePluginContextValue } from '../types';

const TemplatePluginContext = createContext<TemplatePluginContextValue | null>(null);

export function TemplatePluginProvider({ 
  children, 
  initialFields = [],
  editor: editorProp
}: { 
  children: React.ReactNode;
  initialFields?: TemplateField[];
  editor?: PlateEditor;
}) {
  const editorFromHook = useEditorRef();
  const editor = editorProp || editorFromHook; 
  const [fields, setFields] = useState<TemplateField[]>(() => initialFields);

  const addField = (field: TemplateField) => {
    setFields((prev) => {
      // Check if field with the same key already exists
      const exists = prev.some((f) => f.key === field.key);
      if (exists) return prev;
      
      return [...prev, field];
    });
  };

  const removeField = (key: string) => {
    setFields((prev) => prev.filter((f) => f.key !== key));
  };

  const updateField = (key: string, updatedField: Partial<TemplateField>) => {
    setFields((prev) => 
      prev.map((f) => 
        f.key === key ? { ...f, ...updatedField } : f
      )
    );
  };

  return (
    <TemplatePluginContext.Provider
      value={{
        addField,
        editor,
        fields,
        removeField,
        updateField,
      }}
    >
      {children}
    </TemplatePluginContext.Provider>
  );
}

export function useTemplatePluginContext() {
  const context = useContext(TemplatePluginContext);
  if (!context) {
    throw new Error('useTemplatePluginContext must be used within a TemplatePluginProvider');
  }
  return context;
}