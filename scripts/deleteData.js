export default async function deleteDataFunction(url, id){
    const patchData = async (url, id) => {
        console.log(`${url}/${id}`)
        const res = await fetch(`${url}/${id}`, {
            method: 'DELETE',
            headers: { 'Content-type': 'application/json; charset=UTF-8' }
        })

        if (!res.ok) throw new Error(`Ошибка при запросе ${res.status}`)

        const text = await res.text()
        try {
            return JSON.parse(text)
        } catch (err) {
            throw new Error('сервер вернул не JSON')
        }
    }

    try {
        const data = await patchData(url, id)
        console.log('Пользователь изменён')
        return data
    } catch (error) {
        console.log(`Произошла ошибка в patchData, ${error.message}`)
    }
}