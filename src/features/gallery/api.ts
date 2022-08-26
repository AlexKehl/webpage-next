const BUCKET_URL = 'https://anatolykehl.s3.eu-central-1.amazonaws.com/' // TODO

export const uploadFile = async (file: File) => {
  const res = await fetch('/api/s3/uploadFile', {
    method: 'POST',
    body: JSON.stringify({
      name: file.name,
      type: file.type,
    }),
  })

  const url = (await res.json()).url

  await fetch(url, {
    method: 'PUT',
    body: file,
    headers: {
      'Content-type': file.type,
      'Access-Control-Allow-Origin': '*',
    },
  })
  return BUCKET_URL + file.name
}
