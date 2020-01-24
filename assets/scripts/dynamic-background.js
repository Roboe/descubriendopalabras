(function(global){
  'use strict'

  const htmlElementClasses = document.querySelector('html').classList
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

  function loadRandomColorClass() {
    if (htmlElementClasses.contains('has-color')) return

    const randomColor = getRandomItemFromList(colorClasses)

    htmlElementClasses.remove(...colorClasses)
    htmlElementClasses.add(randomColor)
  }

  // Exports
  global.loadRandomColorClass = loadRandomColorClass
})(this)

// Main
loadRandomColorClass()
