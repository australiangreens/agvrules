import React from 'react';

export default function ClauseAnnotation({ nodelegate, effectivefrom, days }) {
  return (
    <div style={{position: 'relative', left: '-3rem', display: 'inline', float: 'left', marginRight: '-50px' }}>
    {nodelegate && <span className="explain">❗<span className="abbr-info">This power must not be delegated.</span></span>}
    {/* {effectivefrom && <span className="explain">⌛<span className="abbr-info">This clause comes into force {effectivefrom}.</span></span>} */}
    {days && <span className="explain">📅<span className="abbr-info">When calculating a period of days under this Constitution, the period from 24 December to 9 January is excluded.</span></span>}
    </div>
  );
}