import React, { useState } from 'react';

import { CalendarIcon, HashIcon, LayoutListIcon, PlusIcon, TextIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

import { useTemplatePluginContext } from '../hooks/use-template-plugin-context';
import { insertTemplateField } from '../transforms/insert-template-field';

export function TemplateDropdownMenu({ children }: { children: React.ReactNode }) {
  const { addField, editor, fields } = useTemplatePluginContext();
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newField, setNewField] = useState({
    key: '',
    isBlock: false,
    label: '',
    path: '',
    type: 'string',
  });

  const handleInsertField = (field: any) => {
    insertTemplateField(editor, field);
    setOpen(false);
  };

  const handleAddNewField = () => {
    setDialogOpen(false);
    
    const field = {
      ...newField,
      key: newField.key || newField.path.replace(/\./g, '_'),
    };
    
    addField(field);
    handleInsertField(field);

    // Reset form
    setNewField({
      key: '',
      isBlock: false,
      label: '',
      path: '',
      type: 'string',
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewField((prev) => ({ ...prev, [name]: value }));
  };

  const getFieldIcon = (type: string) => {
    switch (type) {
      case 'array':
        return <LayoutListIcon className="mr-2 h-4 w-4" />;
      case 'date':
        return <CalendarIcon className="mr-2 h-4 w-4" />;
      case 'number':
        return <HashIcon className="mr-2 h-4 w-4" />;
      case 'string':
        return <TextIcon className="mr-2 h-4 w-4" />;
      default:
        return <TextIcon className="mr-2 h-4 w-4" />;
    }
  };

  return (
    <>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="start">
          <DropdownMenuLabel>Template Fields</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {fields.map((field) => (
              <DropdownMenuItem
                key={field.key}
                className="cursor-pointer"
                onClick={() => handleInsertField(field)}
              >
                {getFieldIcon(field.type)}
                <span>{field.label || field.key}</span>
              </DropdownMenuItem>
            ))}
            {fields.length === 0 && (
              <div className="text-sm text-gray-500 px-2 py-1">No fields defined</div>
            )}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer" onClick={() => setDialogOpen(true)}>
            <PlusIcon className="mr-2 h-4 w-4" />
            <span>Add new field</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Template Field</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right" htmlFor="label">
                Label
              </Label>
              <Input
                id="label"
                name="label"
                className="col-span-3"
                value={newField.label}
                onChange={handleInputChange}
                placeholder="User Name"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right" htmlFor="path">
                Data Path
              </Label>
              <Input
                id="path"
                name="path"
                className="col-span-3"
                value={newField.path}
                onChange={handleInputChange}
                placeholder="user.name"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right" htmlFor="key">
                Key
              </Label>
              <Input
                id="key"
                name="key"
                className="col-span-3"
                value={newField.key}
                onChange={handleInputChange}
                placeholder="user_name (auto-generated if empty)"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Type</Label>
              <RadioGroup
                className="col-span-3"
                defaultValue="string"
                onValueChange={(value) => setNewField((prev) => ({ ...prev, type: value }))}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem id="type-string" value="string" />
                  <Label htmlFor="type-string">String</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem id="type-number" value="number" />
                  <Label htmlFor="type-number">Number</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem id="type-date" value="date" />
                  <Label htmlFor="type-date">Date</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem id="type-array" value="array" />
                  <Label htmlFor="type-array">Array</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Display</Label>
              <RadioGroup
                className="col-span-3"
                defaultValue="inline"
                onValueChange={(value) => setNewField((prev) => ({ ...prev, isBlock: value === 'block' }))}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem id="display-inline" value="inline" />
                  <Label htmlFor="display-inline">Inline</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem id="display-block" value="block" />
                  <Label htmlFor="display-block">Block</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleAddNewField} type="submit">
              Add Field
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}