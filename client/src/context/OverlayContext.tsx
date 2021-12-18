import { createContext, PropsWithChildren, useContext, useState } from "react";

const overlayContext = createContext<{
  visible: boolean;
  setVisible: (visible: boolean) => void;
}>({
  visible: false,
  setVisible: () => {},
});

export const OverlayProvider = (props: PropsWithChildren<{}>) => {
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <overlayContext.Provider value={{ visible, setVisible }}>
      <div
        className={`absolute top-0 left-0 w-screen h-screen bg-gray-500 z-10 ${
          visible ? "animate-fadeIn" : "animate-fadeOut"
        }`}
      />
      {props.children}
    </overlayContext.Provider>
  );
};

export const useOverlay = () => useContext(overlayContext);
