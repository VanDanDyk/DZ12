export default async function postDataFunction(url,obj){
    const postData = async (url, obj) => {
        const res = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: { 'Content-type': 'application/json; charset=UTF-8' }
        })
        const json = await res.json()
        return json
    }

    try {
        const data = await postData(url, obj)
        return data
    } catch (error) {
        console.log(`Произошла ошибка в postData, ${error.message}`)
    }
}
