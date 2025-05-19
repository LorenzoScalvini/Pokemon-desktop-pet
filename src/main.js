const {
  app,
  BrowserWindow,
  Tray,
  nativeImage,
  Menu,
  screen,
} = require("electron");
const path = require("path");

let mainWindow = null;
let tray = null;

function createWindow() {
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workAreaSize;

  const windowWidth = 250;
  const windowHeight = 100;
  const rightMargin = 20;
  const bottomMargin = 10;

  const x = width - windowWidth - rightMargin;
  const y = height - windowHeight - bottomMargin;

  mainWindow = new BrowserWindow({
    width: windowWidth,
    height: windowHeight,
    x: x,
    y: y,
    frame: false,
    transparent: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      sandbox: false,
    },
    alwaysOnTop: true,
    skipTaskbar: true,
  });

  mainWindow.setAlwaysOnTop(true, "normal");

  mainWindow.loadFile(path.join(__dirname, "index.html"));
  setupTray();
}

function setupTray() {
  const icon = nativeImage.createFromPath(
    path.join(__dirname, "../assets/icon.ico")
  );
  tray = new Tray(icon.resize({ width: 16, height: 16 }));

  tray.setToolTip("Pokémon Desktop Pet");

  tray.on("click", () => {
    mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
  });

  const contextMenu = Menu.buildFromTemplate([
    { label: "Esci", click: () => app.quit() },
  ]);
  tray.setContextMenu(contextMenu);
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
