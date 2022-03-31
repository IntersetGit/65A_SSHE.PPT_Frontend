
const ImageLoader = (path) =>{
    return process.env.NODE_ENV === 'production' ? `${process.env.NEXT_PUBLIC_BASE_PATH}${path}` : path
}

export { ImageLoader }