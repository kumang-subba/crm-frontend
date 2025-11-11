import { AnimatePresence } from "framer-motion";
import { createContext, useContext, useState } from "react";
import Notification from "../components/Notification";

const NotificationContext = createContext({});

export const useNotificationContext = () => useContext(NotificationContext);

const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((nt) => nt.id !== id));
  };

  const addNotification = (text, variant = "primary", timer = 5000) => {
    setNotifications((prev) => [...prev, { text, variant, timer, id: crypto.randomUUID() }]);
  };

  return (
    <NotificationContext.Provider value={{ addNotification }}>
      {children}
      <div className="flex flex-col-reverse gap-1 w-72 fixed bottom-4 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
        <AnimatePresence>
          {notifications.map((n) => (
            <Notification removeNotif={removeNotification} {...n} key={n.id} />
          ))}
        </AnimatePresence>
      </div>
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
