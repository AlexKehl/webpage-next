export interface Photo {
  src: string
  width: number
  height: number
}

export interface Credentials {
  email: string
  password: string
}

export interface User {
  email: string
}

export interface BlobWithMeta {
  blob: Blob
  name: string
}
