import prettierConfig from '@dcastro.dev/prettier-config';

/**
 * @type {import("prettier").Config}
 */

const config = {
  ...prettierConfig,
  plugins: ['prettier-plugin-tailwindcss'],
};

export default config;
