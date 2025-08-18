import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    brandColors: { sports: '#00a826', liveandreal: '#36a2eb', casino: '#f59e0b', esports: '#ef4444', vegas: '#8b5cf6' },
    nav: ['sports', 'live & real', 'casino', 'esports', 'vegas'],
    login: 'Login',
    signup: 'Sign up',
    offerTitle: 'Get up to £10 in Free Bets',
    offerSubtitle: 'Sports new customer offer',
    offerCTA: 'Join Now'
  });
}