import React from 'react';
import {MDXProvider} from '@mdx-js/react'
import ClauseAnnotation from '../components/ClauseAnnotation';

const components = {
  ClauseAnnotation: ClauseAnnotation,
}

// Default implementation, that you can customize
function Root({children}) {
  return <MDXProvider components={components}>{children}</MDXProvider>;
}

export default Root;