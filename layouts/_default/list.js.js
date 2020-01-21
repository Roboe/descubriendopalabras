'use strict'

const currentPage = window.location.href;
const pages = [
{{- range .RegularPages }}
  "{{ .Permalink }}",
{{- end }}
]


function getRandomPageUrl() {
  if (pages.length <= 1) return currentPage

  const randomIndex = Math.floor(Math.random() * pages.length)
  const randomPageUrl = pages[randomIndex]

  return (randomPageUrl !== currentPage)
    ? randomPageUrl
    : getRandomPageUrl()
}

function loadRandomPage(keepHistory = true) {
  const randomPageUrl = getRandomPageUrl()

  if (keepHistory) {
    window.location = randomPageUrl
  } else {
    window.location.replace(randomPageUrl)
  }
}