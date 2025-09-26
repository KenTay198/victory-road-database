import { useEffect, useRef } from "react";

interface UseClickOutsideProps {
  onClickOutside: () => void;
  togglerElementId?: string;
}

function useClickOutside<T extends HTMLElement>({ onClickOutside, togglerElementId }: UseClickOutsideProps) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      // Check if click is outside the ref element
      if (ref.current && !ref.current.contains(target)) {
        // If toggler element ID is provided, check if click is not on the toggler
        if (togglerElementId) {
          const togglerElement = document.getElementById(togglerElementId);
          if (togglerElement && togglerElement.contains(target)) {
            // Click was on the toggler, don't close
            return;
          }
        }

        // Click was outside and not on toggler, trigger the callback
        onClickOutside();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClickOutside, togglerElementId]);

  return ref;
}

export default useClickOutside;
