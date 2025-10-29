/* eslint-disable react/jsx-props-no-spreading */
import { Image, Skeleton } from '@chakra-ui/react';
import { ComponentProps, useCallback, useMemo, useState } from 'react';

function LazyImage(props: Omit<ComponentProps<typeof Image>, 'loading'>) {
  const [inView, setInView] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const callback = useCallback<IntersectionObserverCallback>(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      });
    },
    []
  );

  const observer = useMemo(
    () => new IntersectionObserver(callback),
    [callback]
  );

  const skeletonRef = (el: HTMLDivElement) => {
    if (el) observer.observe(el);
  };
  const imageRef = (el: HTMLImageElement) => {
    if (el) el.addEventListener('load', () => setIsLoading(false));
  };

  const imageProps = useMemo(() => {
    if (isLoading) {
      return {
        ...props,
        display: 'none',
      };
    }

    return props;
  }, [isLoading, props]);

  return (
    <>
      {(!inView || isLoading) && <Skeleton ref={skeletonRef} {...props} />}
      {inView && <Image ref={imageRef} {...imageProps} />}
    </>
  );
}

export default LazyImage;
