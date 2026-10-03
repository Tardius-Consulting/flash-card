import { IReviewRepository, ReviewState } from "./IReviewRepository";

export class WebReviewRepository implements IReviewRepository{
    private dbName="WebDB";
    private storeName = "Flash-card:Review"
    private key = ""
    constructor(){
    }// Método privado para abrir ou criar o banco de dados
    private _openDB():Promise<IDBDatabase> {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, 1);

            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve(request.result);

            // Executado apenas na primeira vez ou quando a versão do banco muda
            request.onupgradeneeded = () => {
                const db = request.result;
                if (!db.objectStoreNames.contains(this.storeName)) {
                    db.createObjectStore(this.storeName);
                }
            };
        });
    }
    async saveState(value: ReviewState[]){
        const db = await this._openDB();
        await new Promise((resolve, reject) => {
            const transaction = db.transaction(this.storeName, 'readwrite');
            const store = transaction.objectStore(this.storeName);
            
            const request = store.put(value, this.key);

            request.onsuccess = () => resolve(true);
            request.onerror = () => reject(request.error);
        });
    }
    async loadState(): Promise<ReviewState[] | null> {
        const db = await this._openDB();
        return await new Promise((resolve, reject) => {
            const transaction = db.transaction(this.storeName, 'readonly');
            const store = transaction.objectStore(this.storeName);
            
            const request = store.get(this.key);

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async removeState(): Promise<void> {
        const db = await this._openDB();
        await new Promise((resolve, reject) => {
            const transaction = db.transaction(this.storeName, 'readonly');
            const store = transaction.objectStore(this.storeName);
            
            const request = store.delete(this.key);

            request.onsuccess = () => resolve(true);
            request.onerror = () => reject(request.error);
        });
    }
}