import { useEffect, useRef, useState } from "react";

export const useTextTruncated = (text: string) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [isTruncated, setIsTruncated] = useState(false);

  useEffect(() => {
    if (ref.current) {
      // Check if the text is truncated by comparing scrollWidth and clientWidth
      const truncated = ref.current.scrollWidth > ref.current.clientWidth;
      setIsTruncated(truncated);
    }
  }, [text]);

  return { ref, isTruncated };
};
