// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = false;
// /** @type {import('./$types').PageLoad} */
// export async function load({ fetch }:any) :Promise<any> {
//     let res = await fetch('http://localhost:4545/todo/all',{
//         method:'GET',
//         mode: 'cors',
//         headers:{
//             'Content-Type':'application/json'
//         }
//     })
//     //var a = await res.json()
//     //console.log(a);
//     if (res.ok) {
//         return {
//             props: {
//                 Todos : await res.json()
//             }
//         };
//     }
//     return {
//         status: res.status,
//         error: res.message
//     };
// }
