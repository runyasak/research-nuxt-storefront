export const getImage = (width, height, url, operation = 'resize') => {
  return `https://demo.storefrontcloud.io/img/${width}/${height}/${operation}${url}`
}
