
export const getInitialValues = <T extends {[key: string]: any}>(defaultValues: T, searchParams: URLSearchParams): T => {
    const values = {...defaultValues};
    Object.keys(defaultValues).forEach((key) => {
        const value = searchParams.get(key);
        if (value) {
            (values as {[key: string]: any})[key] = value;
        }
    });

    return values;
}
