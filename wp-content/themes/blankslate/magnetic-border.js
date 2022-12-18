let mm = new MagnetMouse({
    magnet: {
      element: '.entry-content',
      class: 'magnet-active',
      enabled: true,
      distance: 40,
      position: 'bottom-right'
    },
    // Other configuration options
  });
  
  mm.init();
  