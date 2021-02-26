module.exports = (api) => {
  const isTest = api.env('test')
  if (isTest) {
    return {
      presets: ['@babel/preset-env', 'next/babel'],
    }
  }

  return {
    presets: ['next/babel'],
  }
}
