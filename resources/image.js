export const getImage = (width, height, url, operation = 'resize') => {
  return `http://localhost:8080/img/${width}/${height}/${operation}${url}`
}
