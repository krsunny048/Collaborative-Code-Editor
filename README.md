# 🚀 Collaborative Code Editor

A real-time collaborative code editor that allows multiple users to write and edit code simultaneously. Built using React, Monaco Editor, Node.js, Socket.IO, and Yjs to provide a synchronized coding experience.

## ✨ Features

- **Monaco Code Editor:** VS Code-like code editing experience in the browser.
- **Real-Time Collaboration:** Multiple users can edit the same document simultaneously.
- **CRDT-Based Synchronization:** Uses Yjs to handle concurrent edits and maintain document consistency.
- **Real-Time Communication:** Uses Socket.IO and Y-Socket.IO for communication between clients and the backend.
- **User Identification:** Allows users to enter a username before joining the editor.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React | Frontend UI |
| Vite | Frontend development and build tool |
| Monaco Editor | Code editing interface |
| Node.js | Backend runtime |
| Express.js | Backend framework |
| Socket.IO | Real-time communication |
| Yjs | Collaborative document synchronization |
| Y-Monaco | Connects Yjs with Monaco Editor |
| Y-Socket.IO | Yjs synchronization over Socket.IO |
| Docker | Application containerization |
| AWS | Cloud deployment and hosting |

## 📁 Project Structure

```text
Collaborative-Code-Editor/
│
├── Backend/
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── app/
│   │   │   ├── app.jsx
│   │   │   └── App.css
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/krsunny048/Collaborative-Code-Editor.git
cd Collaborative-Code-Editor
```

### 2. Setup the Backend

```bash
cd Backend
npm install
```

Start the backend using the command configured in `Backend/package.json`.

### 3. Setup the Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL displayed by Vite in your browser.

## 🔄 How It Works

1. Users access the collaborative editor through their browsers.
2. Monaco Editor provides the code editing interface.
3. Yjs maintains the shared document state using CRDTs.
4. Socket.IO enables real-time communication between clients and the backend.
5. Y-Monaco connects the shared Yjs document with the Monaco Editor.

## 🐳 Containerization & Cloud Deployment

- **Docker:** Containerize frontend and backend services to ensure consistent environments across development and deployment.
- **AWS:** Deploy and host the application using AWS cloud infrastructure.
- **Deployment Architecture:** Configure communication between frontend and backend services in the cloud.

## 👨‍💻 Author

**Sunny Kumar**

GitHub: [@krsunny048](https://github.com/krsunny048)

---

⭐ If you find this project interesting, consider giving it a star!