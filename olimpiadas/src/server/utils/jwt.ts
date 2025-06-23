import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config';

interface GenerateTokenPayload {
    id: number;
    email: string;
    role: string;
}

export function generateToken(payload: GenerateTokenPayload): Promise<string> {
    return new Promise((resolve, reject) => {
        const jwtPayload = {
            id: payload.id,
            email: payload.email,
            isAdmin: payload.role === 'admin' // Si el rol es 'admin', isAdmin es true, de lo contrario, false
        };

        jwt.sign(
            jwtPayload,
            TOKEN_SECRET,
            { expiresIn: '4h' },
            (err, token) => {
                if (err) {
                    console.error("Error al generar token:", err);
                    reject(err);
                } else if (token) {
                    resolve(token);
                } else {
                    reject(new Error('Failed to generate token. Token was undefined.'));
                }
            }
        );
    });
}