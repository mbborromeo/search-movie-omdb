import { useState, useEffect } from "react";

/* Resource: https://blog.logrocket.com/progressive-image-loading-react-tutorial */
const ProgressiveImage = ({ placeholderSrc, src, ...props }) => {
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

  return (
    <img
      // src={imgSrc}
      {...{ src: imgSrc, alt: props.alt, ...props }}
      // alt={props.alt}
      // id={props.id}
      // width={props.width}
      // height={props.height}
    />
  );
};

export default ProgressiveImage;
