

import formidable, { errors as formidableErrors } from 'formidable';
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.json({ message: 'Method not allowed' })
    }

    if (!process.env.NEXT_PUBLIC_FAUCET_PRIVATE_KEY) {
        return res.status(500).json({ message: 'Faucet wallet is not configured' })
    }
    const form = formidable({});
    try {
        [fields, files] = await form.parse(req);
    } catch (err) {
        // example to check for a very specific error
        if (err.code === formidableErrors.maxFieldsExceeded) {

        }
        console.error(err);
        res.writeHead(err.httpCode || 400, { 'Content-Type': 'text/plain' });
        res.end(String(err));
        return;
    }





    res.send('ok')


}