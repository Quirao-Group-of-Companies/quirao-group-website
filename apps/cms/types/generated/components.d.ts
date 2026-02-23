import type { Schema, Struct } from '@strapi/strapi';

export interface AboutUsHome extends Struct.ComponentSchema {
  collectionName: 'components_about_us_homes';
  info: {
    displayName: 'Home';
    icon: 'bulletList';
  };
  attributes: {
    CTA: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Schema.Attribute.String;
  };
}

export interface CardsHome extends Struct.ComponentSchema {
  collectionName: 'components_cards_homes';
  info: {
    displayName: 'Home';
    icon: 'bulletList';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Schema.Attribute.String;
  };
}

export interface FaQsHomeFaQs extends Struct.ComponentSchema {
  collectionName: 'components_fa_qs_home_fa_qs';
  info: {
    displayName: 'Homepage';
    icon: 'bulletList';
  };
  attributes: {
    answer: Schema.Attribute.Text;
    question: Schema.Attribute.String;
  };
}

export interface FaQsPalutoFaQs extends Struct.ComponentSchema {
  collectionName: 'components_fa_qs_paluto_fa_qs';
  info: {
    displayName: 'Paluto';
    icon: 'bulletList';
  };
  attributes: {
    answer: Schema.Attribute.Text;
    question: Schema.Attribute.String;
  };
}

export interface HeroHomeHero extends Struct.ComponentSchema {
  collectionName: 'components_hero_home_heroes';
  info: {
    displayName: 'Home';
    icon: 'earth';
  };
  attributes: {
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    logo: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Schema.Attribute.String;
  };
}

export interface SubPreviewHome extends Struct.ComponentSchema {
  collectionName: 'components_sub_preview_homes';
  info: {
    displayName: 'Home';
    icon: 'bulletList';
  };
  attributes: {
    cardImage: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    CTA: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'about-us.home': AboutUsHome;
      'cards.home': CardsHome;
      'fa-qs.home-fa-qs': FaQsHomeFaQs;
      'fa-qs.paluto-fa-qs': FaQsPalutoFaQs;
      'hero.home-hero': HeroHomeHero;
      'sub-preview.home': SubPreviewHome;
    }
  }
}
