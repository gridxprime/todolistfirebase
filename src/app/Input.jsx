import React, { useState, useEffect } from "react";
import {
  auth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  db,
  collection,
  addDoc,
  onSnapshot,
  query,
  where,
  deleteDoc,
  doc,
} from "../firebase/Firebase";

function Input() {
  const [user, setUser] = useState(null); // Текущий пользователь
  const [tasks, setTasks] = useState([]); // Список задач
  const [task, setTask] = useState("");  // Текст новой задачи

  // Авторизация через Google
  const login = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error("Ошибка авторизации:", error);
    }
  };

  // Выход из аккаунта
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setTasks([]);
    } catch (error) {
      console.error("Ошибка выхода:", error);
    }
  };

  // Загрузка задач из базы для текущего пользователя
  useEffect(() => {
    if (!user) return;

    const q = query(collection(db, "tasks"), where("userId", "==", user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedTasks = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(fetchedTasks);
    });

    return () => unsubscribe();
  }, [user]);

  // Добавление задачи в базу
  const addTask = async () => {
    if (task.trim() === "") return;
  
    try {
      await addDoc(collection(db, "tasks"), {
        text: task,
        userId: user.uid,
      });
      console.log("До очистки:", task);
      setTask(""); // Попытка очистить поле ввода
      console.log("После очистки:", task);
    } catch (error) {
      console.error("Ошибка добавления задачи:", error);
    }
  };
  

  // Удаление задачи из базы
  const deleteTask = async (id) => {
    try {
      await deleteDoc(doc(db, "tasks", id));
    } catch (error) {
      console.error("Ошибка удаления задачи:", error);
    }
  };

  return (
    <div className="app">
      <div className="app__top">
        <span>Список дел</span>
        {user ? (
          <button onClick={logout}>Выйти</button>
        ) : (
          <button onClick={login}>Войти через Google</button>
        )}
      </div>

      {user && (
        <>
          <div className="list">
            <ul>
              {tasks.map((t) => (
                <li key={t.id}>
                  {t.text}
                  <button onClick={() => deleteTask(t.id)}>Удалить</button>
                </li>
              ))}
            </ul>
          </div>

          <div className="app__input">
            <input
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            <button onClick={addTask}>Добавить</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Input;
