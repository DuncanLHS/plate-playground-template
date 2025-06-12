# Template Editor Plugin for PlateJS

A PlateJS plugin that allows users to insert template fields into content that can later be replaced with actual data. This plugin is ideal for creating email templates, document templates, and any content that needs to be personalized with dynamic data.

## Features

- ✅ Insert template fields as inline or block elements
- ✅ Support for different field types (string, number, date, arrays)
- ✅ Visual distinction between different field types
- ✅ Interactive hover menu for editing or removing fields
- ✅ Toolbar button with dropdown for inserting template fields
- ✅ Add new template fields on the fly
- ✅ Store field definitions within the editor's JSON structure
- ✅ Parse templates by replacing fields with actual data

## Installation

The template plugin is already included in this PlateJS playground template. If you want to use it in your own project, copy the template plugin files to your project:

```bash
# Copy the entire template plugin folder
cp -r src/components/editor/plugins/template /path/to/your/project/src/plugins/
```

## Basic Usage

```tsx
import { Plate, createPlateEditor } from 'platejs/react';
import { ParagraphPlugin } from 'platejs/react';
// ... other plate plugins

// Import the template plugin
import { 
  createTemplatePlugin, 
  TemplateKit,
  TemplateFieldButton 
} from './template-plugin';

// Define your template fields
const templateFields = [
  {
    label: 'User Name',
    key: 'user_name',
    path: 'user.name',
    type: 'string',
    isBlock: false
  },
  {
    label: 'User Email',
    key: 'user_email',
    path: 'user.email',
    type: 'string',
    isBlock: false
  },
  {
    label: 'Products',
    key: 'products',
    path: 'products',
    type: 'array',
    isBlock: true
  }
];

// Create your editor with the template plugin
const plugins = [
  ParagraphPlugin,
  // ... other plugins
  ...TemplateKit,
  createTemplatePlugin({ fields: templateFields }),
];

function MyEditor() {
  const editor = createPlateEditor({ plugins });

  return (
    <Plate editor={editor}>
      <EditorToolbar>
        {/* Your other toolbar buttons */}
        <TemplateFieldButton />
      </EditorToolbar>
      
      <Editor />
    </Plate>
  );
}
```

## Field Types

The plugin supports the following field types:

- `string`: For text fields
- `number`: For numerical values
- `date`: For date values
- `array`: For lists of items (rendered as block elements)
- `object`: For complex object data (rendered as block elements)

## Template Fields Structure

Each template field has the following structure:

```typescript
interface TemplateField {
  label: string;      // Friendly name shown in the UI
  key: string;        // Unique identifier for the field
  path: string;       // JSON path to value in the data object
  type: string;       // Data type (string, number, date, array, etc.)
  isBlock?: boolean;  // Whether field is inline or a block element
  options?: Record<string, any>; // Field-specific configuration
}
```

## Parsing Templates

To parse templates and replace fields with actual data, you can use the following approach:

```typescript
import { serializeHtml } from '@udecode/plate/react';
import get from 'lodash/get'; // or similar tool to access nested object properties

function parseTemplate(editorValue, templateData, fields) {
  // Convert editor value to HTML
  let html = serializeHtml(editor, {
    nodes: editorValue,
  });

  // Process inline template fields
  fields.forEach(field => {
    const regex = new RegExp(`<span[^>]*?data-type="template-inline"[^>]*?data-field="${field.key}"[^>]*?>.*?</span>`, 'g');
    const value = get(templateData, field.path, `{${field.key}}`);
    
    html = html.replace(regex, String(value));
  });

  // Process block template fields
  fields
    .filter(field => field.isBlock)
    .forEach(field => {
      const regex = new RegExp(`<div[^>]*?data-type="template-block"[^>]*?data-field="${field.key}"[^>]*?>.*?</div>`, 'g');
      const values = get(templateData, field.path, []);

      if (Array.isArray(values)) {
        // Implement custom rendering for each type of block field
        // Example for a list of products:
        if (field.key === 'products') {
          html = html.replace(regex, () => {
            return `<ul>${values.map(product => `<li>${product.name}: $${product.price}</li>`).join('')}</ul>`;
          });
        }
      }
    });

  return html;
}
```

## Advanced Usage

### Adding New Fields at Runtime

The plugin allows you to add new fields at runtime using the context provider:

```typescript
import { useTemplatePluginContext } from '@yourdomain/plate-template-plugin';

function TemplateManager() {
  const { fields, addField, removeField, updateField } = useTemplatePluginContext();
  
  const handleAddField = () => {
    addField({
      label: 'New Field',
      key: 'new_field',
      path: 'custom.data',
      type: 'string',
      isBlock: false
    });
  };
  
  return (
    <div>
      <button onClick={handleAddField}>Add New Field</button>
      <ul>
        {fields.map(field => (
          <li key={field.key}>
            {field.label} ({field.type})
            <button onClick={() => removeField(field.key)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### Custom Field Rendering

You can customize how fields appear in the editor by overriding the components:

```typescript
import { createTemplatePlugin } from '@yourdomain/plate-template-plugin';
import { MyCustomInlineField, MyCustomBlockField } from './custom-components';

const customTemplatePlugin = createTemplatePlugin({
  fields: templateFields,
}).override({
  components: {
    'template-inline': MyCustomInlineField,
    'template-block': MyCustomBlockField,
  },
});
```

## Styling

The plugin uses Tailwind CSS classes for styling by default. The template fields use the following color coding:

- String fields: Blue background
- Number fields: Green background
- Date fields: Purple background
- Array fields: Amber background
- Object fields: Indigo background

You can override these styles in your CSS or by customizing the components.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.