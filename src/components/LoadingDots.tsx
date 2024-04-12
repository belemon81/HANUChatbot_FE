const LoadingDots = () => {
    return (
        <div className="flex space-x-2 justify-center items-center dark:invert">
            <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
        </div>
    )
}

export default LoadingDots;