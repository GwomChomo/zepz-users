import {useCallback, useEffect} from 'react';

const useScrollToBottom = (callback: () => void): void => {
    const handleScroll = useCallback((): void => {
        const isScrolledToBottom =
            window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight;

        if (isScrolledToBottom) {
            callback();
        }
    }, [callback]);

    useEffect(() => {

        window.addEventListener('scroll', handleScroll);

        return (): void => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);
};

export default useScrollToBottom;
