const element = document.querySelector('.entry-content');

element.addEventListener('mousemove', (event) => {
  const x = event.clientX;
  const y = event.clientY;
  const width = element.offsetWidth;
  const height = element.offsetHeight;

  element.style.transform = `translate(${(x - width / 1.2) / (width / 1.2)}px, ${(y - height / 1.2) / (height / 1.2)}px)`;
});
