import axios from 'axios';

export function request(config){
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:8000/api/n3/'
  })

  return instance(config)
}