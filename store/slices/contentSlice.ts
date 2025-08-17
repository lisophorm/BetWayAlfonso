import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../';
import type { Content } from '../../content/types/type.content';

export const fetchContent = createAsyncThunk<Content>(
    'content/fetch',
    async () => {
        const r = await fetch('/api/content');
        if (!r.ok) throw new Error('content fetch failed');
        return r.json();
    }
);

type ContentState = {
    data: Content | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error?: string;
};

const initialState: ContentState = { data: null, status: 'idle' };

const slice = createSlice({
    name: 'content',
    initialState,
    reducers: {},
    extraReducers: (b) => {
        b.addCase(fetchContent.pending, (s) => { s.status = 'loading'; });
        b.addCase(fetchContent.fulfilled, (s, a) => { s.status = 'succeeded'; s.data = a.payload; });
        b.addCase(fetchContent.rejected, (s, a) => { s.status = 'failed'; s.error = a.error.message; });
    }
});

export const selectContent = (st: RootState) => st.content.data;
export default slice.reducer;
