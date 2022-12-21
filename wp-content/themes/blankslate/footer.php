</main>
<?php get_sidebar(); ?>
</div>
<footer id="footer" role="contentinfo">
</div>
</footer>
</div>
<?php wp_footer(); ?>
<script>
const tab = document.querySelector('.tab');
const comments = document.querySelector('#comments'); // Update the ID of the div element
let isOpen = false;

tab.addEventListener('click', () => {
  if (isOpen) {
    comments.classList.remove('open'); // Update the class of the div element
  } else {
    comments.classList.add('open'); // Update the class of the div element
  }
  isOpen = !isOpen;

  // Indent this block of code correctly and enclose it within curly braces
  if (isOpen) {
    comments.classList.remove('open');
    sidebar.style.marginLeft = '300px';
  } else {
    comments.classList.add('open');
    sidebar.style.marginLeft = '0px';
  }
});


</script>
</body>
</html>