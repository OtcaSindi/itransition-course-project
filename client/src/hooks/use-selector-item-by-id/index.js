import {useSelector} from "react-redux"

export const useSelectorItemById = (selector, id) => {
    const {data} = useSelector(selector)
    if (!id) {
        return {
            title: '',
            description: '',
            tags: [],
            image: '',
        }
    }
    return data.find(i => i.id === id)
}