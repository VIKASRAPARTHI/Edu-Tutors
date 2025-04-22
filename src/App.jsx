import React, { useState } from "react";
import ChatScreen from "./Pages/ChatScreen";

function App() {
  const [activeSection, setActiveSection] = useState("chat");
  return (
    <div className="app-container">
      <ChatScreen
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
    </div>
  );
}

export default App;
