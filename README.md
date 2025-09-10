# Pokémon Desktop Pet - Lugia

![Lugia Walking 1](assets/walking1.gif) ![Lugia Idle](assets/idle.gif) ![Lugia Walking 2](assets/walking2.gif)

A lightweight Electron-based desktop pet featuring Lugia with smooth animations and random behaviors.

## 🎥 Video Demo
<video width="320" height="240" controls>
  <source src="assets/lugia-demo.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

## 🛠 Tech Stack

![Electron](https://img.shields.io/badge/Electron-2B2E3A?style=for-the-badge&logo=electron&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-14+-339933?style=for-the-badge&logo=node.js&logoColor=white)

![Lugia Idle](assets/lugia-pokemon.gif)

## ✨ Features

- **Multi-sprite animation system**:
  - 2 walking sprites (walking1.gif, walking2.gif)
  - 1 idle sprite (idle.gif)
- **Behavior patterns**:
  - Random movement within bounds
  - Direction reversal at screen edges
  - Randomized idle states
- **Electron integration**:
  - Frameless transparent window
  - System tray control
  - Cross-platform compatibility

## ⚙️ Technical Implementation

### Animation System (index.js)

- **Sprite cycling**: Alternates between walking sprites every 20 frames
- **Movement logic**:
  - Linear horizontal movement with direction reversal
  - 500ms pause at screen edges
- **Random idle behavior**:
  - Triggers after 50-300 movements (configurable)
  - Lasts 1-3 seconds (configurable)

### Electron Configuration (main.js)

- **Window settings**:
  - 250x150px frameless window
  - Transparent background
  - Disabled context isolation for DOM access
- **Tray system**:
  - 16x16px tray icon
  - Click to toggle visibility
  - Right-click menu for exit

### Performance Considerations

- Uses `will-change: transform` for smooth animations
- Image-rendering set to `pixelated` for crisp sprites
- Efficient requestAnimationFrame-based animation

## 📌 Requirements

- Node.js v14+
- Electron v15+
- Windows/macOS/Linux

## 📜 License

Free for personal use
