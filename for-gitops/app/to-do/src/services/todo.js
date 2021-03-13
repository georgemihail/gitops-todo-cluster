import axios from 'axios'
const baseUrl = '.' // Declare baseUrl as a relative URL

const getTodos = async () => {
    const response = await axios.get(`${baseUrl}/todos`)
    return response.data
}

// Get the base64 image from http://baseUrl/image
const getImage = async () => {
    const response = await axios.get(`${baseUrl}/image`, { responseType: 'arraybuffer' })
    const base64 = await btoa(
        new Uint8Array(response.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          '',
        ),
      );
    
    return "data:;base64," + base64
}

const addTodo = async (newTodo) => {
    const response = await axios.post(`${baseUrl}/todos`, newTodo)
    return response.data
}

const changeDone = async (id) => {
    const response = await axios.post(`${baseUrl}/todos/${id}`)
    return response.data
}

const todosService = {
    getTodos,
    addTodo,
    changeDone,
    getImage
}

export default todosService