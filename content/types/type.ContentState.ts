import type {Content} from "./type.content";

export type ContentState = {
    data: Content | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error?: string;
};
