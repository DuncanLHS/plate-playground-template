import React from 'react';

import { Pencil, Trash2 } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { PlateElement, PlateElementProps } from 'platejs/react';
import { useTemplateField } from '../hooks/use-template-field';

export const TemplateBlockElement = React.forwardRef<
  HTMLDivElement,
  PlateElementProps
>(({ children, element, ...props }, ref) => {
  const { field, formatLabel, handleEdit, handleRemove } = useTemplateField(element as any);

  if (!field) {
    return (
      <PlateElement {...props} element={element} ref={ref} className="bg-red-100 text-red-800 p-3 my-2 rounded border border-red-300">
        Field not found
        {children}
      </PlateElement>
    );
  }

  const getTypeColor = () => {
    switch (field.type) {
      case 'array':
        return 'bg-amber-50 text-amber-800 border-amber-300';
      case 'object':
        return 'bg-indigo-50 text-indigo-800 border-indigo-300';
      default:
        return 'bg-gray-50 text-gray-800 border-gray-300';
    }
  };

  return (
    <PlateElement {...props} element={element} ref={ref} className="relative">
      <div
        className={`p-3 my-2 rounded border ${getTypeColor()}`}
        contentEditable={false}
      >
        <div className="flex justify-between items-center mb-2">
          <div className="text-sm font-medium">{formatLabel()}</div>
          <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer">
              <span className="text-gray-500 hover:text-gray-700">
                <svg fill="none" height="16" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="16" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="1" />
                  <circle cx="19" cy="12" r="1" />
                  <circle cx="5" cy="12" r="1" />
                </svg>
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <div className="p-2 text-xs text-gray-500">
                <div>Type: {field.type}</div>
                <div>Path: {field.path}</div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer" onClick={handleEdit}>
                <Pencil className="mr-2 h-4 w-4" />
                <span>Edit field</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer text-red-600" onClick={handleRemove}>
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Remove field</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="text-sm text-gray-600">
          {field.type === 'array' && 'Items will be rendered here'}
          {field.type === 'object' && 'Object data will be displayed here'}
        </div>
      </div>
      {children}
    </PlateElement>
  );
});

TemplateBlockElement.displayName = 'TemplateBlockElement';