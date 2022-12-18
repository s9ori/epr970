const element = document.querySelector('.entry-content');

element.addEventListener('mousemove', (event) => {
  const x = event.clientX;
  const y = event.clientY;
  const width = element.offsetWidth;
  const height = element.offsetHeight;

  element.style.transform = `translate(${(x - width / 5) / (width / 5)}px, ${(y - height / 5) / (height / 5)}px)`;
});
