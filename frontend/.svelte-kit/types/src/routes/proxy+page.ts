// @ts-nocheck
// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = false;
/** @param {Parameters<import('./$types').PageLoad>[0]} event */
export async function load({ fetch }:any) :Promise<any> {
    let res = await fetch('http://localhost:4545/todo/all',{
        method:'GET',
        mode: 'cors',
        headers:{
            'Content-Type':'application/json'
        }
    })
    if (res.ok) {
        return {
            Todos : await res.json()
        };
    }
    return {
        status: res.status,
        error: res.message
    };
}
