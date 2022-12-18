const element = document.querySelector('.entry-content');

element.addEventListener('mousemove', (event) => {
  const x = event.clientX;
  const y = event.clientY;
  const width = element.offsetWidth;
  const height = element.offsetHeight;

  element.style.transform = `translate(${(x - width / 35) / (width / 35)}px, ${(y - height / 35) / (height / 35)}px)`;
  element.style.transition = 'transform 0.5s';
  element.style.pointerEvents = 'none';
  element.style.clipPath = `circle(50px at ${x}px ${y}px)`;
});
