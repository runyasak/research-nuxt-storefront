export default function({ $axios }, inject) {
  const { baseURL } = $axios.defaults
  inject('mapImageUrl', (width, height, url, operation = 'resize') => `${baseURL}/img/${width}/${height}/${operation}${url}`)
}
