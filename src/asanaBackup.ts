require('dotenv').config()

import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import { uploadObject } from './libs/aws'
import Asana from './libs/asana'
;(async function asanaBackup() {
  try {
    const orgName = process.env.ASANA_ORG_NAME || 'risk3sixty.com'

    const backupInstancePrefix = `${Date.now()}__${uuidv4()}`
    const fullPrefixBase = [
      process.env.AWS_S3_PREFIX || 'asana-backup',
      backupInstancePrefix,
    ]
    const asana = Asana()
    const workspaces = await asana.getWorkspaces()
    const r3sWs = workspaces.find((w: any) => w.name == orgName)
    const exportRes = await asana.getFullExport(r3sWs.gid)
    const { data: exportData } = await axios.get(exportRes.download_url, {
      responseType: 'arraybuffer',
    })
    const filePathInBucket = [...fullPrefixBase, `asana_backup.json.gz`]
    await uploadObject(filePathInBucket.join('/'), exportData)

    console.log(`Successfully saved your asana org`, exportRes)
  } catch (err) {
    console.error(
      `Error processing asana org export`,
      err,
      (err as any).response.data
    )
  } finally {
    process.exit()
  }
})()
