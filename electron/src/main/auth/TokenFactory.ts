import * as crypto from 'crypto';

export class TokenFactory{
    constructor(){}
    public assemble(userID:string){
        const header = {
            alg:"HS256",
            typ:"JWT"
        }
        const payload = {
            sub:userID,
            iat:Date.now()
        }
        const encodedHeader = this.base64UrlEncode(JSON.stringify(header))
        const encodedPayload = this.base64UrlEncode(JSON.stringify(payload))
        const dataToSign = `${encodedHeader}.${encodedPayload}`// Uso correto para JWT: HMAC-SHA256 (rápido e seguro para tokens)

        const signature = crypto
            .createHmac('sha256', process.env.SECRET_KEY!)
            .update(dataToSign)
            .digest();

        const encodedSignature = this.base64UrlEncode(signature);

        return `${dataToSign}.${encodedSignature}`;
    }

    public verificarJWT(token: string): any {
        const parts = token.split('.');
        if (parts.length !== 3) {
            throw new Error("Token inválido: formato incorreto.");
        }

        const [encodedHeader, encodedPayload, providedSignature] = parts;

        // Recria a assinatura no servidor para comparar
        const dataToSign = `${encodedHeader}.${encodedPayload}`;
        const hmac = crypto.createHmac('sha256', process.env.SECRET_KEY as any);
        hmac.update(dataToSign);
        const expectedSignature = this.base64UrlEncode(hmac.digest());

        // Validação segura contra timing attacks
        const signatureValid = crypto.timingSafeEqual(
            Buffer.from(providedSignature),
            Buffer.from(expectedSignature)
        );

        if (!signatureValid) {
            throw new Error("Token inválido: assinatura não confere.");
        }

        // Decodifica o payload
        const payload = JSON.parse(this.base64UrlDecode(encodedPayload));

        // Verifica se o token expirou (caso possua a claim 'exp')
        if (payload.exp && Date.now() >= payload.exp * 1000) {
            throw new Error("Token expirado.");
        }

        return payload;
    }

    private base64UrlEncode(input: string | Buffer): string {
        const base64 = Buffer.from(input).toString('base64');
        return base64
            .replace(/=/g, '')
            .replace(/\+/g, '-')
            .replace(/\//g, '_');
    }

    private base64UrlDecode(input: string): string {
        let base64 = input.replace(/-/g, '+').replace(/_/g, '/');
        while (base64.length % 4) {
            base64 += '=';
        }
        return Buffer.from(base64, 'base64').toString('utf8');
    }
}