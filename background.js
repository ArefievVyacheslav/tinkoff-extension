

const options = {
    childList: true,
    attributes: true,
    subtree: true
}

const observer = new MutationObserver(mutations => {})
observer.observe(document.body, options)
