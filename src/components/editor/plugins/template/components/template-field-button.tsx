
import { BracesIcon } from 'lucide-react';

import { ToolbarButton } from '@/components/ui/toolbar';

import { TemplateDropdownMenu } from './template-dropdown-menu';

export function TemplateFieldButton() {
  return (
    <TemplateDropdownMenu>
      <ToolbarButton className="h-9" tooltip="Insert Template Field">
        <BracesIcon className="h-5 w-5" />
      </ToolbarButton>
    </TemplateDropdownMenu>
  );
}