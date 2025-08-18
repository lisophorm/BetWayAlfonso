import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') return res.status(405).json({ message: 'Method Not Allowed' });

    // simulate work / server-side validations
    await new Promise((r) => setTimeout(r, 400));

    const id = crypto.randomUUID?.() ?? Math.random().toString(36).slice(2);
    return res.status(200).json({ accountId: id, status: 'created' });
}
