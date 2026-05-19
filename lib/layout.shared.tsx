import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: 'TA IoT Greenhouse Docs',
    },
    links: [
      {
        text: 'Coverage',
        url: '/docs/14-complete-file-walkthrough/coverage-report',
      },
      {
        text: 'Progress',
        url: '/docs/99-generated/full-file-inventory',
      },
    ],
  };
}
