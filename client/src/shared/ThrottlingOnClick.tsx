

const throttling = (cb: (...args: any[]) => void, d = 500) => {
    console.log('calling from throttling func')
    let start = 0
    return (...args: any) => {
        let now = new Date().getTime()
        if (now - start < d) return;
        start = now
        return cb(...args)
    }
}

export default throttling