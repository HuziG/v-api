import axios from 'axios'

export const getJSON = () => {
  return axios.get('https://jsonplaceholder.typicode.com/todos/1')
}
