export type BrandColors = Record<string, string>;

export interface Content {
    nav?: string[];
    login?: string;
    signup?: string;
    offerTitle?: string;
    offerSubtitle?: string;
    offerCTA?: string;
    brandColors?: BrandColors;
}
