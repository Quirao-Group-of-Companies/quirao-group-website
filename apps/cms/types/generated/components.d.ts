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

export interface BlocksHighlights extends Struct.ComponentSchema {
  collectionName: 'components_blocks_highlights';
  info: {
    displayName: 'Highlights';
  };
  attributes: {
    cta: Schema.Attribute.Component<'elements.link', false>;
    description: Schema.Attribute.Blocks;
    headline: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Schema.Attribute.String;
  };
}

export interface BlocksSubContacts extends Struct.ComponentSchema {
  collectionName: 'components_blocks_sub_contacts';
  info: {
    displayName: 'Sub Contacts';
  };
  attributes: {
    address: Schema.Attribute.Text;
    cardImage: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    contactNum: Schema.Attribute.Text;
    cta: Schema.Attribute.Component<'elements.link', false>;
    displayImage: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    email: Schema.Attribute.Text;
    logo: Schema.Attribute.Component<'elements.logo', false>;
    subName: Schema.Attribute.String;
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
    subName: Schema.Attribute.String;
  };
}

export interface ElementsItem extends Struct.ComponentSchema {
  collectionName: 'components_elements_items';
  info: {
    displayName: 'Item';
  };
  attributes: {
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    text: Schema.Attribute.Text;
    title: Schema.Attribute.String;
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

export interface ElementsText extends Struct.ComponentSchema {
  collectionName: 'components_elements_texts';
  info: {
    displayName: 'Text';
  };
  attributes: {
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String;
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
      'blocks.highlights': BlocksHighlights;
      'blocks.sub-contacts': BlocksSubContacts;
      'blocks.sub-preview': BlocksSubPreview;
      'elements.item': ElementsItem;
      'elements.link': ElementsLink;
      'elements.logo': ElementsLogo;
      'elements.text': ElementsText;
    }
  }
}
