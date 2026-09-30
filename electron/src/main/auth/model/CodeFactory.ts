import * as crypto from 'crypto'
export class CodeFactory{
    public static generateRandomCode(){
        let tamanho = 15
        const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const valoresAleatorios = new Uint8Array(tamanho);
        crypto.getRandomValues(valoresAleatorios);

        let resultado = '';
        for (let i = 0; i < tamanho; i++) {
            resultado += caracteres[valoresAleatorios[i] % caracteres.length];
        }

        const cryptoValue = crypto.createHmac('sha256',"teste_key").update(resultado).digest()
        return {token:resultado,cryptoToken:Buffer.from(cryptoValue).toString('base64')};
    }
}