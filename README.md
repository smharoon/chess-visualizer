# Chess Square Visualizer

🌐 **Live Demo:**  
https://chess-visualizer-dca6dxb2e7h3a0h3.canadacentral-01.azurewebsites.net/

---

## Overview

Chess Square Visualizer is a web-based training tool designed to improve a player's ability to quickly recognize and locate chess coordinates on a chessboard.

The application displays a random square notation (e.g., `e4`, `b7`, `h1`) and challenges the user to identify its location by clicking the correct region of the board.

Unlike traditional coordinate trainers, the game uses **progressive difficulty**. Players start by identifying large board regions and gradually advance to selecting exact squares.

---

## Features

- Random chess coordinate generation
- Progressive difficulty system
- 3-minute timed training sessions
- Real-time scoring
- Visual feedback for correct and incorrect answers
- Satisfying sound effects on successful clicks
- Mobile-friendly responsive interface
- Lightweight Flask backend
- Dockerized deployment
- CI/CD pipeline using GitHub Actions, Docker Hub, and Azure App Service

---

## How It Works

### Level 1 (1×1)

The entire board is treated as a single region.

```text
+---------+
|         |
|    X    |
|         |
+---------+
```

Any click is correct.

---

### Level 2 (2×2)

The board is divided into four quadrants.

```text
+----+----+
| Q1 | Q2 |
+----+----+
| Q3 | Q4 |
+----+----+
```

Players must identify which quadrant contains the target square.

---

### Level 3 (4×4)

The board is divided into sixteen regions.

```text
+--+--+--+--+
|  |  |  |  |
+--+--+--+--+
|  |  |  |  |
+--+--+--+--+
|  |  |  |  |
+--+--+--+--+
|  |  |  |  |
+--+--+--+--+
```

Higher precision is required.

---

### Level 4 (8×8)

The player must click the exact square.

```text
a8 b8 c8 d8 e8 f8 g8 h8
a7 b7 c7 d7 e7 f7 g7 h7
...
a1 b1 c1 d1 e1 f1 g1 h1
```

This simulates real chessboard visualization.

---

## Technology Stack

### Backend

- Python
- Flask

### Frontend

- HTML
- CSS
- JavaScript

### DevOps

- Docker
- GitHub Actions
- Docker Hub
- Azure App Service

---

## Project Structure

```text
chess-visualizer/
│
├── app.py
├── requirements.txt
├── Dockerfile
├── .dockerignore
│
├── templates/
│   └── index.html
│
├── static/
│   ├── style.css
│   └── script.js
│
└── .github/
    └── workflows/
        └── docker-publish.yml
```

---

## Running Locally

### Clone Repository

```bash
git clone https://github.com/<your-username>/chess-visualizer.git
cd chess-visualizer
```

### Install Dependencies

```bash
pip install -r requirements.txt
```

### Start Application

```bash
python app.py
```

Open:

```text
http://localhost:5000
```

---

## Running with Docker

### Build Image

```bash
docker build -t chess-visualizer .
```

### Run Container

```bash
docker run -p 5000:5000 chess-visualizer
```

Open:

```text
http://localhost:5000
```

---

## CI/CD Pipeline

The project uses a fully automated deployment pipeline:

```text
GitHub Push
      ↓
GitHub Actions
      ↓
Build Docker Image
      ↓
Push to Docker Hub
      ↓
Azure App Service Pulls Latest Image
      ↓
Application Updated Automatically
```

### Workflow

1. Developer pushes code to GitHub.
2. GitHub Actions builds a new Docker image.
3. Image is pushed to Docker Hub.
4. Azure App Service detects the updated image.
5. Azure pulls the latest container.
6. Application is automatically redeployed.

---

## Learning Objective

The primary goal of this project is to improve:

- Chessboard visualization
- Coordinate recognition speed
- Board awareness
- Pattern recognition
- Spatial memory

The progressive difficulty system allows beginners and advanced players to train using the same platform.

---

## Future Enhancements

- Leaderboard
- User accounts
- Accuracy tracking
- Performance analytics
- Difficulty customization
- Piece-based visualization mode
- Opening training mode
- Blindfold chess training

---

## License

This project is open source and available under the MIT License.
