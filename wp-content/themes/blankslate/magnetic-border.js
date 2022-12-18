let mm = new MagnetMouse({
    magnet: {
      element: '.entry-content',
      class: 'magnet-active',
      enabled: true,
      distance: 40,
      position: 'bottom-right'
    },
    inCallback: function(data) {
      data.elem.node.classList.add('magnet-active');
    }
  });
  
  mm.init();
  