"use client";

import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";
import {createURL} from "@/api/utils";
import {getInitialValues} from "@/components/common/UrlStoreSSR";


type UseUrlStore<T> = [T, (value: {[key: string]: any}) => void];

export const useUrlStore = <
    T extends {
        [key: string]: any;
    }
>(defaultValues: T): UseUrlStore<T> => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [values, setValues] = useState<T>(() => {
        return getInitialValues<T>(defaultValues, searchParams);
    });

    useEffect(() => {
        const currentParams = new URLSearchParams(searchParams);
        const currentPath = `${pathname}?${currentParams.toString()}`;

        const newParams = new URLSearchParams(searchParams);
        Object.keys(defaultValues).forEach((key) => {
            const value = values[key];
            if (value && value !== defaultValues[key]) {
                newParams.set(key, value);
            } else {
                newParams.delete(key);
            }
        });
        const newPath = `${pathname}?${newParams.toString()}`;

        if (currentPath !== newPath) {
            router.replace(newPath);
        }
    }, [ values,defaultValues, pathname, router, searchParams ]);

    const onValueChange = (value: {[key: string]: any}) => {
        setValues((oldValue: T): T => {
            return {...oldValue, ...value};
        });
    }

    return [values, onValueChange];
}