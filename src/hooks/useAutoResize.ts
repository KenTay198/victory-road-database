import { useEffect, useRef } from "react";

interface UseAutoResizeOptions {
  minRows?: number;
  maxRows?: number | null; // null = unlimited
  value: string;
}

export function useAutoResize({ minRows = 2, maxRows = 10, value }: UseAutoResizeOptions) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const autoResize = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "auto";

    const minHeight = minRows * 24;
    const contentHeight = textarea.scrollHeight;

    let newHeight = Math.max(contentHeight, minHeight);

    if (maxRows !== null) {
      newHeight = Math.min(newHeight, maxRows * 24);
    }

    textarea.style.height = `${newHeight}px`;
  };

  useEffect(() => {
    autoResize();
  }, [value, minRows, maxRows]);

  const handleChange = (onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void) => {
    return (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange(event);
      setTimeout(autoResize, 0);
    };
  };

  return {
    textareaRef,
    handleChange,
    textareaProps: {
      style: { resize: "none", overflow: "hidden" } as React.CSSProperties,
      rows: minRows,
    },
  };
}
