(function(global){
  'use strict'

  const currentPage = window.location.href;
  const pages = [
    {{- range .RegularPages }}
    "{{ .Permalink }}",
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

  // Exports
  global.loadRandomPage = loadRandomPage
})(this)
