const element = document.querySelector('.entry-content');

element.addEventListener('mousemove', (event) => {
  const x = event.clientX;
  const y = event.clientY;
  const width = element.offsetWidth;
  const height = element.offsetHeight;

  element.style.transform = `translate(${(x - width / 35) / (width / 35)}px, ${(y - height / 35) / (height / 35)}px)`;
});
