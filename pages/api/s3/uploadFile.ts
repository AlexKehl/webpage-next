import { NextApiRequest, NextApiResponse } from 'next'
import S3 from 'aws-sdk/clients/s3'
import Env from 'src/constants/EnvProxy'

export const s3 = new S3({
  region: 'eu-central-1',
  accessKeyId: process.env['S3_ACCESS_KEY'],
  secretAccessKey: process.env['S3_SECRET_KEY'],
  signatureVersion: 'v4',
})

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { name, type } = JSON.parse(req.body)

  try {
    const fileParams = {
      Bucket: Env.S3_BUCKET_NAME,
      Key: name,
      Expires: 600,
      ContentType: type,
    }

    const url = await s3.getSignedUrlPromise('putObject', fileParams)

    res.status(200).json({ url })
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: err })
  }
}

export default handler

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '8mb', // Set desired value here
    },
  },
}
