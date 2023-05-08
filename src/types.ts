import { FunctionComponent, SVGProps } from 'react';

export type SVGIcon = FunctionComponent<
  SVGProps<SVGSVGElement> & { title?: string | undefined }
>;
