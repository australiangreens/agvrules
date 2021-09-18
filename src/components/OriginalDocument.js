import React, { useState } from 'react';
import Toggle from 'react-toggle';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import useBaseUrl from '@docusaurus/useBaseUrl';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-toggle/style.css'
import './OriginalDocument.css';

const PDFIcon = () => (
  <svg enableBackground="new 0 0 334.371 380.563" version="1.1" viewBox="0 0 14 16" style={{marginTop: '-3px'}}>

	<g transform="matrix(.04589 0 0 .04589 -.66877 -.73379)">
		<polygon points="51.791 356.65 51.791 23.99 204.5 23.99 282.65 102.07 282.65 356.65" fill="#fff" strokeWidth="212.65"/>
		<path d="m201.19 31.99 73.46 73.393v243.26h-214.86v-316.66h141.4m6.623-16h-164.02v348.66h246.85v-265.9z" strokeWidth="21.791"/>
	</g>
	<g transform="matrix(.04589 0 0 .04589 -.66877 -.73379)">
		<polygon points="282.65 356.65 51.791 356.65 51.791 23.99 204.5 23.99 206.31 25.8 206.31 100.33 280.9 100.33 282.65 102.07" fill="#fff" strokeWidth="212.65"/>
		<path d="m198.31 31.99v76.337h76.337v240.32h-214.86v-316.66h138.52m9.5-16h-164.02v348.66h246.85v-265.9l-6.43-6.424h-69.907v-69.842z" strokeWidth="21.791"/>
	</g>
	<g transform="matrix(.04589 0 0 .04589 -.66877 -.73379)" strokeWidth="21.791">
		<polygon points="258.31 87.75 219.64 87.75 219.64 48.667 258.31 86.38"/>
		<path d="m227.64 67.646 12.41 12.104h-12.41v-12.104m-5.002-27.229h-10.998v55.333h54.666v-12.742z"/>
	</g>
	<g transform="matrix(.04589 0 0 .04589 -.66877 -.73379)" fill="#ed1c24" strokeWidth="212.65">
		<polygon points="311.89 284.49 22.544 284.49 22.544 167.68 37.291 152.94 37.291 171.49 297.15 171.49 297.15 152.94 311.89 167.68"/>
		<path d="m303.65 168.63 1.747 1.747v107.62h-276.35v-107.62l1.747-1.747v9.362h272.85v-9.362m-12.999-31.385v27.747h-246.86v-27.747l-27.747 27.747v126h302.35v-126z"/>
	</g>
	<rect x="1.7219" y="7.9544" width="10.684" height="4.0307" fill="none"/>
	<g transform="matrix(.04589 0 0 .04589 1.7219 11.733)" fill="#fff" strokeWidth="21.791" aria-label="PDF"><path d="m9.216 0v-83.2h30.464q6.784 0 12.928 1.408 6.144 1.28 10.752 4.608 4.608 3.2 7.296 8.576 2.816 5.248 2.816 13.056 0 7.68-2.816 13.184-2.688 5.504-7.296 9.088-4.608 3.456-10.624 5.248-6.016 1.664-12.544 1.664h-8.96v26.368zm22.016-43.776h7.936q6.528 0 9.6-3.072 3.2-3.072 3.2-8.704t-3.456-7.936-9.856-2.304h-7.424z"/><path d="m87.04 0v-83.2h24.576q9.472 0 17.28 2.304 7.936 2.304 13.568 7.296t8.704 12.8q3.2 7.808 3.2 18.816t-3.072 18.944-8.704 13.056q-5.504 5.12-13.184 7.552-7.552 2.432-16.512 2.432zm22.016-17.664h1.28q4.48 0 8.448-1.024 3.968-1.152 6.784-3.84 2.944-2.688 4.608-7.424t1.664-12.032-1.664-11.904-4.608-7.168q-2.816-2.56-6.784-3.456-3.968-1.024-8.448-1.024h-1.28z"/><path d="m169.22 0v-83.2h54.272v18.432h-32.256v15.872h27.648v18.432h-27.648v30.464z"/></g>

</svg>
)

export default function OriginalDocument({ original, button, showOriginal, setShowOriginal }) {

  const [numPages, setNumPages] = useState(null);

  if (button) {
    return (
      <div style={{textAlign: 'center'}}>
        <Toggle className="original-document" aria-label="Show original document" checked={showOriginal} onChange={(e) => setShowOriginal(e.target.checked)} icons={{ checked: <PDFIcon />, unchecked: null }} />
      </div>
    )
  }

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  }

  const renderAllPages = () => {
    return Array.from(
      new Array(numPages),
      (el, index) => (
        <Page
          key={`page_${index + 1}`}
          pageNumber={index + 1}
        />
      ),
    )
  }

  const renderSpecificPages = () => {
    return original.pages.map(p => <Page key={`page_${p}`} pageNumber={p} />);
  }

  return (
    <Document
      file={useBaseUrl(`pdf/${original.file}`)}
      onLoadSuccess={onDocumentLoadSuccess}
    >
      {original.pages ? renderSpecificPages() : renderAllPages()}
    </Document>
  )
}