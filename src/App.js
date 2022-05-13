import React from 'react';
import axios from 'axios';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';

import AddFolder from './components/AddFolder';
import List from './components/List';
import Tasks from './components/Tasks';

import './index.scss';

function App() {
  const [folders, setFolders] = React.useState([]);
  const [colors, setColors] = React.useState([]);
  const [selectedFolder, setSelectedFolder] = React.useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    async function fetchData() {
      const foldersResponse = await axios.get("http://localhost:3001/folders?_expand=color&_embed=tasks");
      const colorsResponse = await axios.get("http://localhost:3001/colors");

      setFolders(foldersResponse.data);
      setColors(colorsResponse.data);
    }

    fetchData();
  }, []); // [] - empty array means useEffect will be called one time

  React.useEffect(() => {
    const selectedFolderId = location.pathname.split("folders/")[1];
    const selectedFolder = folders.find((folder) => {
      if (folder.id === Number(selectedFolderId)) {
        return folder;
      }
    });
    if (selectedFolderId) {
      setSelectedFolder(selectedFolder);
    }
  }, [folders, location.pathname]); // when one of this two values updating - rerender

  const addFolder = (folder) => {
    folder.color = colors[folder.colorId - 1];
    folder.tasks = [];
    setFolders((prev) => [...prev, folder]);
  }

  // filter -> remove(not include) item with removedFolderID from(in) new array
  const removeFolder = (removedFolderId) => {
    setFolders((prev) => prev.filter((folder) => Number(folder.id) !== Number(removedFolderId)));
  }

  const onEditFolderTitle = (id, newName) => {
    const updatedFolders = folders.map((folder) => { // updating title in state
      if (folder.id === id) {
        folder.name = newName;
      }
      return folder;
    });
    setFolders(updatedFolders);
  }

  const onAddTask = (taskFolderId, task) => {
    const updatedFolder = folders.map((folder) => {
      if (folder.id === taskFolderId) {
        folder.tasks = [...folder.tasks, task];
      }
      return folder;
    });
    setFolders(updatedFolder);
  }

  const onRemoveTask = (folderId, removedTaskId) => {
    const updatedFolders = folders.map((folder) => {
      if (folder.id === folderId) {
        folder.tasks = folder.tasks.filter((task) => task.id !== removedTaskId);
      }
      return folder;
    });
    setFolders(updatedFolders);
  }

  const onEditTaskText = (folderId, taskId, newText) => {
    const updatedFolders = folders.map((folder) => {
      if (folder.id === folderId) {
        folder.tasks.map((task) => {
          if (task.id === taskId) {
            task.text = newText;
          }
          return task;
        });
      }
      return folder;
    });
    setFolders(updatedFolders);
  }

  return (
    <div className="todo">
      <div className="todo__sidebar">
        <List items={[
          {
            icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.96 8.10001H7.74001C7.24321 8.10001 7.20001 8.50231 7.20001 9.00001C7.20001 9.49771 7.24321 9.90001 7.74001 9.90001H12.96C13.4568 9.90001 13.5 9.49771 13.5 9.00001C13.5 8.50231 13.4568 8.10001 12.96 8.10001ZM14.76 12.6H7.74001C7.24321 12.6 7.20001 13.0023 7.20001 13.5C7.20001 13.9977 7.24321 14.4 7.74001 14.4H14.76C15.2568 14.4 15.3 13.9977 15.3 13.5C15.3 13.0023 15.2568 12.6 14.76 12.6ZM7.74001 5.40001H14.76C15.2568 5.40001 15.3 4.99771 15.3 4.50001C15.3 4.00231 15.2568 3.60001 14.76 3.60001H7.74001C7.24321 3.60001 7.20001 4.00231 7.20001 4.50001C7.20001 4.99771 7.24321 5.40001 7.74001 5.40001ZM4.86001 8.10001H3.24001C2.74321 8.10001 2.70001 8.50231 2.70001 9.00001C2.70001 9.49771 2.74321 9.90001 3.24001 9.90001H4.86001C5.35681 9.90001 5.40001 9.49771 5.40001 9.00001C5.40001 8.50231 5.35681 8.10001 4.86001 8.10001ZM4.86001 12.6H3.24001C2.74321 12.6 2.70001 13.0023 2.70001 13.5C2.70001 13.9977 2.74321 14.4 3.24001 14.4H4.86001C5.35681 14.4 5.40001 13.9977 5.40001 13.5C5.40001 13.0023 5.35681 12.6 4.86001 12.6ZM4.86001 3.60001H3.24001C2.74321 3.60001 2.70001 4.00231 2.70001 4.50001C2.70001 4.99771 2.74321 5.40001 3.24001 5.40001H4.86001C5.35681 5.40001 5.40001 4.99771 5.40001 4.50001C5.40001 4.00231 5.35681 3.60001 4.86001 3.60001Z" fill="#7C7C7C" />
            </svg>,
            name: `All folders (${folders.length})`
          }
        ]} onClickFolder={(folder) => navigate("/")} />
        <div className="todo__sidebar-folders">
          <List onClickFolder={(folder) => navigate(`/folders/${folder.id}`)} onRemoveFolder={removeFolder} isRemovable={true} items={folders} />
        </div>
        <AddFolder addNewFolder={addFolder} badgeColors={colors} />
      </div>
      <div className="todo__tasks">
        <Routes>
          <Route exact path="/" element={folders && folders.map((folder) => (
            <Tasks key={folder.id} folder={folder} onEditTitle={onEditFolderTitle} onAddTask={onAddTask} onRemoveTask={onRemoveTask} onEditTaskText={onEditTaskText} isFolderEmpty={folder.tasks.length === 0} showAddTask={false} />
          ))} />
          <Route path="/folders/:id" element={folders.length > 0 && selectedFolder && <Tasks folder={selectedFolder} onEditTitle={onEditFolderTitle} onAddTask={onAddTask} onRemoveTask={onRemoveTask} onEditTaskText={onEditTaskText} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
