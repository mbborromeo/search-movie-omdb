import { useState, useEffect } from "react";

/* Resource: https://blog.logrocket.com/progressive-image-loading-react-tutorial */
const ProgressiveImage = ({ placeholderSrc, src, alt, ...props }) => {
  console.log("ProgressiveImage props passed thru state:", props);

  const [imgSrc, setImgSrc] = useState(placeholderSrc ? placeholderSrc : src);

  /* load an invisible image tag (not placed on page) for loading purposes */
  useEffect(() => {
    const imgInvisible = new Image();
    imgInvisible.src = src;
    /* change its source from placeholder to actual src when loaded */
    imgInvisible.onload = () => {
      setImgSrc(src);
    };
  }, [src]);

  const customClass =
    placeholderSrc && imgSrc === placeholderSrc ? "loading" : "";

  return (
    <img
      {...{
        src: imgSrc,
        alt: alt, // needs to be explicitly defined for img
        className: customClass,
        ...props,
      }}
    />
  );
};

export default ProgressiveImage;
