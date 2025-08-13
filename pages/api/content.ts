import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    nav: ['sports', 'live & real', 'casino', 'esports', 'vegas'],
    login: 'Login',
    signup: 'Sign up',
    offerTitle: 'Get up to £10 in Free Bets',
    offerSubtitle: 'Bet £10 and get £10 in free bets',
    offerCTA: 'Join Now'
  });
}