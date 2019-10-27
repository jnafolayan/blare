import React from 'react'
import LogoText from './logo/LogoText'

/**
 * Logo component
 * @param {string} props.color Color of the logo
 */
export default function Logo({ color }) {
  
  return (
    <h3 className={`relative text-${color} font-sans font-medium text-3xl`}>
      <LogoText>
        Parrot
      </LogoText>
    </h3>
  );

}
