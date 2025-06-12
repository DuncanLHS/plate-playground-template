import React from 'react';

import { Ellipsis, Trash2 } from 'lucide-react';
import type { TElement } from 'platejs';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { PlateElement, PlateElementProps } from 'platejs/react';
import { useTemplateField } from '../hooks/use-template-field';

// Define the template block element type inline
interface TemplateBlockElement extends TElement {
  type: 'template-block';
  field?: {
    label: string;
    key: string;
    path: string;
    type: string;
    isBlock?: boolean;
    options?: Record<string, any>;
  };
}

export const TemplateBlockElement = React.forwardRef<
  HTMLDivElement,
  PlateElementProps<TemplateBlockElement>
>(({ children, element, ...props }, ref) => {
  const { field, formatLabel, handleEdit, handleRemove } = useTemplateField(element);

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
    <PlateElement {...props} element={element} ref={ref} className={`relative p-3 my-2 rounded border ${getTypeColor()}`}>
      <div className="flex justify-between items-center mb-2">
        <div className="text-sm font-medium flex-1">{children}</div>
        <DropdownMenu>
          <DropdownMenuTrigger className="cursor-pointer" contentEditable={false}>
            <span className="text-gray-500 hover:text-gray-700">
              <Ellipsis className="h-4 w-4" />
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <div className="p-2 text-xs text-gray-500">
              <div>Type: {field.type}</div>
              <div>Path: {field.path}</div>
            </div>
            <DropdownMenuSeparator />
            {/* <DropdownMenuItem className="cursor-pointer" onClick={handleEdit}>
              <Pencil className="mr-2 h-4 w-4" />
              <span>Edit field</span>
            </DropdownMenuItem> */}
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
    </PlateElement>
  );
});

TemplateBlockElement.displayName = 'TemplateBlockElement';