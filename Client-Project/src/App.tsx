import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar.component";
import UserAuthform from "./pages/userauthform.page";
import Editor from "./pages/Editor.page";
import UseAuthProvider from "./Hooks/UserContext";
import EditorContextProvider from "./Hooks/UseEditorContext";
import HomePage from "./pages/Home.page";
import SeachPage from "./pages/Search.page";
import PageNotFound from "./components/PageNotFound.component";
import UserProfilePage from "./pages/UserProfile.page";

function App() {
  return (
    <div>
      <UseAuthProvider>
        <EditorContextProvider>
          <Routes>
            <Route path="editor" element={<Editor />} />
            <Route path="/" element={<Navbar />}>
              <Route index element={<HomePage />} />
              <Route path="signin" element={<UserAuthform types="sign-in" />} />
              <Route path="signup" element={<UserAuthform types="sign-Up" />} />
              <Route path="search/:query" element={<SeachPage />} />
              <Route path="author/:id" element={<UserProfilePage/>} />
              <Route path="*" element={<PageNotFound />} />
            </Route>
          </Routes>
        </EditorContextProvider>
      </UseAuthProvider>
    </div>
  );
}

export default App;
