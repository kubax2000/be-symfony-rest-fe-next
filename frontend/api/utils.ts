export const createURL = (path: string, params?: object): URL => {
    const url = new URL(path);

    if (!params) {
        return url;
    }

    for (const [key, value] of Object.entries(params)) {
        if (!value) {
            continue;
        }

        url.searchParams.append(key, encodeURIComponent(value));
    }

    return url;
}