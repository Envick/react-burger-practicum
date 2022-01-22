import {ROOT_URL} from "./constants";

export function setCookie(name:string, value:any, props?:any) {
    props = props || {};
    let exp = props.expires;
    if (typeof exp == 'number' && exp) {
        const d = new Date();
        d.setTime(d.getTime() + exp * 1000);
        exp = props.expires = d;
    }
    if (exp && exp.toUTCString) {
        props.expires = exp.toUTCString();
    }
    value = encodeURIComponent(value);
    let updatedCookie = name + '=' + value;
    for (const propName in props) {
        updatedCookie += '; ' + propName;
        const propValue = props[propName];
        if (propValue !== true) {
            updatedCookie += '=' + propValue;
        }
    }
    document.cookie = updatedCookie;
}

export function getCookie(name:string) {
    const matches = document.cookie.match(
        new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

export const checkResponse = (res: Response) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const refreshToken = () => {
    return fetch(`${ROOT_URL}/auth/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            token: localStorage.getItem("refreshToken"),
        }),
    }).then(checkResponse);
};

export const retriableFetch = async <ReturnType>(url:string, options: RequestInit | undefined = {}): Promise<ReturnType> => {
    try {
        const res = await fetch(url, options);
        const result = await checkResponse(res) as ReturnType;
        return result;
    } catch (err) {
        if(err instanceof Error){
            if (err.message === "jwt malformed") {
                const refreshData = await refreshToken(); // обновляем токен; пытаемся 1 раз, если не сложилось -- падаем с ошибкой
                localStorage.setItem("refreshToken", refreshData.refreshToken);
                const authToken =   refreshData.accessToken.split('Bearer ')[1];

                setCookie("accessToken", authToken); // тут для примера accessToken храним в куке

                if (!options.headers) {
                    options.headers = {};
                }

                (options.headers as Record<string, string>).authorization = getCookie('refreshToken') || '';
                const res = await fetch(url, options); // повторяем оригинальный запрос с оригинальными options (+ дополнительным хедером)
                return await checkResponse(res); // если все равно проваливаемся -- значит не судьба :/
            }
        }
        throw err
    }
};


export const sendResetEmail = (form:{email: string}) => {
    return fetch(`${ROOT_URL}/password-reset`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(form)
    }).then(checkResponse);
};

export const sendResetPasword = (form:{password: string, token: string}) => {
    return fetch(`${ROOT_URL}/password-reset/reset`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(form)
    }).then(checkResponse);
};