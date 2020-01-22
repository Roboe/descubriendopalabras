'use strict'

const currentPage = window.location.href;
const htmlElementClasses = document.querySelector('html').classList
const pages = [
{{- range .RegularPages }}
  "{{ .Permalink }}",
{{- end }}
]
const colorClasses = [
  {{- range .Site.Data.bg_colors }}
  "{{ . }}",
  {{- end }}
]


function getRandomItemFromList(list) {
  if (list.length === 0) return undefined

  const randomIndex = Math.floor(Math.random() * list.length)
  return list[randomIndex]
}

function getRandomPageUrl() {
  if (pages.length <= 1) return currentPage

  const randomPageUrl = getRandomItemFromList(pages)

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

function loadRandomColorClass() {
  if (htmlElementClasses.contains('has-color')) return

  const randomColor = getRandomItemFromList(colorClasses)

  htmlElementClasses.remove(...colorClasses)
  htmlElementClasses.add(randomColor)
}

// Main
loadRandomColorClass()