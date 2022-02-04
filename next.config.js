const withMDX = require('@next/mdx')({
  extension: /\.mdx$/,
});

// next.config.js
const semi = require('@douyinfe/semi-next').default({
  /* the extension options */
});

module.exports = semi(
  withMDX({
    images: {
      domains: ['res.cloudinary.com', 'images.unsplash.com'],
    },
    eslint: {
      // Warning: This allows production builds to successfully complete even if
      // your project has ESLint errors.
      ignoreDuringBuilds: true,
    },
    typescript: {
      // !! WARN !!
      // Dangerously allow production builds to successfully complete even if
      // your project has type errors.F
      // !! WARN !!
      ignoreBuildErrors: true,
    },
    pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  })
);
