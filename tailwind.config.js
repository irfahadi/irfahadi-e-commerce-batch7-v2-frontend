module.exports = {
    purge: [],
    darkMode: false, // or 'media' or 'class'
    theme:  {
      extend: {
        fontFamily: {
          display: ['Roboto Mono', 'Menlo', 'monospace'],
          body: ['Roboto Mono', 'Menlo', 'monospace'],
        },
        colors: {
          primary: '#E61872',
          secondary: '#b08968',
          buttonOn: '#e6ccb2',
          buttonOff: '#e6ccb2',
          button: '#aee1e1',
          table : '#d3e0dc',
          
        },
      }
    },
    variants: {
      // display: ["group-hover"]
    },
    plugins: []
  };

  
