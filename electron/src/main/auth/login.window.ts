import { BrowserWindow } from "electron";
import path from "node:path";

import {URL} from 'url';

export function abrirJanelaDeLogin(trocarCodigoPorToken:(code:string)=>void) {

  const authWindow = new BrowserWindow({
    width: 600,
    height: 700,
    show: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });
  
  //const clientId = 'SEU_CLIENT_ID';
  //const redirectUri = 'http://localhost/callback';
  //const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=openid profile email`;

  if (process.env.MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    authWindow.loadURL(process.env.MAIN_WINDOW_VITE_DEV_SERVER_URL+"/render.html");
  } else {
    authWindow.loadFile(path.join(__dirname, `../../src/renderer/render.html`));
  }

  function tratarUrlDeRetorno(url, windowInstance) {
    try {
      const parsedUrl = new URL(url);
      
      // Verifica se a URL atual é a do nosso callback esperado
      if (parsedUrl.origin + parsedUrl.pathname === 'http://localhost/callback') {
        const authorizationCode = parsedUrl.searchParams.get('code');
        
        if (authorizationCode) {
          console.log('Authorization Code capturado com sucesso:', authorizationCode);
          
          // Fechar a janela de login
          windowInstance.close();

          // 3. Próximo passo: Enviar o código para o back-end trocar pelo Token
          trocarCodigoPorToken(authorizationCode);
        }
      }
    } catch (error) {
      console.log(error)
      // Apenas ignora URLs que não conseguem ser parseadas (como assets internos)
    }
  }

  // 2. Intercepta a navegação da janela para capturar o código
  authWindow.webContents.on('will-navigate', (event, newUrl) => {
    tratarUrlDeRetorno(newUrl, authWindow);
  });

  // Alguns provedores fazem redirecionamentos via script/redirecionamento interno
  authWindow.webContents.on('did-redirect-navigation', (event, newUrl) => {
    tratarUrlDeRetorno(newUrl, authWindow);
  });
}