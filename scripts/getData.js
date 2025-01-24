export default async function getDataFunction(url){
    const getData = async url => {
        const res = await fetch(url)
        const json = await res.json()
        return json
    }

    try {
        const data = await getData(url)
        return data
    } catch (error) {
        console.log(`Произошла ошибка в getData, ${error.message}`)
    }
}