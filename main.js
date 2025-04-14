import { app, BrowserWindow } from 'electron';

const app_path = 'C:/Users/dell/dev/secret-note-scribe/dist/index.html';

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  })

  win.loadFile(app_path)
}

app.whenReady().then(() => {
  createWindow()
})