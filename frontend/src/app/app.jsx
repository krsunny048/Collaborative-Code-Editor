import "./App.css"
import { Editor } from "@monaco-editor/react"
import { MonacoBinding } from "y-monaco"
import { useRef, useMemo, useState, useEffect } from "react"
import * as Y from "yjs"
import { SocketIOProvider } from "y-socket.io"
import { editor } from "monaco-editor"
function App() {
  const editorRef = useRef(null)
  const [username, setUsername] = useState(() => {
    return new URLSearchParams(window.location.search).get("username") || ""
  })

  const [users, setUsers] = useState([])

  const ydoc = useMemo(() => new Y.Doc(), [])
  const ytext = useMemo(() => ydoc.getText("monaco"), [ydoc])
  const handleMount = (editor) => {
    editorRef.current= editor
    const monacoBinding = new MonacoBinding(
        ytext,
        editor.getModel(),
        new Set([editor]),
      )
  }
  const handleJoin = (e) => {
    e.preventDefault()
    setUsername(e.target.username.value)
    window.history.pushState({}, "", "?username=" + e.target.username.value)
  }

 useEffect(() => {
  if (username) {
    const provider = new SocketIOProvider(
      "http://localhost:3000",
      "monaco",
      ydoc,
      {
        autoConnect: true,
      }
    );

    provider.awareness.setLocalStateField("user", { username });

    const updateUsers = () => {
      const states = Array.from(
        provider.awareness.getStates().values()
      );

      setUsers(
        states
          .filter(state => state.user && state.user.username)
          .map(state => state.user)
      );
    };

    updateUsers();

    provider.awareness.on("change", updateUsers);

    function handleBeforeUnload() {
      provider.awareness.setLocalState(null);
    }

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      provider.awareness.off("change", updateUsers);
      window.removeEventListener("beforeunload", handleBeforeUnload);

      provider.awareness.setLocalState(null);
      provider.destroy();
    };
  }
}, [username, ydoc]);

  if (!username) {
    return (
      <main className="h-screen w-full flex bg-gray-950 gap-4 p-4 items-center justify-center">
        <form
          onSubmit={handleJoin}
          className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Enter your username"
            className="p-2 rounded-lg bg-gray-800 text-white"
            name="username"
          />
          <button
            className="p-2 rounded-lg bg-amber-50 text-gray-950 font-bold"
          >
            Join
          </button>
        </form>
      </main>
    )
  }
  return (
    <main
      className="h-screen w-full bg-gray-950 flex gap-4 p-4">
      <aside
        className="w-1/5 bg-mist-50 rounded-lg"
      >
      <h2 className="text-2xl font-bold p-4 border-b border-gray-300">Users</h2>
       <ul className="p-4">
          {
            users.map((users,index)=>
            (
            <li key={index} className="p-2 bg-gray-800 text-white rounded mb-2">
                {users.username}
            </li>
            ))}
       </ul>
      </aside>
      <section
        className="w-3/4 bg-neutral-800 rounded-lg p-2">
        <Editor
          height="100%"
          defaultLanguage="javascript"
          defaultValue="// some comment"
          theme="vs-dark"
          onMount={handleMount}
        />
      </section>
    </main>
  )
}
export default App
