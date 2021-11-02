import assert from 'assert'
import axios from 'axios'

export default function AsanaClient(
  accessToken = process.env.ASANA_ACCESS_TOKEN
) {
  assert(accessToken, 'asana access token not provided')
  return {
    client: axios.create({
      baseURL: `https://app.asana.com/api/1.0`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    }),

    async getWorkspaces() {
      const {
        data: { data },
      } = await this.client.get('/workspaces')
      return data
    },

    async getFullExport(orgId: string) {
      const {
        data: { data },
      } = await this.client.post(`/organization_exports`, {
        data: { organization: orgId },
      })
      return data
    },
  }
}
