import { beforeAll, afterAll } from 'vitest'
import { setupServer } from 'msw/node'
import { rest } from 'msw'

const server = setupServer(
  rest.get('http://json.com/posts/1', (req, res, ctx) => {
    return res(ctx.json({ body: 'Mocked!' }))
  })
)

beforeAll(() => server.listen())
afterAll(() => server.close())
