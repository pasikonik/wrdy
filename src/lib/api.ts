const BASE_API_URL = import.meta.env.VITE_APP_API_URL + '/'

const headers = () => {
  return new Headers({
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  })
}

async function http(path: string, config: RequestInit) {
  const request = new Request(BASE_API_URL + path, {
    headers: headers(),
    ...config,
  })
  const response = await fetch(request)

  if (!response.ok) {
    throw new Error(`${response.status} - ${response.statusText}`)
  }

  return response.json().catch(() => ({}))
}

const api = {
  async get(endpoint: string) {
    const options = { method: 'get' }
    return await http(endpoint, options)
  },
  async post(endpoint: string, body: object) {
    const options = { method: 'post', body: JSON.stringify(body) }
    return await http(endpoint, options)
  },
  async put(endpoint: string, body: object) {
    const options = { method: 'put', body: JSON.stringify(body) }
    return await http(endpoint, options)
  },
  async delete(endpoint: string) {
    const options = { method: 'delete' }
    return await http(endpoint, options)
  },
  async sendFile(endpoint: 'import', formData: FormData) {
    const response = await fetch(BASE_API_URL + endpoint, {
      method: 'post',
      body: formData,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })

    return response.json()
  },
} as const

export default api
