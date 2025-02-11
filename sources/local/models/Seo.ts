import { Model } from '@stackbit/types';

export const Seo: Model = {
  type: 'object',
  name: 'Seo',
  label: 'Seo',
  labelField: 'metaTitle',
  fields: [
    {
      type: 'string',
      name: 'metaTitle',
      label: 'Title meta tag (overrides title)',
      description: 'By default, the <title> tag for this page is determined by the title field (in the Content group). You can override the tag value here.',
      required: false,
      hidden: false,
      localized: false
    },
    {
      type: 'string',
      name: 'metaDescription',
      label: 'Description meta tag',
      description: 'Learning and Management Portfolio',
      required: false,
      hidden: false,
      localized: false
    },
    {
      type: 'boolean',
      name: 'addTitleSuffix',
      label: 'Add title suffix',
      description: 'If enabled, the title suffix defined in the site configuration is appended to the title tag of this page.',
      required: false,
      hidden: false,
      localized: false
    },
    {
      type: 'image',
      name: 'socialImage',
      label: ' Image for social sharing',
      description: 'https://www.hrinnovate.org/static/assets/images/SEO/hr_innovate.png',
      required: false,
      hidden: false,
      localized: false
    },
    {
      type: 'list',
      name: 'metaTags',
      label: 'Additional meta tags',
      description: 'To add or override any meta tag for this page, add entries to this list. Entries defined here take precedence over any other defaults.',
      required: false,
      hidden: false,
      localized: false,
      items: {
        type: 'model',
        models: [
          'MetaTag'
        ]
      }
    }
  ]
};
