import { createMDX } from 'fumadocs-mdx/next';

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  outputFileTracingIncludes: {
    '/api/search': ['./src/content/docs/**/*'],
    '/docs/[[...slug]]': ['./src/content/docs/**/*'],
  },
};

const withMDX = createMDX();

export default withMDX(config);
