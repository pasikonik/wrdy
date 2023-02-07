const BASE_API_URL = import.meta.env.VITE_APP_API_URL + '/'

const headers = () => {
  return new Headers({
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${sessionStorage.getItem('token')}`,
  })
}

function basicHandle(res: any) {
  if (!res.ok) {
    throw new Error(res.status)
  }

  return res.json()
}

const api = {
  async get(endpoint: string) {
    const res = await fetch(BASE_API_URL + endpoint, {
      headers: headers(),
      method: 'get',
    })

    return await basicHandle(res)
  },
  async post(endpoint: string, body: object) {
    const res = await fetch(BASE_API_URL + endpoint, {
      headers: headers(),
      method: 'post',
      body: JSON.stringify(body),
    })

    return await basicHandle(res)
  },
}

export default api
