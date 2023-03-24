import {useEffect, useRef} from "react";

function useInterval (callback: () => void, delay: number) {
    const savedCallback = useRef(callback)

    useEffect(() => {
        const intervalId = setInterval(() => savedCallback.current(), delay)
        return () => clearInterval(intervalId)
    }, [delay])
}

export default useInterval