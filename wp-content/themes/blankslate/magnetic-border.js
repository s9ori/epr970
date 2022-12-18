const element = document.querySelector('.entry-content');

element.addEventListener('mousemove', (event) => {
  const x = event.clientX;
  const y = event.clientY;
  const width = element.offsetWidth;
  const height = element.offsetHeight;
  const distance = Math.sqrt(Math.pow(x - width / 2, 2) + Math.pow(y - height / 2, 2));

  element.style.transform = `translate(${(x - width / 2) / (distance / 15)}px, ${(y - height / 2) / (distance / 15)}px)`;
  element.style.pointerEvents = 'none';
});
