import React from 'react';

  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  
  whyDidYouRender(React, {
    onLogs: true,
    trackAllPureComponents: true,
  });