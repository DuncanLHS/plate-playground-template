import React from 'react';

import { Ellipsis, Trash2 } from 'lucide-react';
import type { TElement } from 'platejs';
import { PlateElement, PlateElementProps } from 'platejs/react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { useTemplateField } from '../hooks/use-template-field';

// Define the template inline element type inline
interface TemplateInlineElement extends TElement {
  type: 'template-inline';
  field?: {
    label: string;
    key: string;
    path: string;
    type: string;
    isBlock?: boolean;
    options?: Record<string, any>;
  };
}

export const TemplateInlineElement = React.forwardRef<
  HTMLDivElement,
  PlateElementProps<TemplateInlineElement>
>(({ children, element, ...props }, ref) => {
  // Now element is properly typed as TemplateInlineElement
  const { field, formatLabel, handleEdit, handleRemove } = useTemplateField(element);
  if (!field) {
    return (
      <PlateElement
        {...props}
        element={element}
        ref={ref}
        className="bg-red-100 text-red-800 px-1 py-0.5 rounded inline-block"
      >
        Field not found
        {children}
      </PlateElement>
    );
  }

  const getTypeColor = () => {
    switch (field.type) {
      case 'array':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'date':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'number':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'string':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };  return (
    <PlateElement {...props} element={element} ref={ref} className="relative inline-block">
      <span
        className={`inline-flex items-center px-1.5 py-0.5 rounded border ${getTypeColor()}`}
        contentEditable={false}
      >
        <span className="mr-1">{formatLabel()}</span>
        <DropdownMenu>
          <DropdownMenuTrigger className="cursor-pointer">
            <span className="text-gray-500 hover:text-gray-700">
              <Ellipsis className="h-3 w-3" />
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
      </span>
      {children}
    </PlateElement>
  );
});

TemplateInlineElement.displayName = 'TemplateInlineElement';
