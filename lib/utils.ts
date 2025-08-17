export const keyify = (label: string) =>
    label.toLowerCase().replace(/\s*&\s*/g, 'and').replace(/\s+/g, '');