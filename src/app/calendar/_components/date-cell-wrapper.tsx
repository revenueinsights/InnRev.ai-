import { Download } from 'lucide-react';
import { type DateCellWrapperProps } from 'react-big-calendar';

import { Button } from '@/components/ui/button';
import { CustomTooltip } from '@/components/shared/custom-tooltip';

export function DateCellWrapper({ range, value }: DateCellWrapperProps) {
  return (
    <div className="relative w-full border-r border-r-[#d7d7d7] last-child:border-r-0">
      <CustomTooltip
        content={`Download For: ${value.toLocaleDateString()}`}
        toolTipTriggerClassName="absolute bottom-1.5 left-2"
        align="start"
      >
        <Button title="Download Excel" className="w-8 h-8 rounded-full p-1">
          <Download className="w-4 h-4" />
        </Button>
      </CustomTooltip>
    </div>
  );
}
