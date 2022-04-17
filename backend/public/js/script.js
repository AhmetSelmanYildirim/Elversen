const toggleButton = document.getElementsByClassName('toggle-button')[0]
const mobileLinksContainer = document.getElementsByClassName('mobile-links-container')[0]

toggleButton.addEventListener('click', () => {
  mobileLinksContainer.classList.toggle('active')
})