import type { Schema, Struct } from '@strapi/strapi';

export interface BlocksAboutUs extends Struct.ComponentSchema {
  collectionName: 'components_blocks_about_uses';
  info: {
    displayName: 'About Us';
    icon: 'information';
  };
  attributes: {
    cta: Schema.Attribute.Component<'elements.link', false>;
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Schema.Attribute.String;
  };
}

export interface BlocksBanner extends Struct.ComponentSchema {
  collectionName: 'components_blocks_banners';
  info: {
    displayName: 'Banner';
  };
  attributes: {
    cta: Schema.Attribute.Component<'elements.link', false>;
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Schema.Attribute.String;
  };
}

export interface BlocksCards extends Struct.ComponentSchema {
  collectionName: 'components_blocks_cards';
  info: {
    displayName: 'Cards';
    icon: 'bulletList';
  };
  attributes: {
    cta: Schema.Attribute.Component<'elements.link', false>;
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Schema.Attribute.String;
  };
}

export interface BlocksFaQs extends Struct.ComponentSchema {
  collectionName: 'components_blocks_fa_qs';
  info: {
    displayName: 'FAQs';
    icon: 'bulletList';
  };
  attributes: {
    answer: Schema.Attribute.Text;
    question: Schema.Attribute.Text;
  };
}

export interface BlocksHeroSection extends Struct.ComponentSchema {
  collectionName: 'components_blocks_hero_sections';
  info: {
    displayName: 'Hero Section';
    icon: 'bulletList';
  };
  attributes: {
    cta: Schema.Attribute.Component<'elements.link', false>;
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Schema.Attribute.String;
  };
}

export interface BlocksSubPreview extends Struct.ComponentSchema {
  collectionName: 'components_blocks_sub_previews';
  info: {
    displayName: 'Sub Preview';
    icon: 'apps';
  };
  attributes: {
    cardImage: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    cta: Schema.Attribute.Component<'elements.link', false>;
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    logo: Schema.Attribute.Component<'elements.logo', false>;
  };
}

export interface ElementsLink extends Struct.ComponentSchema {
  collectionName: 'components_elements_links';
  info: {
    displayName: 'Link';
    icon: 'cursor';
  };
  attributes: {
    href: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface ElementsLogo extends Struct.ComponentSchema {
  collectionName: 'components_elements_logos';
  info: {
    displayName: 'Logo';
    icon: 'cast';
  };
  attributes: {
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    logoName: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'blocks.about-us': BlocksAboutUs;
      'blocks.banner': BlocksBanner;
      'blocks.cards': BlocksCards;
      'blocks.fa-qs': BlocksFaQs;
      'blocks.hero-section': BlocksHeroSection;
      'blocks.sub-preview': BlocksSubPreview;
      'elements.link': ElementsLink;
      'elements.logo': ElementsLogo;
    }
  }
}
