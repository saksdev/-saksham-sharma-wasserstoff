import React, { useState, useRef, useEffect } from "react";
import Editor from "@monaco-editor/react";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
import { MonacoBinding } from "y-monaco";

interface User {
  name: string;
  color: string;
  lastActive?: number;
}

const App: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [input, setInput] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);
  const editorRef = useRef<any>(null);
  const providerRef = useRef<WebrtcProvider | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      setUsername(input.trim());
    }
  };

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor;

    // Initialize Yjs
    const doc = new Y.Doc();

    // Connect with WebRTC
    const signalingServers = [
      "wss://signaling.yjs.dev",
      "wss://y-webrtc-signaling-eu.herokuapp.com",
      "wss://y-webrtc-signaling-us.herokuapp.com",
    ];
    providerRef.current = new WebrtcProvider("text-editor-room", doc, {
      signaling: signalingServers,
      // Workaround for iceServers TypeScript issue
      // @ts-ignore
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" },
        { urls: "turn:openrelay.metered.ca:80", username: "openrelay.project", credential: "openrelay" }
      ]
    });

    // Debug WebRTC
    providerRef.current.on("status", (event: { connected: boolean }) => {
      console.log("WebRTC status:", event.connected ? "connected" : "disconnected");
    });
    providerRef.current.on("synced", (event: { synced: boolean }) => {
      console.log("WebRTC synced:", event.synced);
    });
    providerRef.current.on("peers", (peers: any) => {
      console.log("WebRTC peers:", peers);
    });
    // Log signaling connection attempts
    console.log("WebRTC signaling servers:", signalingServers);

    // Set user awareness
    const color = "#" + Math.floor(Math.random() * 16777215).toString(16);
    providerRef.current.awareness.setLocalStateField("user", {
      name: username,
      color,
      lastActive: Date.now()
    });

    // Update connected users
    providerRef.current.awareness.on("change", () => {
      const states = Array.from(providerRef.current!.awareness.getStates().values());
      console.log("Awareness states:", states);
      const userList = states
        .map((state) => state.user)
        .filter((user) => user && user.name && Date.now() - user.lastActive < 30000)
        .map((user) => ({
          name: user.name,
          color: user.color,
          lastActive: user.lastActive
        }));
      setUsers([...new Set(userList.map(user => JSON.stringify(user)))].map(str => JSON.parse(str)));
    });

    // Bind Yjs to Monaco
    const type = doc.getText("monaco");
    new MonacoBinding(type, editorRef.current.getModel(), new Set([editorRef.current]), providerRef.current.awareness);

    // Debug content changes and update lastActive
    type.observe(() => {
      console.log("Yjs content updated:", type.toString());
      providerRef.current?.awareness.setLocalStateField("user", {
        name: username,
        color: providerRef.current.awareness.getLocalState()?.user?.color,
        lastActive: Date.now()
      });
    });
  };

  useEffect(() => {
    return () => {
      if (providerRef.current) {
        providerRef.current.destroy();
        providerRef.current = null;
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {!username ? (
        <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-md mt-8">
          <h1 className="text-2xl font-bold mb-4">Enter Username</h1>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Your username"
            className="w-full p-2 mb-4 border rounded"
          />
          <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Join Editor
          </button>
        </form>
      ) : (
        <div className="w-full max-w-4xl mt-8">
          <div className="mb-4 p-4 bg-white rounded-lg shadow-md">
            <span className="text-sm font-medium">Connected Users: </span>
            {users.map((user, index) => (
              <span
                key={index}
                className="inline-block mx-1 px-2 py-1 text-sm rounded text-white"
                style={{ backgroundColor: user.color }}
              >
                {user.name} {user.lastActive && Date.now() - user.lastActive < 5000 ? "(Typing)" : ""}
              </span>
            ))}
          </div>
          <div className="border rounded-lg shadow-lg overflow-hidden">
            <Editor
              height="80vh"
              width="100%"
              theme="vs-dark"
              onMount={handleEditorDidMount}
              options={{ minimap: { enabled: false }, fontSize: 16 }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;