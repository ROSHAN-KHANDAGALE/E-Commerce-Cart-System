import "./App.css";
import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./utils/routes/route";
import { useDispatch } from "react-redux";
import { setUser } from "./app/Slicers/auth.Slice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const token = localStorage.getItem("persist:root");
      if (token) {
        const parsedToken = JSON.parse(token);
        const user = parsedToken.auth?.user;
        if (user) {
          dispatch(setUser(user));
        }
      }
    } catch (error) {
      console.error("Failed to set user from local storage:", error);
    }
  }, [dispatch]);

  return (
    <div className="text-white text-center">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
