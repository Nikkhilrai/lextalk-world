const IMG = "/bangalore-2026/awardees";

export interface Awardee {
    name: string;
    title: string;
    image: string | null;
    bio: string;
}

export const awardees: Awardee[] = [];
